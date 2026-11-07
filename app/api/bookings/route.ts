import { withDb } from "@/db";
import { bookings } from "@/db/schema";
import { google } from "googleapis";
import { bookingSchema } from "@/lib/validations/booking";
import { handleApiError, sendSuccess, sendError } from "@/lib/api-utils";
import { eq, and, gt, or, ne } from "drizzle-orm";

// Google Calendar Setup
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const auth = new google.auth.JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: SCOPES,
});
const calendar = google.calendar({ version: "v3", auth });

/**
 * GET /api/bookings?date=YYYY-MM-DD
 * Wakes up the serverless PostgreSQL instance (cold-start warm-up)
 * and returns any already-booked time slots for the requested date.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");

  try {
    const result = await withDb(
      async (db, client) => {
        if (!dateParam) {
          await client`SELECT 1`;
          return { dbReady: true, bookedSlots: [] as string[] };
        }

        const rows = await db
          .select({
            bookingTime: bookings.bookingTime,
            status: bookings.status,
          })
          .from(bookings)
          .where(
            and(
              eq(bookings.bookingDate, dateParam),
              ne(bookings.status, "cancelled")
            )
          );

        return {
          dbReady: true,
          bookedSlots: rows.map((r) => r.bookingTime),
        };
      },
      { retries: 2, connectTimeoutSeconds: 8 }
    );

    return sendSuccess(result);
  } catch (error) {
    // Even if DB is still waking up or table not migrated yet, return 200 with dbReady: false so UI stays responsive
    return sendSuccess({
      dbReady: false,
      bookedSlots: [] as string[],
    });
  }
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();

    // 0. Get Real IP (Cloudflare & Local aware)
    const clientIp =
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      "127.0.0.1";

    // 1. Zod Validation
    const validatedData = bookingSchema.parse(rawBody);
    const {
      clientName,
      clientEmail,
      clientPhone,
      projectDetails,
      projectRepo,
      bookingDate,
      bookingTime,
    } = validatedData;

    // 2. Execute Rate Limit Check + Insert inside retry-protected scoped DB connection
    const dbOutcome = await withDb(
      async (db) => {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const existingBooking = await db.query.bookings.findFirst({
          where: and(
            gt(bookings.createdAt, oneHourAgo),
            or(
              eq(bookings.clientEmail, clientEmail),
              eq(bookings.clientIp, clientIp)
            )
          ),
        });

        if (existingBooking) {
          return { rateLimited: true as const, record: null };
        }

        const inserted = await db
          .insert(bookings)
          .values({
            clientName,
            clientEmail,
            clientPhone,
            projectDetails,
            projectRepo,
            clientIp,
            bookingDate,
            bookingTime,
          })
          .returning();

        return { rateLimited: false as const, record: inserted[0] };
      },
      { retries: 2, connectTimeoutSeconds: 10 }
    );

    if (dbOutcome.rateLimited) {
      return sendError(
        "Maaf, sudah ada booking dari email atau koneksi ini dalam 1 jam terakhir. Silakan coba lagi nanti.",
        "RATE_LIMIT_EXCEEDED",
        429
      );
    }

    // 3. Google Calendar Integration
    try {
      const [time, modifier] = bookingTime.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const startDate = new Date(
        `${bookingDate}T${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:00`
      );
      const endDate = new Date(startDate.getTime() + 30 * 60000);

      await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        requestBody: {
          summary: `📞 Strategy Session: ${clientName}`,
          description: `Topic: ${projectDetails}\nRepo: ${
            projectRepo || "None"
          }\n\nPhone: ${clientPhone}\nEmail: ${clientEmail}`,
          start: { dateTime: startDate.toISOString(), timeZone: "Asia/Jakarta" },
          end: { dateTime: endDate.toISOString(), timeZone: "Asia/Jakarta" },
        },
      });
    } catch (calendarError) {
      console.error("Calendar Error:", calendarError);
    }

    return sendSuccess(dbOutcome.record, 201);
  } catch (error: any) {
    return handleApiError(error);
  }
}

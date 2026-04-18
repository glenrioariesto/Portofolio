import { db } from "@/db";
import { bookings } from "@/db/schema";
import { google } from "googleapis";
import { bookingSchema } from "@/lib/validations/booking";
import { handleApiError, sendSuccess, sendError } from "@/lib/api-utils";
import { desc, eq, and, gt, or } from "drizzle-orm";

// Google Calendar Setup
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const auth = new google.auth.JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  scopes: SCOPES,
});
const calendar = google.calendar({ version: "v3", auth });

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    
    // 0. Get Real IP (Proxy aware)
    const forwarded = request.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(',')[0] : "127.0.0.1";

    // 1. Zod Validation
    const validatedData = bookingSchema.parse(rawBody);
    const { clientName, clientEmail, clientPhone, projectDetails, projectRepo, bookingDate, bookingTime } = validatedData;

    // 2. Enhanced Rate Limiting (Check Email OR IP in the last hour)
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const existingBooking = await db.query.bookings.findFirst({
      where: and(
        gt(bookings.createdAt, oneHourAgo),
        or(
          eq(bookings.clientEmail, clientEmail),
          eq(bookings.clientIp, clientIp)
        )
      )
    });

    if (existingBooking) {
      return sendError(
        "Maaf, sudah ada booking dari email atau koneksi ini dalam 1 jam terakhir. Silakan coba lagi nanti.",
        "RATE_LIMIT_EXCEEDED",
        429
      );
    }

    // 3. Save to Database
    const newBooking = await db.insert(bookings).values({
      clientName,
      clientEmail,
      clientPhone,
      projectDetails,
      projectRepo,
      clientIp,
      bookingDate,
      bookingTime,
    }).returning();

    // 4. Google Calendar Integration
    try {
      const [time, modifier] = bookingTime.split(" ");
      let [hours, minutes] = time.split(":").map(Number);
      
      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const startDate = new Date(`${bookingDate}T${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`);
      const endDate = new Date(startDate.getTime() + 30 * 60000);

      await calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID,
        requestBody: {
          summary: `📞 Strategy Session: ${clientName}`,
          description: `Topic: ${projectDetails}\nRepo: ${projectRepo || "None"}\n\nPhone: ${clientPhone}\nEmail: ${clientEmail}`,
          start: { dateTime: startDate.toISOString(), timeZone: "Asia/Jakarta" },
          end: { dateTime: endDate.toISOString(), timeZone: "Asia/Jakarta" },
        },
      });
    } catch (calendarError) {
      console.error("Calendar Error:", calendarError);
    }

    return sendSuccess(newBooking[0]);
  } catch (error: any) {
    return handleApiError(error);
  }
}

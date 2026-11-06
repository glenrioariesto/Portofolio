import { NextResponse } from 'next/server';
import { db } from '@/db';
import { careerSalaries } from '@/db/schema';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

function isAuthorized(request: Request): boolean {
  const adminSecret = process.env.ADMIN_SECRET_KEY;
  if (!adminSecret) {
    return false;
  }

  const authHeader = request.headers.get('authorization');
  const customHeader = request.headers.get('x-admin-key');
  const url = new URL(request.url);
  const queryKey = url.searchParams.get('key');

  const token = authHeader?.replace(/^Bearer\s+/i, '') || customHeader || queryKey;
  return token === adminSecret;
}

export async function GET(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { 
          error: 'Unauthorized', 
          message: 'Invalid or missing key parameter. Access restricted.',
          hasSecretEnv: Boolean(process.env.ADMIN_SECRET_KEY)
        },
        { status: 401 }
      );
    }

    const records = await db
      .select()
      .from(careerSalaries)
      .orderBy(desc(careerSalaries.id));

    const monthlyRecords = records.filter(
      (r) => r.paymentFrequency === 'monthly' && Number(r.salaryAmount) > 0
    );
    const avgMonthly =
      monthlyRecords.length > 0
        ? Math.round(
            monthlyRecords.reduce((sum, r) => sum + Number(r.salaryAmount), 0) /
              monthlyRecords.length
          )
        : 0;

    const highestSalary = records.reduce(
      (max, r) => (Number(r.salaryAmount) > max ? Number(r.salaryAmount) : max),
      0
    );

    return NextResponse.json({
      status: 'success',
      data: {
        analytics: {
          totalRecords: records.length,
          monthlyJobsCount: monthlyRecords.length,
          averageMonthlySalary: avgMonthly,
          highestSalaryRecorded: highestSalary,
        },
        records,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Internal Error', 
        message: error?.message || String(error),
        hasDbUrl: Boolean(process.env.DATABASE_URL)
      },
      { status: 500 }
    );
  }
}

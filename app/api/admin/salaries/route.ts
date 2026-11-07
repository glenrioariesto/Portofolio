import { NextResponse } from 'next/server';
import { withDb } from '@/db';
import { careerSalaries } from '@/db/schema';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

const INITIAL_SALARIES = [
  {
    company: 'PT Workforce Nusantara Indonesia',
    role: 'Fullstack Developer',
    period: 'September 2026 - Present',
    salaryAmount: '4000000',
    currency: 'IDR',
    paymentFrequency: 'monthly',
    netOrGross: 'net',
    bonusOrIncentives: 'THR, Annual Performance Bonus',
    benefits: 'BPJS Kesehatan & Ketenagakerjaan, Remote / Flexible, Equipment allowance',
    notes: 'Engineered Piknix ecosystem (NestJS monorepo, 3 mobile apps, Google Maps polygon routing, BullMQ & Redis).',
  },
  {
    company: 'PT Gampang Cari Cuan | Aigensee',
    role: 'Fullstack Web Developer',
    period: 'August 2024 - August 2026',
    salaryAmount: '3000000',
    currency: 'IDR',
    paymentFrequency: 'monthly',
    netOrGross: 'net',
    bonusOrIncentives: 'Revenue Sharing (IDR 100M+ launch milestone bonus)',
    benefits: 'Course access, Remote equipment, Performance incentive',
    notes: 'AI-art platform (Next.js, PostgreSQL, Midtrans, Watzap WhatsApp automation), 6 Kemendikbud educational games.',
  },
  {
    company: 'Lecturer Project',
    role: 'Data Collection',
    period: 'May 2024 - June 2024',
    salaryAmount: '1500000',
    currency: 'IDR',
    paymentFrequency: 'project',
    netOrGross: 'net',
    bonusOrIncentives: 'Research Project Grant / Honorarium',
    benefits: 'Academic research publication credit',
    notes: 'Scraped and processed 100,000+ tweets for 2024 Indonesian presidential election sentiment analysis using Python & Colab.',
  },
  {
    company: 'Bebras Indonesia',
    role: 'Data Collection',
    period: 'Jul 2022 - Aug 2022',
    salaryAmount: '1500000',
    currency: 'IDR',
    paymentFrequency: 'project',
    netOrGross: 'net',
    bonusOrIncentives: 'Survey facilitation stipend',
    benefits: 'Certificate of Appreciation, National Education Network',
    notes: 'Systematic field data collection across 10 provinces in Indonesia for computational thinking curricula in vocational high schools.',
  },
];

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

    return await withDb(async (db) => {
      let records: any[] = [];
      let dataSource = 'database';

      try {
        records = await db
          .select()
          .from(careerSalaries)
          .orderBy(desc(careerSalaries.id));
      } catch (dbErr: any) {
        // When table is not migrated yet in Nile, seamlessly fall back to seed data
        records = INITIAL_SALARIES.map((s, idx) => ({
          id: idx + 1,
          ...s,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));
        dataSource = 'fallback_seed';
      }

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
        dataSource,
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
    });
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Internal Error', 
        message: error?.message || String(error),
        hasDbUrl: Boolean(process.env.DATABASE_URL),
        dbUrlPrefix: process.env.DATABASE_URL ? `${process.env.DATABASE_URL.slice(0, 15)}... (${process.env.DATABASE_URL.length} chars)` : null
      },
      { status: 500 }
    );
  }
}

import { pgTable, serial, text, timestamp, varchar, date, pgEnum, numeric } from 'drizzle-orm/pg-core';

export const bookingStatusEnum = pgEnum('booking_status', ['pending', 'confirmed', 'cancelled']);

export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  
  // Data Client
  clientName: varchar('client_name', { length: 255 }).notNull(),
  clientEmail: varchar('client_email', { length: 255 }).notNull(),
  clientPhone: varchar('client_phone', { length: 20 }).notNull(),
  projectDetails: text('project_details'),
  projectRepo: text('project_repo'),
  clientIp: varchar("client_ip", { length: 45 }),
  
  // Slot Waktu Booking
  bookingDate: date('booking_date').notNull(),
  bookingTime: varchar('booking_time', { length: 15 }).notNull(),
  
  // Meta data
  status: bookingStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Private Career & Salary History (Internal backend only - never exposed to public frontend)
export const careerSalaries = pgTable('career_salaries', {
  id: serial('id').primaryKey(),
  company: varchar('company', { length: 255 }).notNull(),
  role: varchar('role', { length: 255 }).notNull(),
  period: varchar('period', { length: 100 }).notNull(),
  salaryAmount: numeric('salary_amount', { precision: 14, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 10 }).default('IDR').notNull(),
  paymentFrequency: varchar('payment_frequency', { length: 50 }).default('monthly').notNull(), // 'monthly', 'project', 'hourly'
  netOrGross: varchar('net_or_gross', { length: 10 }).default('net').notNull(), // 'net', 'gross'
  bonusOrIncentives: text('bonus_or_incentives'),
  benefits: text('benefits'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

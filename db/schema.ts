import { pgTable, serial, text, timestamp, varchar, date, pgEnum } from 'drizzle-orm/pg-core';

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

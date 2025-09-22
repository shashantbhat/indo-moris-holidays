import { pgTable, uuid, varchar, integer, boolean, timestamp, date, text, jsonb } from 'drizzle-orm/pg-core';

// export const users = pgTable('users', {
//     id: uuid('id').primaryKey().defaultRandom(),
//     userEmail: varchar('user_email', { length: 255 }).notNull().unique(),
//     userName: varchar('user_name', { length: 255 }).notNull(),
//     userPhone: varchar('user_phone', { length: 20 }),
//     createdAt: timestamp('created_at').defaultNow().notNull(),
//     updatedAt: timestamp('updated_at').defaultNow().notNull(),
// });

// Simple single table schema for travel bookings
export const travelBookings = pgTable('travel_bookings', {
    // Primary key
    id: uuid('id').primaryKey().defaultRandom(),

    // Trip details
    tripType: varchar('trip_type', { length: 20 }).notNull(), // 'one_way' | 'round_trip'
    travelModes: jsonb('travel_modes').notNull(), // string[] - ['flight', 'train', 'bus']
    needsCab: boolean('needs_cab').default(false),

    // Location details
    originCity: varchar('origin_city', { length: 255 }).notNull(),
    destinationCity: varchar('destination_city', { length: 255 }).notNull(),

    // Date details
    departureDate: date('departure_date').notNull(),
    returnDate: date('return_date'), // null for one-way trips

    // Passenger details
    adultsCount: integer('adults_count').notNull().default(1),
    kidsCount: integer('kids_count').notNull().default(0),
    totalPassengers: integer('total_passengers').notNull(), // computed field

    // Travel preferences
    classType: varchar('class_type', { length: 30 }).notNull().default('economy'), // 'economy' | 'premium_economy' | 'business' | 'first'
    fareType: varchar('fare_type', { length: 30 }).notNull().default('regular'), // 'regular' | 'armed_forces' | 'student' | 'senior_citizen' | 'doctors_nurses'

    // Booking status and metadata
    status: varchar('status', { length: 20 }).notNull().default('pending'), // 'pending' | 'confirmed' | 'cancelled' | 'completed'
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),

    // Optional user information
    userEmail: varchar('user_email', { length: 255 }),
    userName: varchar('user_name', { length: 255 }),
    userPhone: varchar('user_phone', { length: 20 }),

    // Additional notes or special requests
    notes: text('notes'),
});

// Type definitions for TypeScript
export type TravelBooking = typeof travelBookings.$inferSelect;
export type NewTravelBooking = typeof travelBookings.$inferInsert;

// Interface matching your React form data
export interface TravelBookingFormData {
    tripType: 'one_way' | 'round_trip';
    travelModes: string[]; // ['flight', 'train', 'bus']
    needsCab: boolean;
    originCity: string;
    destinationCity: string;
    departureDate: string;
    returnDate: string;
    adultsCount: number;
    kidsCount: number;
    classType: 'economy' | 'premium_economy' | 'business' | 'first';
    fareType: 'regular' | 'armed_forces' | 'student' | 'senior_citizen' | 'doctors_nurses';
}
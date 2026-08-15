import { eq, desc, and, like, gte, lte } from "drizzle-orm";
import {
    travelBookings,
    type NewTravelBooking,
    type TravelBooking,
    type TravelBookingFormData,
} from "~/models/db/schema";
import { getDb } from "../db.server";

export class TravelBookingService {
    constructor(private readonly db: ReturnType<typeof getDb>) {}

    /**
     * Create a new booking from form data
     */
    async createBooking(
        formData: TravelBookingFormData,
        userId: string
    ): Promise<TravelBooking> {
        const totalPassengers = formData.adultsCount + formData.kidsCount;

        const bookingData: NewTravelBooking = {
            tripType: formData.tripType,
            travelModes: formData.travelModes, // JSON array
            needsCab: formData.needsCab,
            originCity: formData.originCity.trim(),
            destinationCity: formData.destinationCity.trim(),
            departureDate: formData.departureDate,
            returnDate:
                formData.tripType === "round_trip"
                    ? formData.returnDate
                    : null,
            adultsCount: formData.adultsCount,
            kidsCount: formData.kidsCount,
            totalPassengers,
            classType: formData.classType,
            fareType: formData.fareType,
            userId,
            status: "pending",
        };

        const [newBooking] = await this.db
            .insert(travelBookings)
            .values(bookingData)
            .returning();
        return newBooking;
    }

    /**
     * Get booking by ID
     */
    async getBookingById(bookingId: string): Promise<TravelBooking | null> {
        const [booking] = await this.db
            .select()
            .from(travelBookings)
            .where(eq(travelBookings.id, bookingId));

        return booking || null;
    }

    /**
     * Get all bookings (with pagination)
     */
    async getAllBookings(limit = 50, offset = 0): Promise<TravelBooking[]> {
        const bookings = await this.db
            .select()
            .from(travelBookings)
            .orderBy(desc(travelBookings.createdAt))
            .limit(limit)
            .offset(offset);

        return bookings;
    }

    /**
     * Get bookings by user id
     */
    async getBookingsByUserId(userId: string): Promise<TravelBooking[]> {
        const bookings = await this.db
            .select()
            .from(travelBookings)
            .where(eq(travelBookings.userId, userId))
            .orderBy(desc(travelBookings.createdAt));

        return bookings;
    }

    /**
     * Update booking status
     */
    async updateBookingStatus(
        bookingId: string,
        status: "pending" | "confirmed" | "cancelled" | "completed"
    ): Promise<TravelBooking | null> {
        const [updatedBooking] = await this.db
            .update(travelBookings)
            .set({
                status,
                updatedAt: new Date(),
            })
            .where(eq(travelBookings.id, bookingId))
            .returning();

        return updatedBooking || null;
    }

    /**
     * Update booking details
     */
    async updateBooking(
        bookingId: string,
        updates: Partial<NewTravelBooking>
    ): Promise<TravelBooking | null> {
        const [updatedBooking] = await this.db
            .update(travelBookings)
            .set({
                ...updates,
                updatedAt: new Date(),
            })
            .where(eq(travelBookings.id, bookingId))
            .returning();

        return updatedBooking || null;
    }

    /**
     * Delete a booking
     */
    async deleteBooking(bookingId: string): Promise<TravelBooking | null> {
        const [deletedBooking] = await this.db
            .delete(travelBookings)
            .where(eq(travelBookings.id, bookingId))
            .returning();

        return deletedBooking || null;
    }

    /**
     * Search bookings by route (origin and destination)
     */
    async searchBookingsByRoute(
        origin: string,
        destination: string
    ): Promise<TravelBooking[]> {
        const bookings = await this.db
            .select()
            .from(travelBookings)
            .where(
                and(
                    like(travelBookings.originCity, `%${origin}%`),
                    like(travelBookings.destinationCity, `%${destination}%`)
                )
            )
            .orderBy(desc(travelBookings.createdAt));

        return bookings;
    }

    /**
     * Get bookings by date range
     */
    async getBookingsByDateRange(
        startDate: string,
        endDate: string
    ): Promise<TravelBooking[]> {
        const bookings = await this.db
            .select()
            .from(travelBookings)
            .where(
                and(
                    gte(travelBookings.departureDate, startDate),
                    lte(travelBookings.departureDate, endDate)
                )
            )
            .orderBy(desc(travelBookings.createdAt));

        return bookings;
    }

    /**
     * Get bookings by status
     */
    async getBookingsByStatus(
        status: "pending" | "confirmed" | "cancelled" | "completed"
    ): Promise<TravelBooking[]> {
        const bookings = await this.db
            .select()
            .from(travelBookings)
            .where(eq(travelBookings.status, status))
            .orderBy(desc(travelBookings.createdAt));

        return bookings;
    }

    /**
     * Get booking statistics
     */
    async getBookingStats() {
        const allBookings = await this.db.select().from(travelBookings);

        const stats = {
            total: allBookings.length,
            byStatus: allBookings.reduce((acc, booking) => {
                acc[booking.status] = (acc[booking.status] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),
            byTripType: allBookings.reduce((acc, booking) => {
                acc[booking.tripType] = (acc[booking.tripType] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),
            totalPassengers: allBookings.reduce(
                (sum, booking) => sum + booking.totalPassengers,
                0
            ),
            needsCabCount: allBookings.filter((booking) => booking.needsCab)
                .length,
        };

        return stats;
    }

    /**
     * Search bookings with multiple filters
     */
    async searchBookings(filters: {
        origin?: string;
        destination?: string;
        status?: string;
        userId?: string;
        dateFrom?: string;
        dateTo?: string;
        tripType?: string;
    }): Promise<TravelBooking[]> {
        let query = this.db.select().from(travelBookings);
        const conditions = [];

        if (filters.origin) {
            conditions.push(like(travelBookings.originCity, `%${filters.origin}%`));
        }

        if (filters.destination) {
            conditions.push(
                like(travelBookings.destinationCity, `%${filters.destination}%`)
            );
        }

        if (filters.status) {
            conditions.push(eq(travelBookings.status, filters.status));
        }

        if (filters.userId) {
            conditions.push(eq(travelBookings.userId, filters.userId));
        }

        if (filters.dateFrom) {
            conditions.push(gte(travelBookings.departureDate, filters.dateFrom));
        }

        if (filters.dateTo) {
            conditions.push(lte(travelBookings.departureDate, filters.dateTo));
        }

        if (filters.tripType) {
            conditions.push(eq(travelBookings.tripType, filters.tripType));
        }

        if (conditions.length > 0) {
            query = query.where(and(...conditions)) as any;
        }

        const bookings = await query.orderBy(desc(travelBookings.createdAt));
        return bookings;
    }
}

export function getTravelBookingService(
    env: { DATABASE_URL: string }
) {
    const db = getDb(env);

    return new TravelBookingService(db);
}
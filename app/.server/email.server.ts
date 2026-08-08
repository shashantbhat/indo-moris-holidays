import { Resend } from "resend";
import type { TravelBookingFormData } from "~/models/db/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingNotification(
    booking: TravelBookingFormData
) {
    const { data, error } = await resend.emails.send({
        from: "Booking Notifications <onboarding@resend.dev>",
        to: [process.env.BOOKING_NOTIFICATION_EMAIL!],
        subject: `New Travel Booking: ${booking.originCity} → ${booking.destinationCity}`,
        html: `
            <h2>New Travel Booking</h2>

            <h3>Journey Details</h3>
            <p>
                <strong>From:</strong> ${booking.originCity}
            </p>
            <p>
                <strong>To:</strong> ${booking.destinationCity}
            </p>
            <p>
                <strong>Trip Type:</strong> ${booking.tripType}
            </p>
            <p>
                <strong>Departure Date:</strong> ${booking.departureDate}
            </p>
            <p>
                <strong>Return Date:</strong> ${
                    booking.returnDate || "N/A"
                }
            </p>

            <h3>Passengers</h3>
            <p>
                <strong>Adults:</strong> ${booking.adultsCount}
            </p>
            <p>
                <strong>Kids:</strong> ${booking.kidsCount}
            </p>

            <h3>Preferences</h3>
            <p>
                <strong>Travel Modes:</strong> ${
                    booking.travelModes.join(", ")
                }
            </p>
            <p>
                <strong>Cab Required:</strong> ${
                    booking.needsCab ? "Yes" : "No"
                }
            </p>
            <p>
                <strong>Class:</strong> ${booking.classType}
            </p>
            <p>
                <strong>Fare Type:</strong> ${booking.fareType}
            </p>
        `,
    });

    if (error) {
        throw new Error(`Failed to send booking email: ${error.message}`);
    }

    return data;
}
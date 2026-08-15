import { Resend } from "resend";
import type { TravelBookingFormData, UserDetails } from "~/models/db/schema";

type EmailEnv = {
    RESEND_API_KEY: string;
    BOOKING_NOTIFICATION_EMAIL: string;
};

export async function sendBookingNotification(
    env: EmailEnv,
    booking: TravelBookingFormData,
    userInfo: UserDetails
) {
    const resend = new Resend(env.RESEND_API_KEY);

    const [ adminEmail, customerEmail ] = await Promise.all([
        
        resend.emails.send({
            from: 'Booking Notifications <onboarding@resend.dev>',
            to: [env.BOOKING_NOTIFICATION_EMAIL],
            subject: `New Travel Booking: ${booking.originCity} → ${booking.destinationCity}`,
            html: `
                <h2>New Travel Booking</h2>

                <h3>User Details</h3>
                <p>
                    <strong>Name:</strong> ${userInfo.name}
                </p>
                <p>
                    <strong>Email:</strong> ${userInfo.email}
                </p>
                <p>
                    <strong>Phone number:</strong> ${userInfo.phone_number}
                </p>

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
                    <strong>Return Date:</strong> ${booking.returnDate || "N/A"}
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
                    <strong>Travel Modes:</strong> ${booking.travelModes.join(", ")}
                </p>
                <p>
                    <strong>Cab Required:</strong> ${booking.needsCab ? "Yes" : "No"}
                </p>
                <p>
                    <strong>Class:</strong> ${booking.classType}
                </p>
                <p>
                    <strong>Fare Type:</strong> ${booking.fareType}
                </p>
            `,
        }),
        resend.emails.send({
            from: 'bookings@indomorisholidays.com',
            to: [userInfo.email],
            subject: `Booking Confirmation: ${booking.originCity} → ${booking.destinationCity}`,
            html: `
                <h2>Dear ${userInfo.name}, your booking has been received</h2>

                <h3>User Details</h3>
                <p>
                    <strong>Name:</strong> ${userInfo.name}
                </p>
                <p>
                    <strong>Email:</strong> ${userInfo.email}
                </p>
                <p>
                    <strong>Phone number:</strong> ${userInfo.phone_number}
                </p>

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
                    <strong>Return Date:</strong> ${booking.returnDate || "N/A"}
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
                    <strong>Travel Modes:</strong> ${booking.travelModes.join(", ")}
                </p>
                <p>
                    <strong>Cab Required:</strong> ${booking.needsCab ? "Yes" : "No"}
                </p>
                <p>
                    <strong>Class:</strong> ${booking.classType}
                </p>
                <p>
                    <strong>Fare Type:</strong> ${booking.fareType}
                </p>
            `,
        }),
    ]);

    if (adminEmail.error) {
        throw new Error(`Failed to send booking email: ${adminEmail.error.message}`);
    }

    if (customerEmail.error) {
        throw new Error(`Failed to send booking email: ${customerEmail.error.message}`);
    }

   return {
        adminEmail: adminEmail.data,
        customerEmail: customerEmail.data,
    };
}
CREATE TYPE "public"."booking_status" AS ENUM('draft', 'searching', 'booked', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."class_type" AS ENUM('economy', 'premium_economy', 'business', 'first');--> statement-breakpoint
CREATE TYPE "public"."fare_type" AS ENUM('regular', 'armed_forces', 'student', 'senior_citizen', 'doctors_nurses');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'other');--> statement-breakpoint
CREATE TYPE "public"."travel_mode" AS ENUM('flight', 'train', 'bus', 'cab');--> statement-breakpoint
CREATE TYPE "public"."trip_type" AS ENUM('one_way', 'round_trip');--> statement-breakpoint
CREATE TABLE "accommodations" (
	"id" serial PRIMARY KEY NOT NULL,
	"booking_id" integer,
	"hotel_name" varchar(200),
	"check_in_date" date NOT NULL,
	"check_out_date" date NOT NULL,
	"room_type" varchar(50),
	"guests_count" integer DEFAULT 1 NOT NULL,
	"location" varchar(200) NOT NULL,
	"price_per_night" numeric(8, 2),
	"total_price" numeric(10, 2),
	"status" "booking_status" DEFAULT 'draft',
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "passengers" (
	"id" serial PRIMARY KEY NOT NULL,
	"booking_id" integer,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"date_of_birth" date,
	"gender" "gender",
	"passport_number" varchar(20),
	"nationality" varchar(50),
	"meal_preference" varchar(30),
	"special_assistance" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "travel_bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"trip_type" "trip_type" NOT NULL,
	"travel_mode" "travel_mode" NOT NULL,
	"origin_city" varchar(100) NOT NULL,
	"origin_code" varchar(10),
	"destination_city" varchar(100) NOT NULL,
	"destination_code" varchar(10),
	"departure_date" date NOT NULL,
	"return_date" date,
	"traveler_count" integer DEFAULT 1 NOT NULL,
	"class_type" "class_type" DEFAULT 'economy' NOT NULL,
	"fare_type" "fare_type" DEFAULT 'regular',
	"direct_flight_only" boolean DEFAULT false,
	"status" "booking_status" DEFAULT 'draft',
	"estimated_price" numeric(10, 2),
	"currency" varchar(3) DEFAULT 'INR',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"phone" varchar(20),
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_booking_id_travel_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."travel_bookings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "passengers" ADD CONSTRAINT "passengers_booking_id_travel_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "public"."travel_bookings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "travel_bookings" ADD CONSTRAINT "travel_bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
CREATE TABLE "sessions" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "user_id" uuid NOT NULL,
    "expires_at" timestamp NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE "users" (
    "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    "user_email" varchar(255) NOT NULL,
    "user_name" varchar(255) NOT NULL,
    "user_phone" varchar(20),
    "password_hash" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "users_user_email_unique" UNIQUE("user_email")
);

ALTER TABLE "sessions"
ADD CONSTRAINT "sessions_user_id_users_id_fk"
FOREIGN KEY ("user_id")
REFERENCES "public"."users"("id")
ON DELETE CASCADE;

ALTER TABLE "travel_bookings"
ADD COLUMN "user_id" uuid;

ALTER TABLE "travel_bookings"
ADD CONSTRAINT "travel_bookings_user_id_users_id_fk"
FOREIGN KEY ("user_id")
REFERENCES "public"."users"("id");
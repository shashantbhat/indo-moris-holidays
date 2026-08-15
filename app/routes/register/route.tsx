import {
    Form,
    Link,
    useActionData,
    useNavigation,
} from "@remix-run/react";

import {
    json,
    redirect,
} from "@remix-run/cloudflare";

import type {
    ActionFunctionArgs,
} from "@remix-run/cloudflare";

import { eq } from "drizzle-orm";

import {
    users,
    sessions,
} from "~/models/db/schema";

import { hashPassword } from "~/.server/password.server";

// Change this import to your existing DB connection/helper
import { getDb } from "~/db.server";

import { createCookie } from "@remix-run/cloudflare";

const sessionCookie = createCookie("session", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
});

export async function action({
    request,
    context,
}: ActionFunctionArgs) {

    const formData = await request.formData();

    const name = String(
        formData.get("name") || ""
    ).trim();

    const email = String(
        formData.get("email") || ""
    )
        .trim()
        .toLowerCase();

    const phone = String(
        formData.get("phone") || ""
    ).trim();

    const password = String(
        formData.get("password") || ""
    );

    const confirmPassword = String(
        formData.get("confirmPassword") || ""
    );

    // -----------------------------
    // Validation
    // -----------------------------

    if (!name || !email || !password) {
        return json(
            {
                error: "Name, email and password are required.",
            },
            { status: 400 }
        );
    }

    if (password.length < 8) {
        return json(
            {
                error: "Password must be at least 8 characters.",
            },
            { status: 400 }
        );
    }

    if (password !== confirmPassword) {
        return json(
            {
                error: "Passwords do not match.",
            },
            { status: 400 }
        );
    }

    // Basic email validation
    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return json(
            {
                error: "Please enter a valid email address.",
            },
            { status: 400 }
        );
    }

    // -----------------------------
    // Database
    // -----------------------------

    const db = getDb(
        context.cloudflare.env
    );

    // Check whether user already exists

    const existingUser = await db
        .select({
            id: users.id,
        })
        .from(users)
        .where(eq(users.userEmail, email))
        .limit(1);

    if (existingUser.length > 0) {
        return json(
            {
                error:
                    "An account with this email already exists.",
            },
            { status: 409 }
        );
    }

    // -----------------------------
    // Hash password
    // -----------------------------

    const passwordHash =
        await hashPassword(password);

    // -----------------------------
    // Create user
    // -----------------------------

    const [user] = await db
        .insert(users)
        .values({
            userName: name,
            userEmail: email,
            userPhone: phone || null,
            passwordHash,
        })
        .returning({
            id: users.id,
            userEmail: users.userEmail,
            userName: users.userName,
        });

    // -----------------------------
    // Create session
    // -----------------------------

    const sessionId =
        crypto.randomUUID();

    const expiresAt = new Date(
        Date.now() +
        7 * 24 * 60 * 60 * 1000
    );

    await db
        .insert(sessions)
        .values({
            id: sessionId,
            userId: user.id,
            expiresAt,
        });

    // -----------------------------
    // Set session cookie
    // -----------------------------

    const cookie =
        await sessionCookie.serialize(
            sessionId
        );

    return redirect("/", {
        headers: {
            "Set-Cookie": cookie,
        },
    });
}

export default function Register() {

    const actionData =
        useActionData<typeof action>();

    const navigation =
        useNavigation();

    const isSubmitting =
        navigation.state === "submitting";

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12  mt-20 md:mt-10">

            <div className="w-full max-w-md">

                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                        Create an account
                    </h1>

                    <p className="text-sm md:text-base mt-2 text-gray-600">
                        Create an account to continue
                        with your travel booking.
                    </p>
                </div>

                <Form
                    method="post"
                    className="space-y-5"
                >

                    {/* Name */}

                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Full Name
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="Your full name"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                        />
                    </div>

                    {/* Email */}

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="you@example.com"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                        />
                    </div>

                    {/* Phone */}

                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Phone Number
                        </label>

                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="+91 9876543210"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                        />
                    </div>

                    {/* Password */}

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            minLength={8}
                            autoComplete="new-password"
                            placeholder="At least 8 characters"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                        />
                    </div>

                    {/* Confirm Password */}

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            required
                            minLength={8}
                            autoComplete="new-password"
                            placeholder="Re-enter your password"
                            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-black"
                        />
                    </div>

                    {/* Error */}

                    {actionData?.error && (
                        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                            {actionData.error}
                        </div>
                    )}

                    {/* Submit */}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmitting
                            ? "Creating account..."
                            : "Create Account"}
                    </button>

                </Form>

                {/* Login */}

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="font-medium text-black hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}
import {
    Form,
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

import { loginUser } from "~/.server/auth.server";

export async function action({
    request,
    context,
}: ActionFunctionArgs) {

    const formData = await request.formData();

    const email = String(
        formData.get("email") || ""
    )
        .trim()
        .toLowerCase();

    const password = String(
        formData.get("password") || ""
    );

    if (!email || !password) {
        return json(
            {
                error: "Email and password are required.",
            },
            { status: 400 }
        );
    }

    const result = await loginUser(
        context.cloudflare.env,
        email,
        password
    );

    if (!result) {
        return json(
            {
                error: "Invalid email or password.",
            },
            { status: 401 }
        );
    }

    return redirect("/", {
        headers: {
            "Set-Cookie": result.cookie,
        },
    });
}

export default function Login() {

    const actionData =
        useActionData<typeof action>();

    const navigation = useNavigation();

    const isSubmitting =
        navigation.state === "submitting";

    return (
        <div className="min-h-screen flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <h1 className="text-3xl font-bold">
                    Login
                </h1>

                <p className="mt-2 text-gray-600">
                    Login to continue with your booking.
                </p>

                <Form
                    method="post"
                    className="mt-8 space-y-5"
                >

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className="mt-2 w-full rounded-lg border px-4 py-3"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            autoComplete="current-password"
                            className="mt-2 w-full rounded-lg border px-4 py-3"
                            placeholder="••••••••"
                        />
                    </div>

                    {actionData?.error && (
                        <p className="text-sm text-red-600">
                            {actionData.error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-black px-4 py-3 text-white disabled:opacity-50"
                    >
                        {isSubmitting
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </Form>

                <p className="mt-6 text-center text-sm">
                    Don't have an account?{" "}

                    <a
                        href="/register"
                        className="font-medium underline"
                    >
                        Register
                    </a>
                </p>

            </div>
        </div>
    );
}
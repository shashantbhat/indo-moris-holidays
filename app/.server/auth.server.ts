import { eq } from "drizzle-orm";
import { createCookie } from "@remix-run/cloudflare";

import { users, sessions } from "~/models/db/schema";
import { verifyPassword } from "~/.server/password.server" 

import { getDb } from "~/db.server"

const sessionCookie = createCookie("session", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
});

export async function loginUser(
    env: Env,
    email: string,
    password: string
) {
    const db = getDb(env);

    const result = await db
        .select()
        .from(users)
        .where(eq(users.userEmail, email))
        .limit(1);

    const user = result[0];

    if (!user) {
        return null;
    }

    const validPassword = await verifyPassword(
        password,
        user.passwordHash
    );

    if (!validPassword) {
        return null;
    }

    const sessionId = crypto.randomUUID();

    const expiresAt = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
    );

    await db.insert(sessions).values({
        id: sessionId,
        userId: user.id,
        expiresAt,
    });

    const cookie = await sessionCookie.serialize(sessionId);

    return {
        user,
        cookie,
    };
}

export async function getCurrentUser(

    request: Request,

    env: { DATABASE_URL: string }

) {

    const cookieHeader =

        request.headers.get("Cookie");

    if (!cookieHeader) {

        return null;

    }

    const sessionId =

        await sessionCookie.parse(cookieHeader);

    if (!sessionId) {

        return null;

    }

    const db = getDb(env);

    const result = await db

        .select({

            user: users,

            session: sessions,

        })

        .from(sessions)

        .innerJoin(

            users,

            eq(sessions.userId, users.id)

        )

        .where(eq(sessions.id, sessionId))

        .limit(1);

    if (result.length === 0) {

        return null;

    }

    const { user, session } = result[0];

    // Session expired

    if (session.expiresAt < new Date()) {

        return null;

    }

    return user;

}

export async function logoutUser(

    request: Request,

    env: { DATABASE_URL: string }

) {

    const cookieHeader = request.headers.get("Cookie");

    if (cookieHeader) {

        const sessionId = await sessionCookie.parse(cookieHeader);

        if (sessionId) {

            const db = getDb(env);

            await db

                .delete(sessions)

                .where(eq(sessions.id, sessionId));

        }

    }

    // Expire the session cookie

    return sessionCookie.serialize("", {

        maxAge: 0,

    });

}
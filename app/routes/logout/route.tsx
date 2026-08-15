import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";

import { logoutUser } from "~/.server/auth.server";

export async function action({
    request,
    context,
}: ActionFunctionArgs) {
    const cookie = await logoutUser(
        request,
        context.cloudflare.env
    );

    return redirect("/", {
        headers: {
            "Set-Cookie": cookie,
        },
    });
}
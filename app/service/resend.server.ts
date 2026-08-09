import { Resend } from "resend";

export function getResend(env: { RESEND_API_KEY: string }) {
    return new Resend(env.RESEND_API_KEY);
}
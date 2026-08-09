export interface Env {
  DATABASE_URL: string;
  VITE_CDN_URL: string;
  RESEND_API_KEY: string;
  BOOKING_NOTIFICATION_EMAIL: string;
}

function requireEnv(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export function getServerEnv(env: Env) {
  return {
    databaseUrl: requireEnv(env.DATABASE_URL, "DATABASE_URL"),
    viteCdnUrl: requireEnv(env.VITE_CDN_URL, "API_KEY"),
    resendApiKey: requireEnv(env.RESEND_API_KEY, "RESEND_API_KEY"),
    bookingNotificationEmail: requireEnv(env.BOOKING_NOTIFICATION_EMAIL, "BOOKING_NOTIFICATION_EMAIL"),
  };
}
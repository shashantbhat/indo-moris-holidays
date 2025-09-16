import { defineConfig } from "drizzle-kit";
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
    dialect: "postgresql",
    schema: "./drizzle/schema.ts",
    out: "./migrations",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});

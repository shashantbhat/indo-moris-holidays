import { defineConfig } from "drizzle-kit";
import dotenv from 'dotenv';
dotenv.config({path: ".dev.vars"});

export default defineConfig({
    dialect: "postgresql",
    schema: "./app/models/db/schema.ts",
    out: "./migrations",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});

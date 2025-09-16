import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "~/models/db/schema";

// Create a connection pool to Neon/Postgres
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // put your Neon DB URL in .env
});

export const db = drizzle(pool, { schema });
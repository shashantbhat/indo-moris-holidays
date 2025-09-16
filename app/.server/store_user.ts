import { db } from '~/db.server'; // your drizzle client
import { users } from '~/models/db/schema';

export async function addUser(name: string) {
    const result = await db.insert(users)
        .values({ name })
        .returning(); // returning all columns
    console.log('Inserted user:', result);
    return result;
}
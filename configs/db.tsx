<<<<<<< HEAD
"use server";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

console.log("DATABASE_URL:", process.env.DATABASE_URL); // Debug

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });
=======
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb

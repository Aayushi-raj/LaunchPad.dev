import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" }); // Loads Neon URL

export default defineConfig({
  schema: "./configs/schema.ts", // Make sure this path matches your schema file!
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});

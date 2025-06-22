<<<<<<< HEAD
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
=======
import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./configs/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb

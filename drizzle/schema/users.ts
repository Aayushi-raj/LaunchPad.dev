import {
  serial,
  text,
  timestamp,
  boolean,
  json,
} from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  image: text("image"),
  emailVerified: boolean("email_verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  preferences: json("preferences").$type<{
    emailNotifications: boolean;
    pushNotifications: boolean;
    notificationTypes: {
      project: boolean;
      team: boolean;
      task: boolean;
      comment: boolean;
    };
    theme: "light" | "dark" | "system";
  }>(),
}); 
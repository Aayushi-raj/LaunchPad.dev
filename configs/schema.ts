import { integer, pgTable, varchar, timestamp, text, json, boolean } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});

export const userPreferencesTable = pgTable("user_preferences", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: varchar({ length: 255 }).notNull(),
    emailNotifications: boolean().default(true),
    pushNotifications: boolean().default(true),
    notificationTypes: json().$type<{
        project: boolean;
        team: boolean;
        task: boolean;
        comment: boolean;
    }>(),
    theme: varchar({ length: 20 }).default('system'),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
});

export const projectsTable = pgTable("projects", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    description: text(),
    currentStatus: varchar({ length: 50 }).notNull().default('not_started'),
    createdById: varchar({ length: 255 }).notNull(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
});

export const projectStatusHistoryTable = pgTable("project_status_history", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    projectId: integer().notNull().references(() => projectsTable.id),
    status: varchar({ length: 50 }).notNull(),
    notes: text(),
    changedById: varchar({ length: 255 }).notNull(),
    changedAt: timestamp().defaultNow(),
});

export const projectStatusConfigTable = pgTable("project_status_config", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 50 }).notNull().unique(),
    color: varchar({ length: 7 }).notNull(), // hex color
    description: text(),
    order: integer().notNull(),
    isDefault: boolean().default(false),
    metadata: json(), // For any additional status-specific configuration
});
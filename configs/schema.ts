<<<<<<< HEAD
import { integer, json, pgTable, varchar } from "drizzle-orm/pg-core";

=======
import { integer, text, jsonb, timestamp, pgTable, varchar } from "drizzle-orm/pg-core";
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
});

<<<<<<< HEAD
export const HistoryTable = pgTable("historyTable", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    recordId: varchar({ length: 255 }).notNull(), // UUID as string
    content: json(),
    userEmail: varchar({ length: 255 }).references(() => usersTable.email),
    createdAt: varchar({ length: 255 }),
    aiAgentType: varchar()// or use timestamp if supported
=======

export const roadmap = pgTable("roadmap", {
    recordId: text("record_id").primaryKey(),
    roadmapTitle: text("roadmap_title").notNull(),
    description: text("description").notNull(),
    duration: text("duration").notNull(),
    initialNodes: jsonb("initial_nodes").notNull(),
    initialEdges: jsonb("initial_edges").notNull(),
    aiAgentType: text("ai_agent_type").notNull(),
    userEmail: text("user_email").notNull(),
    metadata: text("metadata").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
>>>>>>> cb902a7af06325460e15629bc8f374a648e17ecb
});
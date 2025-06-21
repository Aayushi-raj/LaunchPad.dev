import { integer, text, jsonb, timestamp, pgTable, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),

});
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
});
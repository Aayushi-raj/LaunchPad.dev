import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { projects } from "./projects";

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  createdById: integer("created_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  role: varchar("role", { length: 50 }).notNull().default("member"),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const teamProjects = pgTable("team_projects", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id).notNull(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const teamResources = pgTable("team_resources", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id").references(() => teams.id).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  type: varchar("type", { length: 50 }).notNull(),
  url: text("url"),
  createdById: integer("created_by_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const teamsRelations = relations(teams, ({ one, many }) => ({
  creator: one(users, {
    fields: [teams.createdById],
    references: [users.id],
  }),
  members: many(teamMembers),
  projects: many(teamProjects),
  resources: many(teamResources),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.id],
  }),
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
}));

export const teamProjectsRelations = relations(teamProjects, ({ one }) => ({
  team: one(teams, {
    fields: [teamProjects.teamId],
    references: [teams.id],
  }),
  project: one(projects, {
    fields: [teamProjects.projectId],
    references: [projects.id],
  }),
}));

export const teamResourcesRelations = relations(teamResources, ({ one }) => ({
  team: one(teams, {
    fields: [teamResources.teamId],
    references: [teams.id],
  }),
  creator: one(users, {
    fields: [teamResources.createdById],
    references: [users.id],
  }),
})); 
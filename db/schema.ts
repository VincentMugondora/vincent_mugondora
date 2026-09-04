import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const workHistory = sqliteTable("work_history", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location"),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  description: text("description"),
  isCurrent: integer("is_current", { mode: "boolean" }).default(false),
  order: integer("order").default(0),
  createdAt: text("created_at").default("(datetime('now'))"),
});

export const education = sqliteTable("education", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  institution: text("institution"),
  description: text("description"),
  category: text("category"),
  order: integer("order").default(0),
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  problem: text("problem"),
  role: text("role"),
  category: text("category"),
  technologies: text("technologies", { mode: "json" }).$type<string[]>().default([]),
  image: text("image"),
  imageAlt: text("image_alt"),
  github: text("github"),
  live: text("live"),
  featured: integer("featured", { mode: "boolean" }).default(false),
  status: text("status").default("completed"),
  publishedAt: text("published_at"),
  createdAt: text("created_at").default("(datetime('now'))"),
});

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  featured: integer("featured", { mode: "boolean" }).default(false),
  draft: integer("draft", { mode: "boolean" }).default(false),
  image: text("image"),
  publishedAt: text("published_at").notNull(),
  updatedAt: text("updated_at"),
  createdAt: text("created_at").default("(datetime('now'))"),
});

export const experiments = sqliteTable("experiments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  problem: text("problem"),
  hypothesis: text("hypothesis"),
  technologies: text("technologies", { mode: "json" }).$type<string[]>().default([]),
  status: text("status").default("active"),
  publishedAt: text("published_at"),
  createdAt: text("created_at").default("(datetime('now'))"),
});

export const speakingEvents = sqliteTable("speaking_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  event: text("event").notNull(),
  date: text("date").notNull(),
  location: text("location"),
  topic: text("topic"),
  description: text("description"),
  type: text("type").default("talk"),
  slides: text("slides"),
  video: text("video"),
  createdAt: text("created_at").default("(datetime('now'))"),
});

export const programs = sqliteTable("programs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  audience: text("audience"),
  format: text("format"),
  order: integer("order").default(0),
});

export const services = sqliteTable("services", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  technologies: text("technologies", { mode: "json" }).$type<string[]>().default([]),
  icon: text("icon"),
  order: integer("order").default(0),
});

export const certificates = sqliteTable("certificates", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  issuer: text("issuer"),
  issuedDate: text("issued_date"),
  fileKey: text("file_key").notNull(),
  fileType: text("file_type").notNull(),
  createdAt: text("created_at").default("(datetime('now'))"),
});

export const nowEntries = sqliteTable("now_entries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  category: text("category").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").default("active"),
  order: integer("order").default(0),
  updatedAt: text("updated_at").default("(datetime('now'))"),
});

export const siteConfig = sqliteTable("site_config", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  key: text("key").unique().notNull(),
  value: text("value").notNull(),
  updatedAt: text("updated_at").default("(datetime('now'))"),
});

export const messages = sqliteTable("messages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  status: text("status").default("unread"),
  createdAt: text("created_at").default("(datetime('now'))"),
});

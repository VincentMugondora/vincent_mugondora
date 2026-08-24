CREATE TABLE `certificates` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`issuer` text,
	`issued_date` text,
	`file_key` text NOT NULL,
	`file_type` text NOT NULL,
	`created_at` text DEFAULT '(datetime(''now''))'
);
--> statement-breakpoint
CREATE TABLE `education` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`institution` text,
	`description` text,
	`category` text,
	`order` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `experiments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`content` text NOT NULL,
	`problem` text,
	`hypothesis` text,
	`technologies` text DEFAULT '[]',
	`status` text DEFAULT 'active',
	`published_at` text,
	`created_at` text DEFAULT '(datetime(''now''))'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `experiments_slug_unique` ON `experiments` (`slug`);--> statement-breakpoint
CREATE TABLE `now_entries` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`status` text DEFAULT 'active',
	`order` integer DEFAULT 0,
	`updated_at` text DEFAULT '(datetime(''now''))'
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`content` text NOT NULL,
	`category` text NOT NULL,
	`featured` integer DEFAULT false,
	`draft` integer DEFAULT false,
	`image` text,
	`published_at` text NOT NULL,
	`updated_at` text,
	`created_at` text DEFAULT '(datetime(''now''))'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `posts_slug_unique` ON `posts` (`slug`);--> statement-breakpoint
CREATE TABLE `programs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`audience` text,
	`format` text,
	`order` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`problem` text,
	`role` text,
	`category` text,
	`technologies` text DEFAULT '[]',
	`image` text,
	`image_alt` text,
	`github` text,
	`live` text,
	`featured` integer DEFAULT false,
	`status` text DEFAULT 'completed',
	`published_at` text,
	`created_at` text DEFAULT '(datetime(''now''))'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);--> statement-breakpoint
CREATE TABLE `services` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`technologies` text DEFAULT '[]',
	`icon` text,
	`order` integer DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX `services_slug_unique` ON `services` (`slug`);--> statement-breakpoint
CREATE TABLE `site_config` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL,
	`updated_at` text DEFAULT '(datetime(''now''))'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `site_config_key_unique` ON `site_config` (`key`);--> statement-breakpoint
CREATE TABLE `speaking_events` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`event` text NOT NULL,
	`date` text NOT NULL,
	`location` text,
	`topic` text,
	`description` text,
	`type` text DEFAULT 'talk',
	`slides` text,
	`video` text,
	`created_at` text DEFAULT '(datetime(''now''))'
);
--> statement-breakpoint
CREATE TABLE `work_history` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`company` text NOT NULL,
	`location` text,
	`start_date` text NOT NULL,
	`end_date` text,
	`description` text,
	`is_current` integer DEFAULT false,
	`order` integer DEFAULT 0,
	`created_at` text DEFAULT '(datetime(''now''))'
);

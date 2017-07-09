CREATE TABLE "tasks" (
"id" serial primary Key,
"task_name" varchar(140) not null,
"complete" boolean,
"complete_by" date
);

INSERT INTO "tasks" ("task_name", "complete", "complete_by") VALUES ('create table', 'true', '07-07-17'), ('add tasks', 'false', '07-08-17'), ('finish assignment', 'false', '07-10-17'), ('graduate', 'false', '09-22-17');
--copy and paste into postico to set up server
--The data will demonstrate each of the many different styling options

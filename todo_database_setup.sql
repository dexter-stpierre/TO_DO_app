CREATE TABLE "tasks" (
"id" serial primary Key,
"task_name" varchar(140) not null,
"complete" boolean,
"complete_by" date
);
--copy and paste into postico to set up server

-- Adminer 4.8.1 PostgreSQL 13.6 dump

\connect "hacker_news_stories";

DROP TABLE IF EXISTS "story";
CREATE TABLE "public"."story" (
    "id" integer NOT NULL,
    "time" timestamp NOT NULL,
    "type" character(25) NOT NULL,
    "title" character(1) NOT NULL,
    "score" integer NOT NULL,
    "by" character(25) NOT NULL,
    "descendants" integer NOT NULL,
    "kids" text NOT NULL,
    "url" character(1) NOT NULL
) WITH (oids = false);

COMMENT ON COLUMN "public"."story"."by" IS 'author - name';


DROP TABLE IF EXISTS collection;
DROP SEQUENCE IF EXISTS story_collection_id_seq;
CREATE SEQUENCE story_collection_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."story_collection" (
    "id" integer DEFAULT nextval('story_collection_id_seq') NOT NULL,
    "name" character(25) NOT NULL,
    "owner_id" integer NOT NULL,
    CONSTRAINT "story_collection_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "story_comment";
DROP SEQUENCE IF EXISTS story_comment_id_seq;
CREATE SEQUENCE story_comment_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."story_comment" (
    "id" integer DEFAULT nextval('story_comment_id_seq') NOT NULL,
    "time" timestamp NOT NULL,
    "type" character(25) NOT NULL,
    "text" text NOT NULL,
    "by" character(25) NOT NULL,
    "parent" integer NOT NULL,
    "kids" text NOT NULL,
    CONSTRAINT "story_comment_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


DROP TABLE IF EXISTS "user";
DROP SEQUENCE IF EXISTS user_id_seq;
CREATE SEQUENCE user_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."user" (
    "id" integer DEFAULT nextval('user_id_seq') NOT NULL,
    "name" character(25) NOT NULL,
    "email" character(255) NOT NULL,
    "password" character(255) NOT NULL,
    "time" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "user_email" UNIQUE ("email"),
    CONSTRAINT "user_name" UNIQUE ("name"),
    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


-- 2022-03-10 19:12:15.161532+00

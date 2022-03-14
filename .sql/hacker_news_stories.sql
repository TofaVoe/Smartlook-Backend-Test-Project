-- Adminer 4.8.1 PostgreSQL 13.6 dump

CREATE SEQUENCE story_collection_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE hacker_news_stories."collection" (
    "id" integer DEFAULT nextval('story_collection_id_seq') NOT NULL,
    "name" character(25) NOT NULL,
    "owner_id" integer NOT NULL,
    CONSTRAINT "story_collection_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


CREATE SEQUENCE collection_has_story_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE hacker_news_stories."collection_has_story" (
    "id" integer DEFAULT nextval('collection_has_story_id_seq') NOT NULL,
    "id_story" integer NOT NULL,
    "id_collection" integer,
    CONSTRAINT "collection_has_story_pk" PRIMARY KEY ("id")
) WITH (oids = false);


CREATE TABLE hacker_news_stories."story" (
    "id" integer NOT NULL,
    "time" timestamp NOT NULL,
    "type" character(25) NOT NULL,
    "title" character(50) NOT NULL,
    "score" integer NOT NULL,
    "by" character(25) NOT NULL,
    "descendants" integer NOT NULL,
    "kids" text NOT NULL,
    "url" character(255) NOT NULL
) WITH (oids = false);

COMMENT ON COLUMN hacker_news_stories."story"."by" IS 'author - name';


CREATE SEQUENCE story_comment_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE hacker_news_stories."story_comment" (
    "id" integer DEFAULT nextval('story_comment_id_seq') NOT NULL,
    "time" timestamp NOT NULL,
    "type" character(25) NOT NULL,
    "text" text NOT NULL,
    "by" character(25) NOT NULL,
    "parent" integer NOT NULL,
    "kids" text NOT NULL,
    CONSTRAINT "story_comment_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


CREATE SEQUENCE user_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE hacker_news_stories."user" (
    "id" integer DEFAULT nextval('user_id_seq') NOT NULL,
    "name" character(25) NOT NULL,
    "email" character(255) NOT NULL,
    "password" character(255) NOT NULL,
    "time" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "user_email" UNIQUE ("email"),
    CONSTRAINT "user_name" UNIQUE ("name"),
    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


-- 2022-03-14 14:03:53.238059+00

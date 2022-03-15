-- Adminer 4.8.1 PostgreSQL 13.6 dump

\connect "hacker_news_stories";

CREATE SEQUENCE collection_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."collection" (
    "id" integer DEFAULT nextval('collection_id_seq') NOT NULL,
    "name" character varying(60) NOT NULL,
    "owner_id" integer,
    CONSTRAINT "collection_pk" PRIMARY KEY ("id")
) WITH (oids = false);


CREATE TABLE "public"."collection_has_story" (
    "story_id" integer,
    "collection_id" integer
) WITH (oids = false);


CREATE TABLE "public"."comment" (
    "id" integer NOT NULL,
    "time" timestamp,
    "type" character varying(7),
    "text" text,
    "by" character varying(60),
    "parent" integer,
    "kids" text,
    CONSTRAINT "comment_id_uindex" UNIQUE ("id")
) WITH (oids = false);


CREATE TABLE "public"."story" (
    "id" integer NOT NULL,
    "time" timestamp,
    "type" character varying(7),
    "title" character varying(120),
    "score" integer,
    "by" character varying(60),
    "descendants" integer,
    "kids" text,
    "url" character varying(255),
    CONSTRAINT "story_id_uindex" UNIQUE ("id")
) WITH (oids = false);


CREATE TABLE "public"."story_has_comment" (
    "story_id" integer,
    "comment_id" integer
) WITH (oids = false);


CREATE SEQUENCE user_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."user" (
    "id" integer DEFAULT nextval('user_id_seq') NOT NULL,
    "name" character varying(60) NOT NULL,
    "password" character varying(60) NOT NULL,
    "email" character varying(60) NOT NULL,
    CONSTRAINT "user_email_uindex" UNIQUE ("email"),
    CONSTRAINT "user_id_uindex" UNIQUE ("id"),
    CONSTRAINT "user_pk" PRIMARY KEY ("id")
) WITH (oids = false);


ALTER TABLE ONLY "public"."collection" ADD CONSTRAINT "collection___fk_owner_user" FOREIGN KEY (owner_id) REFERENCES "user"(id) NOT DEFERRABLE;

ALTER TABLE ONLY "public"."collection_has_story" ADD CONSTRAINT "collection_has_story___fk_collection" FOREIGN KEY (collection_id) REFERENCES collection(id) ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."collection_has_story" ADD CONSTRAINT "collection_has_story___fk_story" FOREIGN KEY (story_id) REFERENCES story(id) ON DELETE CASCADE NOT DEFERRABLE;

ALTER TABLE ONLY "public"."story_has_comment" ADD CONSTRAINT "story_has_comment___fk_comment" FOREIGN KEY (comment_id) REFERENCES comment(id) ON DELETE CASCADE NOT DEFERRABLE;
ALTER TABLE ONLY "public"."story_has_comment" ADD CONSTRAINT "story_has_comment___fk_story" FOREIGN KEY (story_id) REFERENCES story(id) ON DELETE CASCADE NOT DEFERRABLE;

-- 2022-03-15 20:54:56.870574+00

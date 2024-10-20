DROP TABLE IF EXISTS public.posts;

CREATE TABLE IF NOT EXISTS public.posts
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    title varchar(255) COLLATE pg_catalog."default" NOT NULL,
    content text COLLATE pg_catalog."default",
    author varchar(255) COLLATE pg_catalog."default",
    CONSTRAINT posts_pkey PRIMARY KEY (id)
);

CREATE INDEX posts_id ON public.posts (id);

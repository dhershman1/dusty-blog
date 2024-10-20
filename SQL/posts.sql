DROP TABLE IF EXISTS public.posts;

CREATE TABLE IF NOT EXISTS public.posts
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    title varchar(255) COLLATE pg_catalog."default" NOT NULL,
    content text COLLATE pg_catalog."default",
    author varchar(255) COLLATE pg_catalog."default",
    created_by uuid,
    created_at date DEFAULT now(),
    CONSTRAINT posts_pkey PRIMARY KEY (id),
    CONSTRAINT posts_created_by_fkey FOREIGN KEY (created_by)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

CREATE INDEX IF NOT EXISTS posts_id
    ON public.posts USING btree
    (id ASC NULLS LAST)
    TABLESPACE pg_default;

CREATE TABLE public.users
(
    id uuid DEFAULT gen_random_uuid(),
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    PRIMARY KEY (id)
);

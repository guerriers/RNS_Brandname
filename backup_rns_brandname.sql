--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2023-10-12 15:14:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 17118)
-- Name: t_products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.t_products (
    id integer NOT NULL,
    p_name text NOT NULL,
    p_brand text NOT NULL,
    p_price integer NOT NULL,
    p_conditions integer NOT NULL,
    p_receipt text,
    p_img text NOT NULL,
    user_id integer NOT NULL,
    p_description text NOT NULL,
    p_status text NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    p_category text
);


ALTER TABLE public.t_products OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 17117)
-- Name: t_products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.t_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.t_products_id_seq OWNER TO postgres;

--
-- TOC entry 3359 (class 0 OID 0)
-- Dependencies: 216
-- Name: t_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.t_products_id_seq OWNED BY public.t_products.id;


--
-- TOC entry 219 (class 1259 OID 17154)
-- Name: t_reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.t_reviews (
    id integer NOT NULL,
    user_id integer NOT NULL,
    review_img text NOT NULL,
    create_date timestamp with time zone NOT NULL,
    update_date timestamp with time zone
);


ALTER TABLE public.t_reviews OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 17153)
-- Name: t_reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.t_reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.t_reviews_id_seq OWNER TO postgres;

--
-- TOC entry 3360 (class 0 OID 0)
-- Dependencies: 218
-- Name: t_reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.t_reviews_id_seq OWNED BY public.t_reviews.id;


--
-- TOC entry 221 (class 1259 OID 24638)
-- Name: t_userVerify; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."t_userVerify" (
    id integer NOT NULL,
    verify_status text NOT NULL,
    "idCard_img" text NOT NULL,
    bank_img text NOT NULL,
    user_id integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."t_userVerify" OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24637)
-- Name: t_userVerify_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."t_userVerify_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."t_userVerify_id_seq" OWNER TO postgres;

--
-- TOC entry 3361 (class 0 OID 0)
-- Dependencies: 220
-- Name: t_userVerify_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."t_userVerify_id_seq" OWNED BY public."t_userVerify".id;


--
-- TOC entry 215 (class 1259 OID 17107)
-- Name: t_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.t_users (
    id integer NOT NULL,
    f_name text NOT NULL,
    l_name text NOT NULL,
    email text NOT NULL,
    phone integer NOT NULL,
    profile_img text NOT NULL,
    password text NOT NULL,
    status text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.t_users OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 17106)
-- Name: t_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.t_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.t_users_id_seq OWNER TO postgres;

--
-- TOC entry 3362 (class 0 OID 0)
-- Dependencies: 214
-- Name: t_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.t_users_id_seq OWNED BY public.t_users.id;


--
-- TOC entry 3189 (class 2604 OID 17121)
-- Name: t_products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t_products ALTER COLUMN id SET DEFAULT nextval('public.t_products_id_seq'::regclass);


--
-- TOC entry 3190 (class 2604 OID 17157)
-- Name: t_reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t_reviews ALTER COLUMN id SET DEFAULT nextval('public.t_reviews_id_seq'::regclass);


--
-- TOC entry 3191 (class 2604 OID 24641)
-- Name: t_userVerify id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."t_userVerify" ALTER COLUMN id SET DEFAULT nextval('public."t_userVerify_id_seq"'::regclass);


--
-- TOC entry 3188 (class 2604 OID 17110)
-- Name: t_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t_users ALTER COLUMN id SET DEFAULT nextval('public.t_users_id_seq'::regclass);


--
-- TOC entry 3349 (class 0 OID 17118)
-- Dependencies: 217
-- Data for Name: t_products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.t_products (id, p_name, p_brand, p_price, p_conditions, p_receipt, p_img, user_id, p_description, p_status, "createdAt", "updatedAt", p_category) FROM stdin;
75	Product Name	Brand Name	100	80	https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg	https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg	2	Product Description	1	2023-10-05 20:37:56.742+07	2023-10-05 20:37:56.742+07	Category
9	Product	Product	500	50	https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg	https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg	1	Product	0	2004-10-19 15:23:54+07	2004-10-19 15:23:54+07	Product
1	Product	Product	500	50	https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg	https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg	1	Product	0	2004-10-19 15:23:54+07	2004-10-19 15:23:54+07	Product
70	sadasdas	asdasd	2131232	22		https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg	2	asdasdsa	1	2023-10-06 10:06:55.695+07	2023-10-06 10:06:55.695+07	Accessories
73	Product Name	Brand Name	100	80	https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg	https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg	2	Product Description	1	2023-10-06 17:19:45.224+07	2023-10-06 17:19:45.224+07	Category
54	Product Name	Brand Name	100	80	https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg	https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg	2	Product Description	1	2023-10-05 18:48:41.784+07	2023-10-05 18:48:41.784+07	Category
58	asdsa	sadas	213	22		https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg	2	asdsa	1	2023-10-05 19:11:00.825+07	2023-10-05 19:11:00.825+07	Shoes/Sneakers
59	asdsa	sadas	213	22	C:\\fakepath\\Home.png	https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg	2	asdsa	1	2023-10-05 19:11:21.56+07	2023-10-05 19:11:21.56+07	Shoes/Sneakers
74	Product Name	Brand Name	100	80	https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg	https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg	2	Product Description	1	2023-10-06 17:21:39.914+07	2023-10-06 17:21:39.914+07	Category
\.


--
-- TOC entry 3351 (class 0 OID 17154)
-- Dependencies: 219
-- Data for Name: t_reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.t_reviews (id, user_id, review_img, create_date, update_date) FROM stdin;
\.


--
-- TOC entry 3353 (class 0 OID 24638)
-- Dependencies: 221
-- Data for Name: t_userVerify; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."t_userVerify" (id, verify_status, "idCard_img", bank_img, user_id, "createdAt", "updatedAt") FROM stdin;
13	1	https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg	https://lofficielthailand.com/wp-content/uploads/2020/07/Tote-Bag-Brand-Name-Celine-Paris-1-LOfficiel-Thaialnd.jpg	2	2023-10-12 14:38:09.121+07	2023-10-12 14:38:37.243+07
\.


--
-- TOC entry 3347 (class 0 OID 17107)
-- Dependencies: 215
-- Data for Name: t_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.t_users (id, f_name, l_name, email, phone, profile_img, password, status, "createdAt", "updatedAt") FROM stdin;
1	admin_f	test	admin@admin.com	123	2	1234	0	2004-10-19 15:23:54+07	2004-10-19 15:23:54+07
2	watchara	test	user@user.com	123	2	1234	1	2004-10-19 15:23:54+07	2004-10-19 15:23:54+07
3	guest	guest	guest@guest.com	123	2	1234	1	2004-10-19 15:23:54+07	2004-10-19 15:23:54+07
\.


--
-- TOC entry 3363 (class 0 OID 0)
-- Dependencies: 216
-- Name: t_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.t_products_id_seq', 77, true);


--
-- TOC entry 3364 (class 0 OID 0)
-- Dependencies: 218
-- Name: t_reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.t_reviews_id_seq', 1, false);


--
-- TOC entry 3365 (class 0 OID 0)
-- Dependencies: 220
-- Name: t_userVerify_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."t_userVerify_id_seq"', 13, true);


--
-- TOC entry 3366 (class 0 OID 0)
-- Dependencies: 214
-- Name: t_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.t_users_id_seq', 1, false);


--
-- TOC entry 3197 (class 2606 OID 17125)
-- Name: t_products t_products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t_products
    ADD CONSTRAINT t_products_pkey PRIMARY KEY (id);


--
-- TOC entry 3199 (class 2606 OID 17161)
-- Name: t_reviews t_reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t_reviews
    ADD CONSTRAINT t_reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 3201 (class 2606 OID 24645)
-- Name: t_userVerify t_userVerify_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."t_userVerify"
    ADD CONSTRAINT "t_userVerify_pkey" PRIMARY KEY (id);


--
-- TOC entry 3193 (class 2606 OID 17116)
-- Name: t_users t_users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t_users
    ADD CONSTRAINT t_users_email_key UNIQUE (email);


--
-- TOC entry 3195 (class 2606 OID 17114)
-- Name: t_users t_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t_users
    ADD CONSTRAINT t_users_pkey PRIMARY KEY (id);


--
-- TOC entry 3203 (class 2606 OID 24646)
-- Name: t_userVerify t_userVerify_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."t_userVerify"
    ADD CONSTRAINT "t_userVerify_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.t_users(id);


--
-- TOC entry 3202 (class 2606 OID 17162)
-- Name: t_reviews user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.t_reviews
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.t_users(id);


-- Completed on 2023-10-12 15:14:52

--
-- PostgreSQL database dump complete
--


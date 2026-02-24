SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict rxaKEaqDBM10jgyxEncT8OjvnS4N26hP5bwnVC7IPXanASTxbyIFcfmMKsMPUiy

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '4239afe3-4272-4e16-8b6d-3ad84f2cd21d', 'authenticated', 'authenticated', 'raphael.lesmann@dci-student.org', '$2a$10$sZo4lu18CV1Qs1PGPBkBquGoiYLRx.fI7B9H7FuxseTTsyt8pPJx2', '2026-02-03 09:32:55.09441+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-02-04 08:51:30.409626+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "4239afe3-4272-4e16-8b6d-3ad84f2cd21d", "email": "raphael.lesmann@dci-student.org", "email_verified": true, "phone_verified": false}', NULL, '2026-02-03 09:32:55.070244+00', '2026-02-12 09:56:23.212656+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', '6de2c0c9-4746-4334-83a4-479502bb6310', 'authenticated', 'authenticated', 'gert@dci.com', '$2a$10$QYZ6qQCqoOfumVavynEpKOfOlCirXACP4bKYpXUuwGPUEuruH1xxm', '2026-02-15 18:24:52.217851+00', NULL, '', NULL, '', NULL, '', '', NULL, '2026-02-15 18:25:06.933118+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "6de2c0c9-4746-4334-83a4-479502bb6310", "email": "gert@dci.com", "email_verified": true, "phone_verified": false}', NULL, '2026-02-15 18:24:52.198116+00', '2026-02-18 11:29:40.990664+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('4239afe3-4272-4e16-8b6d-3ad84f2cd21d', '4239afe3-4272-4e16-8b6d-3ad84f2cd21d', '{"sub": "4239afe3-4272-4e16-8b6d-3ad84f2cd21d", "email": "raphael.lesmann@dci-student.org", "email_verified": false, "phone_verified": false}', 'email', '2026-02-03 09:32:55.085936+00', '2026-02-03 09:32:55.08607+00', '2026-02-03 09:32:55.08607+00', '590492f1-4ee0-484f-83b4-9490cc3e89b5'),
	('6de2c0c9-4746-4334-83a4-479502bb6310', '6de2c0c9-4746-4334-83a4-479502bb6310', '{"sub": "6de2c0c9-4746-4334-83a4-479502bb6310", "email": "gert@dci.com", "email_verified": false, "phone_verified": false}', 'email', '2026-02-15 18:24:52.211869+00', '2026-02-15 18:24:52.211953+00', '2026-02-15 18:24:52.211953+00', 'f9d92ab6-a3c3-4736-b0fc-810852beafd9');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag", "oauth_client_id", "refresh_token_hmac_key", "refresh_token_counter", "scopes") VALUES
	('f7c7312e-23b9-4f1b-8670-3a729515fec2', '6de2c0c9-4746-4334-83a4-479502bb6310', '2026-02-15 18:24:52.237334+00', '2026-02-15 18:24:52.237334+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:147.0) Gecko/20100101 Firefox/147.0', '172.18.0.1', NULL, NULL, NULL, NULL, NULL),
	('5cf4812e-15b5-4d1a-85c3-de15661f04ba', '6de2c0c9-4746-4334-83a4-479502bb6310', '2026-02-15 18:25:06.933266+00', '2026-02-18 11:29:41.00054+00', NULL, 'aal1', NULL, '2026-02-18 11:29:41.00009', 'Next.js Middleware', '172.18.0.1', NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('f7c7312e-23b9-4f1b-8670-3a729515fec2', '2026-02-15 18:24:52.246066+00', '2026-02-15 18:24:52.246066+00', 'password', '3290a239-3004-4a8d-8ead-fdbf57a57067'),
	('5cf4812e-15b5-4d1a-85c3-de15661f04ba', '2026-02-15 18:25:06.940436+00', '2026-02-15 18:25:06.940436+00', 'password', 'aee43301-643b-49a7-96f1-26dabebe3f60');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 14, 'b7znpe7b25rl', '6de2c0c9-4746-4334-83a4-479502bb6310', false, '2026-02-15 18:24:52.242218+00', '2026-02-15 18:24:52.242218+00', NULL, 'f7c7312e-23b9-4f1b-8670-3a729515fec2'),
	('00000000-0000-0000-0000-000000000000', 15, '5pwbjnjldkzo', '6de2c0c9-4746-4334-83a4-479502bb6310', true, '2026-02-15 18:25:06.937106+00', '2026-02-16 08:24:05.326216+00', NULL, '5cf4812e-15b5-4d1a-85c3-de15661f04ba'),
	('00000000-0000-0000-0000-000000000000', 16, '2j34chfdiwcr', '6de2c0c9-4746-4334-83a4-479502bb6310', true, '2026-02-16 08:24:05.328429+00', '2026-02-18 11:29:40.97874+00', '5pwbjnjldkzo', '5cf4812e-15b5-4d1a-85c3-de15661f04ba'),
	('00000000-0000-0000-0000-000000000000', 17, 'e46kxcubne6k', '6de2c0c9-4746-4334-83a4-479502bb6310', false, '2026-02-18 11:29:40.984366+00', '2026-02-18 11:29:40.984366+00', '2j34chfdiwcr', '5cf4812e-15b5-4d1a-85c3-de15661f04ba');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user" ("id", "name", "email") VALUES
	('11111111-1111-1111-1111-111111111111', 'Teacher Tom', 'teacher@test.com'),
	('22222222-2222-2222-2222-222222222222', 'Student Sara', 'student@test.com');


--
-- Data for Name: advertisement; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."advertisement" ("advertisement_id", "user_id", "typ", "title", "description", "created_at", "updatet_at") VALUES
	('f69b30de-9003-4240-9313-cc5db7efc8a4', '11111111-1111-1111-1111-111111111111', 'offer', 'hi', 'by', '2026-02-19 08:00:30', '2026-02-19 08:02:00'),
	('0f483186-d450-49ce-9c7f-dfe4f1b131f5', '22222222-2222-2222-2222-222222222222', 'request', 'pls', 'pls', '2026-02-23 08:45:42', '2026-02-23 08:45:47');


--
-- Data for Name: availability; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."availability" ("availability_id", "user_id", "start_time", "end_time") VALUES
	('13930cd8-ab22-43ce-9862-f70bbc9e2705', '11111111-1111-1111-1111-111111111111', '2026-02-19 08:20:19', '2026-02-19 08:50:19'),
	('7f6deb32-1e51-4961-8f59-3bcce0483c82', '11111111-1111-1111-1111-111111111111', '2026-02-25 08:46:16', '2026-02-25 09:16:33');


--
-- Data for Name: language; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."language" ("id", "name") VALUES
	('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'English'),
	('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'German');


--
-- Data for Name: session_request; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."session_request" ("request_from_user_id", "request_to_user_id", "advertisement_id", "availability_id", "status", "created_at", "updated_at", "session_request_id", "description") VALUES
	('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'f69b30de-9003-4240-9313-cc5db7efc8a4', '13930cd8-ab22-43ce-9862-f70bbc9e2705', 'accepted', '2026-02-19 08:15:03', '2026-02-19 09:20:31', 'f564369c-0801-4931-922a-489f5afd6ccb', 'dudel'),
	('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '0f483186-d450-49ce-9c7f-dfe4f1b131f5', '7f6deb32-1e51-4961-8f59-3bcce0483c82', 'accepted', '2026-02-24 08:48:04', '2026-02-24 07:55:39.181463', '9098bf17-4c5e-4b17-858d-a6589b78003a', NULL);


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--

INSERT INTO "public"."session" ("session_id", "request_id", "advertisement_id", "teacher_user_id", "student_user_id", "start_time", "end_time", "status", "created_at", "updated_at") VALUES
	('64364dc9-8089-4d98-9708-d1271f032d6d', 'f564369c-0801-4931-922a-489f5afd6ccb', 'f69b30de-9003-4240-9313-cc5db7efc8a4', '11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', '2026-02-19 08:20:19', '2026-02-19 08:50:19', 'completed', '2026-02-19 08:45:12.047892', '2026-02-19 09:04:34.672901'),
	('7796a635-64fd-4002-a97b-bce2245aea87', '9098bf17-4c5e-4b17-858d-a6589b78003a', '0f483186-d450-49ce-9c7f-dfe4f1b131f5', '22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', '2026-02-24 09:17:41', '2026-02-24 09:47:43', 'cancelled', '2026-02-24 07:56:47.95728', '2026-02-24 08:14:25.023397');


--
-- Data for Name: rating; Type: TABLE DATA; Schema: public; Owner: supabase_admin
--



--
-- Data for Name: skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."skills" ("skill_id", "name") VALUES
	('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Programming'),
	('dddddddd-dddd-dddd-dddd-dddddddddddd', 'Math');


--
-- Data for Name: user_language; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_language" ("user_language_id", "user_id", "language_id") VALUES
	('3051afbd-5eb1-4eb2-8fc9-0a927195fc09', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
	('42aa1858-182d-4b03-a63c-f63a4c04e91a', '22222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb');


--
-- Data for Name: user_skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_skills" ("user_skill_id", "skill_id", "user_id") VALUES
	('9d74daa9-48e4-4e03-a7f4-f810422973d3', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '11111111-1111-1111-1111-111111111111'),
	('6d76d2ea-3407-474d-b4ce-b9d2228c3749', 'dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222222');


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 17, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict rxaKEaqDBM10jgyxEncT8OjvnS4N26hP5bwnVC7IPXanASTxbyIFcfmMKsMPUiy

RESET ALL;

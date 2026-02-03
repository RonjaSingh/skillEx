
  create table "public"."advertisment" (
    "advertisment_id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "typ" text not null,
    "title" text not null,
    "description" text not null,
    "created_at" timestamp without time zone not null default now(),
    "updatet_at" timestamp without time zone not null default now()
      );


alter table "public"."advertisment" enable row level security;


  create table "public"."advertisment_skill" (
    "advertisment_id" uuid not null default gen_random_uuid(),
    "skill_id" uuid not null
      );


alter table "public"."advertisment_skill" enable row level security;


  create table "public"."availability" (
    "availability_id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "start_time" timestamp without time zone not null,
    "end_time" timestamp without time zone not null
      );


alter table "public"."availability" enable row level security;


  create table "public"."language" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null
      );


alter table "public"."language" enable row level security;


  create table "public"."session_request" (
    "request_from_user_id" uuid not null,
    "request_to_user_id" uuid not null,
    "advertisment_id" uuid not null,
    "availability_id" uuid not null,
    "status" text not null,
    "created_at" timestamp without time zone not null default now(),
    "updatet_at" timestamp without time zone not null default now(),
    "Session_request _id" uuid not null default gen_random_uuid()
      );


alter table "public"."session_request" enable row level security;


  create table "public"."skills" (
    "skill_id" uuid not null default gen_random_uuid(),
    "name" text not null
      );


alter table "public"."skills" enable row level security;


  create table "public"."user" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null default ''::text,
    "email" text not null
      );


alter table "public"."user" enable row level security;


  create table "public"."user_language" (
    "user_language_id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "language_id" uuid not null
      );


alter table "public"."user_language" enable row level security;


  create table "public"."user_skills" (
    "user_skill_id" uuid not null default gen_random_uuid(),
    "skill_id" uuid not null,
    "user_id" uuid not null
      );


alter table "public"."user_skills" enable row level security;

CREATE UNIQUE INDEX advertiment_skill_pkey ON public.advertisment_skill USING btree (advertisment_id);

CREATE UNIQUE INDEX advertisment_pkey ON public.advertisment USING btree (advertisment_id);

CREATE UNIQUE INDEX availability_pkey ON public.availability USING btree (availability_id);

CREATE UNIQUE INDEX language_name_key ON public.language USING btree (name);

CREATE UNIQUE INDEX language_pkey ON public.language USING btree (id);

CREATE UNIQUE INDEX session_request_pkey ON public.session_request USING btree ("Session_request _id");

CREATE UNIQUE INDEX skills_name_key ON public.skills USING btree (name);

CREATE UNIQUE INDEX skills_pkey ON public.skills USING btree (skill_id);

CREATE UNIQUE INDEX user_language_pkey ON public.user_language USING btree (user_language_id);

CREATE UNIQUE INDEX user_pkey ON public."user" USING btree (id);

CREATE UNIQUE INDEX user_skills_pkey ON public.user_skills USING btree (user_skill_id);

alter table "public"."advertisment" add constraint "advertisment_pkey" PRIMARY KEY using index "advertisment_pkey";

alter table "public"."advertisment_skill" add constraint "advertiment_skill_pkey" PRIMARY KEY using index "advertiment_skill_pkey";

alter table "public"."availability" add constraint "availability_pkey" PRIMARY KEY using index "availability_pkey";

alter table "public"."language" add constraint "language_pkey" PRIMARY KEY using index "language_pkey";

alter table "public"."session_request" add constraint "session_request_pkey" PRIMARY KEY using index "session_request_pkey";

alter table "public"."skills" add constraint "skills_pkey" PRIMARY KEY using index "skills_pkey";

alter table "public"."user" add constraint "user_pkey" PRIMARY KEY using index "user_pkey";

alter table "public"."user_language" add constraint "user_language_pkey" PRIMARY KEY using index "user_language_pkey";

alter table "public"."user_skills" add constraint "user_skills_pkey" PRIMARY KEY using index "user_skills_pkey";

alter table "public"."advertisment" add constraint "advertisment_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE not valid;

alter table "public"."advertisment" validate constraint "advertisment_user_id_fkey";

alter table "public"."advertisment_skill" add constraint "advertiment_skill_advertisment_id_fkey" FOREIGN KEY (advertisment_id) REFERENCES public.advertisment(advertisment_id) ON DELETE CASCADE not valid;

alter table "public"."advertisment_skill" validate constraint "advertiment_skill_advertisment_id_fkey";

alter table "public"."availability" add constraint "availability_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE not valid;

alter table "public"."availability" validate constraint "availability_user_id_fkey";

alter table "public"."language" add constraint "language_name_key" UNIQUE using index "language_name_key";

alter table "public"."session_request" add constraint "session_request_advertisment_id_fkey" FOREIGN KEY (advertisment_id) REFERENCES public.advertisment(advertisment_id) ON DELETE CASCADE not valid;

alter table "public"."session_request" validate constraint "session_request_advertisment_id_fkey";

alter table "public"."session_request" add constraint "session_request_availability_id_fkey" FOREIGN KEY (availability_id) REFERENCES public.availability(availability_id) ON DELETE CASCADE not valid;

alter table "public"."session_request" validate constraint "session_request_availability_id_fkey";

alter table "public"."session_request" add constraint "session_request_request_from_user_id_fkey" FOREIGN KEY (request_from_user_id) REFERENCES public."user"(id) ON DELETE CASCADE not valid;

alter table "public"."session_request" validate constraint "session_request_request_from_user_id_fkey";

alter table "public"."session_request" add constraint "session_request_request_to_user_id_fkey" FOREIGN KEY (request_to_user_id) REFERENCES public."user"(id) ON DELETE CASCADE not valid;

alter table "public"."session_request" validate constraint "session_request_request_to_user_id_fkey";

alter table "public"."skills" add constraint "skills_name_key" UNIQUE using index "skills_name_key";

alter table "public"."user_language" add constraint "user_language_language_id_fkey" FOREIGN KEY (language_id) REFERENCES public.language(id) ON DELETE CASCADE not valid;

alter table "public"."user_language" validate constraint "user_language_language_id_fkey";

alter table "public"."user_language" add constraint "user_language_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE not valid;

alter table "public"."user_language" validate constraint "user_language_user_id_fkey";

alter table "public"."user_skills" add constraint "user_skills_skill_id_fkey" FOREIGN KEY (skill_id) REFERENCES public.skills(skill_id) ON DELETE CASCADE not valid;

alter table "public"."user_skills" validate constraint "user_skills_skill_id_fkey";

alter table "public"."user_skills" add constraint "user_skills_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE not valid;

alter table "public"."user_skills" validate constraint "user_skills_user_id_fkey";

grant delete on table "public"."advertisment" to "anon";

grant insert on table "public"."advertisment" to "anon";

grant references on table "public"."advertisment" to "anon";

grant select on table "public"."advertisment" to "anon";

grant trigger on table "public"."advertisment" to "anon";

grant truncate on table "public"."advertisment" to "anon";

grant update on table "public"."advertisment" to "anon";

grant delete on table "public"."advertisment" to "authenticated";

grant insert on table "public"."advertisment" to "authenticated";

grant references on table "public"."advertisment" to "authenticated";

grant select on table "public"."advertisment" to "authenticated";

grant trigger on table "public"."advertisment" to "authenticated";

grant truncate on table "public"."advertisment" to "authenticated";

grant update on table "public"."advertisment" to "authenticated";

grant delete on table "public"."advertisment" to "postgres";

grant insert on table "public"."advertisment" to "postgres";

grant references on table "public"."advertisment" to "postgres";

grant select on table "public"."advertisment" to "postgres";

grant trigger on table "public"."advertisment" to "postgres";

grant truncate on table "public"."advertisment" to "postgres";

grant update on table "public"."advertisment" to "postgres";

grant delete on table "public"."advertisment" to "service_role";

grant insert on table "public"."advertisment" to "service_role";

grant references on table "public"."advertisment" to "service_role";

grant select on table "public"."advertisment" to "service_role";

grant trigger on table "public"."advertisment" to "service_role";

grant truncate on table "public"."advertisment" to "service_role";

grant update on table "public"."advertisment" to "service_role";

grant delete on table "public"."advertisment_skill" to "anon";

grant insert on table "public"."advertisment_skill" to "anon";

grant references on table "public"."advertisment_skill" to "anon";

grant select on table "public"."advertisment_skill" to "anon";

grant trigger on table "public"."advertisment_skill" to "anon";

grant truncate on table "public"."advertisment_skill" to "anon";

grant update on table "public"."advertisment_skill" to "anon";

grant delete on table "public"."advertisment_skill" to "authenticated";

grant insert on table "public"."advertisment_skill" to "authenticated";

grant references on table "public"."advertisment_skill" to "authenticated";

grant select on table "public"."advertisment_skill" to "authenticated";

grant trigger on table "public"."advertisment_skill" to "authenticated";

grant truncate on table "public"."advertisment_skill" to "authenticated";

grant update on table "public"."advertisment_skill" to "authenticated";

grant delete on table "public"."advertisment_skill" to "postgres";

grant insert on table "public"."advertisment_skill" to "postgres";

grant references on table "public"."advertisment_skill" to "postgres";

grant select on table "public"."advertisment_skill" to "postgres";

grant trigger on table "public"."advertisment_skill" to "postgres";

grant truncate on table "public"."advertisment_skill" to "postgres";

grant update on table "public"."advertisment_skill" to "postgres";

grant delete on table "public"."advertisment_skill" to "service_role";

grant insert on table "public"."advertisment_skill" to "service_role";

grant references on table "public"."advertisment_skill" to "service_role";

grant select on table "public"."advertisment_skill" to "service_role";

grant trigger on table "public"."advertisment_skill" to "service_role";

grant truncate on table "public"."advertisment_skill" to "service_role";

grant update on table "public"."advertisment_skill" to "service_role";

grant delete on table "public"."availability" to "anon";

grant insert on table "public"."availability" to "anon";

grant references on table "public"."availability" to "anon";

grant select on table "public"."availability" to "anon";

grant trigger on table "public"."availability" to "anon";

grant truncate on table "public"."availability" to "anon";

grant update on table "public"."availability" to "anon";

grant delete on table "public"."availability" to "authenticated";

grant insert on table "public"."availability" to "authenticated";

grant references on table "public"."availability" to "authenticated";

grant select on table "public"."availability" to "authenticated";

grant trigger on table "public"."availability" to "authenticated";

grant truncate on table "public"."availability" to "authenticated";

grant update on table "public"."availability" to "authenticated";

grant delete on table "public"."availability" to "postgres";

grant insert on table "public"."availability" to "postgres";

grant references on table "public"."availability" to "postgres";

grant select on table "public"."availability" to "postgres";

grant trigger on table "public"."availability" to "postgres";

grant truncate on table "public"."availability" to "postgres";

grant update on table "public"."availability" to "postgres";

grant delete on table "public"."availability" to "service_role";

grant insert on table "public"."availability" to "service_role";

grant references on table "public"."availability" to "service_role";

grant select on table "public"."availability" to "service_role";

grant trigger on table "public"."availability" to "service_role";

grant truncate on table "public"."availability" to "service_role";

grant update on table "public"."availability" to "service_role";

grant delete on table "public"."language" to "anon";

grant insert on table "public"."language" to "anon";

grant references on table "public"."language" to "anon";

grant select on table "public"."language" to "anon";

grant trigger on table "public"."language" to "anon";

grant truncate on table "public"."language" to "anon";

grant update on table "public"."language" to "anon";

grant delete on table "public"."language" to "authenticated";

grant insert on table "public"."language" to "authenticated";

grant references on table "public"."language" to "authenticated";

grant select on table "public"."language" to "authenticated";

grant trigger on table "public"."language" to "authenticated";

grant truncate on table "public"."language" to "authenticated";

grant update on table "public"."language" to "authenticated";

grant delete on table "public"."language" to "postgres";

grant insert on table "public"."language" to "postgres";

grant references on table "public"."language" to "postgres";

grant select on table "public"."language" to "postgres";

grant trigger on table "public"."language" to "postgres";

grant truncate on table "public"."language" to "postgres";

grant update on table "public"."language" to "postgres";

grant delete on table "public"."language" to "service_role";

grant insert on table "public"."language" to "service_role";

grant references on table "public"."language" to "service_role";

grant select on table "public"."language" to "service_role";

grant trigger on table "public"."language" to "service_role";

grant truncate on table "public"."language" to "service_role";

grant update on table "public"."language" to "service_role";

grant delete on table "public"."session_request" to "anon";

grant insert on table "public"."session_request" to "anon";

grant references on table "public"."session_request" to "anon";

grant select on table "public"."session_request" to "anon";

grant trigger on table "public"."session_request" to "anon";

grant truncate on table "public"."session_request" to "anon";

grant update on table "public"."session_request" to "anon";

grant delete on table "public"."session_request" to "authenticated";

grant insert on table "public"."session_request" to "authenticated";

grant references on table "public"."session_request" to "authenticated";

grant select on table "public"."session_request" to "authenticated";

grant trigger on table "public"."session_request" to "authenticated";

grant truncate on table "public"."session_request" to "authenticated";

grant update on table "public"."session_request" to "authenticated";

grant delete on table "public"."session_request" to "postgres";

grant insert on table "public"."session_request" to "postgres";

grant references on table "public"."session_request" to "postgres";

grant select on table "public"."session_request" to "postgres";

grant trigger on table "public"."session_request" to "postgres";

grant truncate on table "public"."session_request" to "postgres";

grant update on table "public"."session_request" to "postgres";

grant delete on table "public"."session_request" to "service_role";

grant insert on table "public"."session_request" to "service_role";

grant references on table "public"."session_request" to "service_role";

grant select on table "public"."session_request" to "service_role";

grant trigger on table "public"."session_request" to "service_role";

grant truncate on table "public"."session_request" to "service_role";

grant update on table "public"."session_request" to "service_role";

grant delete on table "public"."skills" to "anon";

grant insert on table "public"."skills" to "anon";

grant references on table "public"."skills" to "anon";

grant select on table "public"."skills" to "anon";

grant trigger on table "public"."skills" to "anon";

grant truncate on table "public"."skills" to "anon";

grant update on table "public"."skills" to "anon";

grant delete on table "public"."skills" to "authenticated";

grant insert on table "public"."skills" to "authenticated";

grant references on table "public"."skills" to "authenticated";

grant select on table "public"."skills" to "authenticated";

grant trigger on table "public"."skills" to "authenticated";

grant truncate on table "public"."skills" to "authenticated";

grant update on table "public"."skills" to "authenticated";

grant delete on table "public"."skills" to "postgres";

grant insert on table "public"."skills" to "postgres";

grant references on table "public"."skills" to "postgres";

grant select on table "public"."skills" to "postgres";

grant trigger on table "public"."skills" to "postgres";

grant truncate on table "public"."skills" to "postgres";

grant update on table "public"."skills" to "postgres";

grant delete on table "public"."skills" to "service_role";

grant insert on table "public"."skills" to "service_role";

grant references on table "public"."skills" to "service_role";

grant select on table "public"."skills" to "service_role";

grant trigger on table "public"."skills" to "service_role";

grant truncate on table "public"."skills" to "service_role";

grant update on table "public"."skills" to "service_role";

grant delete on table "public"."user" to "anon";

grant insert on table "public"."user" to "anon";

grant references on table "public"."user" to "anon";

grant select on table "public"."user" to "anon";

grant trigger on table "public"."user" to "anon";

grant truncate on table "public"."user" to "anon";

grant update on table "public"."user" to "anon";

grant delete on table "public"."user" to "authenticated";

grant insert on table "public"."user" to "authenticated";

grant references on table "public"."user" to "authenticated";

grant select on table "public"."user" to "authenticated";

grant trigger on table "public"."user" to "authenticated";

grant truncate on table "public"."user" to "authenticated";

grant update on table "public"."user" to "authenticated";

grant delete on table "public"."user" to "postgres";

grant insert on table "public"."user" to "postgres";

grant references on table "public"."user" to "postgres";

grant select on table "public"."user" to "postgres";

grant trigger on table "public"."user" to "postgres";

grant truncate on table "public"."user" to "postgres";

grant update on table "public"."user" to "postgres";

grant delete on table "public"."user" to "service_role";

grant insert on table "public"."user" to "service_role";

grant references on table "public"."user" to "service_role";

grant select on table "public"."user" to "service_role";

grant trigger on table "public"."user" to "service_role";

grant truncate on table "public"."user" to "service_role";

grant update on table "public"."user" to "service_role";

grant delete on table "public"."user_language" to "anon";

grant insert on table "public"."user_language" to "anon";

grant references on table "public"."user_language" to "anon";

grant select on table "public"."user_language" to "anon";

grant trigger on table "public"."user_language" to "anon";

grant truncate on table "public"."user_language" to "anon";

grant update on table "public"."user_language" to "anon";

grant delete on table "public"."user_language" to "authenticated";

grant insert on table "public"."user_language" to "authenticated";

grant references on table "public"."user_language" to "authenticated";

grant select on table "public"."user_language" to "authenticated";

grant trigger on table "public"."user_language" to "authenticated";

grant truncate on table "public"."user_language" to "authenticated";

grant update on table "public"."user_language" to "authenticated";

grant delete on table "public"."user_language" to "postgres";

grant insert on table "public"."user_language" to "postgres";

grant references on table "public"."user_language" to "postgres";

grant select on table "public"."user_language" to "postgres";

grant trigger on table "public"."user_language" to "postgres";

grant truncate on table "public"."user_language" to "postgres";

grant update on table "public"."user_language" to "postgres";

grant delete on table "public"."user_language" to "service_role";

grant insert on table "public"."user_language" to "service_role";

grant references on table "public"."user_language" to "service_role";

grant select on table "public"."user_language" to "service_role";

grant trigger on table "public"."user_language" to "service_role";

grant truncate on table "public"."user_language" to "service_role";

grant update on table "public"."user_language" to "service_role";

grant delete on table "public"."user_skills" to "anon";

grant insert on table "public"."user_skills" to "anon";

grant references on table "public"."user_skills" to "anon";

grant select on table "public"."user_skills" to "anon";

grant trigger on table "public"."user_skills" to "anon";

grant truncate on table "public"."user_skills" to "anon";

grant update on table "public"."user_skills" to "anon";

grant delete on table "public"."user_skills" to "authenticated";

grant insert on table "public"."user_skills" to "authenticated";

grant references on table "public"."user_skills" to "authenticated";

grant select on table "public"."user_skills" to "authenticated";

grant trigger on table "public"."user_skills" to "authenticated";

grant truncate on table "public"."user_skills" to "authenticated";

grant update on table "public"."user_skills" to "authenticated";

grant delete on table "public"."user_skills" to "postgres";

grant insert on table "public"."user_skills" to "postgres";

grant references on table "public"."user_skills" to "postgres";

grant select on table "public"."user_skills" to "postgres";

grant trigger on table "public"."user_skills" to "postgres";

grant truncate on table "public"."user_skills" to "postgres";

grant update on table "public"."user_skills" to "postgres";

grant delete on table "public"."user_skills" to "service_role";

grant insert on table "public"."user_skills" to "service_role";

grant references on table "public"."user_skills" to "service_role";

grant select on table "public"."user_skills" to "service_role";

grant trigger on table "public"."user_skills" to "service_role";

grant truncate on table "public"."user_skills" to "service_role";

grant update on table "public"."user_skills" to "service_role";



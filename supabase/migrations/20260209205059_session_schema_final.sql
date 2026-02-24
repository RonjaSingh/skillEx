create type "public"."advertisment_type" as enum ('offer', 'request');

create type "public"."session_status" as enum ('pending', 'accepted', 'rejected', 'cancelled', 'completed');

revoke delete on table "public"."advertisment" from "anon";

revoke insert on table "public"."advertisment" from "anon";

revoke references on table "public"."advertisment" from "anon";

revoke select on table "public"."advertisment" from "anon";

revoke trigger on table "public"."advertisment" from "anon";

revoke truncate on table "public"."advertisment" from "anon";

revoke update on table "public"."advertisment" from "anon";

revoke delete on table "public"."advertisment" from "authenticated";

revoke insert on table "public"."advertisment" from "authenticated";

revoke references on table "public"."advertisment" from "authenticated";

revoke select on table "public"."advertisment" from "authenticated";

revoke trigger on table "public"."advertisment" from "authenticated";

revoke truncate on table "public"."advertisment" from "authenticated";

revoke update on table "public"."advertisment" from "authenticated";

revoke delete on table "public"."advertisment" from "service_role";

revoke insert on table "public"."advertisment" from "service_role";

revoke references on table "public"."advertisment" from "service_role";

revoke select on table "public"."advertisment" from "service_role";

revoke trigger on table "public"."advertisment" from "service_role";

revoke truncate on table "public"."advertisment" from "service_role";

revoke update on table "public"."advertisment" from "service_role";

revoke delete on table "public"."advertisment_skill" from "anon";

revoke insert on table "public"."advertisment_skill" from "anon";

revoke references on table "public"."advertisment_skill" from "anon";

revoke select on table "public"."advertisment_skill" from "anon";

revoke trigger on table "public"."advertisment_skill" from "anon";

revoke truncate on table "public"."advertisment_skill" from "anon";

revoke update on table "public"."advertisment_skill" from "anon";

revoke delete on table "public"."advertisment_skill" from "authenticated";

revoke insert on table "public"."advertisment_skill" from "authenticated";

revoke references on table "public"."advertisment_skill" from "authenticated";

revoke select on table "public"."advertisment_skill" from "authenticated";

revoke trigger on table "public"."advertisment_skill" from "authenticated";

revoke truncate on table "public"."advertisment_skill" from "authenticated";

revoke update on table "public"."advertisment_skill" from "authenticated";

revoke delete on table "public"."advertisment_skill" from "service_role";

revoke insert on table "public"."advertisment_skill" from "service_role";

revoke references on table "public"."advertisment_skill" from "service_role";

revoke select on table "public"."advertisment_skill" from "service_role";

revoke trigger on table "public"."advertisment_skill" from "service_role";

revoke truncate on table "public"."advertisment_skill" from "service_role";

revoke update on table "public"."advertisment_skill" from "service_role";

alter table "public"."advertisment" drop constraint "advertisment_user_id_fkey";

alter table "public"."advertisment_skill" drop constraint "advertiment_skill_advertisment_id_fkey";

alter table "public"."session_request" drop constraint "session_request_advertisment_id_fkey";

alter table "public"."advertisment" drop constraint "advertisment_pkey";

alter table "public"."advertisment_skill" drop constraint "advertiment_skill_pkey";

alter table "public"."session_request" drop constraint "session_request_pkey";

drop index if exists "public"."advertiment_skill_pkey";

drop index if exists "public"."advertisment_pkey";

drop index if exists "public"."session_request_pkey";

drop table "public"."advertisment";

drop table "public"."advertisment_skill";


  create table "public"."advertisement" (
    "advertisment_id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "typ" public.advertisment_type not null,
    "title" text not null,
    "description" text not null,
    "created_at" timestamp without time zone not null default now(),
    "updatet_at" timestamp without time zone not null default now()
      );


alter table "public"."advertisement" enable row level security;


  create table "public"."rating" (
    "rating_id" uuid not null default gen_random_uuid(),
    "session_id" uuid not null,
    "reviewer_user_id" uuid not null,
    "reviewed_user_id" uuid not null,
    "stars" integer not null,
    "comment" text,
    "created_at" timestamp without time zone default now()
      );


alter table "public"."rating" enable row level security;


  create table "public"."session" (
    "session_id" uuid not null default gen_random_uuid(),
    "request_id" uuid,
    "advertisement_id" uuid not null,
    "teacher_user_id" uuid not null,
    "student_user_id" uuid not null,
    "start_time" timestamp without time zone not null,
    "end_time" timestamp without time zone not null,
    "status" public.session_status not null default 'accepted'::public.session_status,
    "rating_by_student" integer,
    "rating_by_teacher" integer,
    "created_at" timestamp without time zone not null default now(),
    "updated_at" timestamp without time zone not null default now()
      );


alter table "public"."session" enable row level security;

alter table "public"."session_request" drop column "Session_request _id";

alter table "public"."session_request" drop column "advertisment_id";

alter table "public"."session_request" add column "advertisement_id" uuid not null;

alter table "public"."session_request" add column "session_request_id" uuid not null default gen_random_uuid();

alter table "public"."session_request" alter column "status" set data type public.session_status using "status"::public.session_status;

CREATE UNIQUE INDEX rating_pkey ON public.rating USING btree (rating_id);

CREATE UNIQUE INDEX rating_session_id_key ON public.rating USING btree (session_id);

CREATE UNIQUE INDEX session_pkey ON public.session USING btree (session_id);

CREATE UNIQUE INDEX session_request_id_key ON public.session USING btree (request_id);

CREATE UNIQUE INDEX advertisment_pkey ON public.advertisement USING btree (advertisment_id);

CREATE UNIQUE INDEX session_request_pkey ON public.session_request USING btree (session_request_id);

alter table "public"."advertisement" add constraint "advertisment_pkey" PRIMARY KEY using index "advertisment_pkey";

alter table "public"."rating" add constraint "rating_pkey" PRIMARY KEY using index "rating_pkey";

alter table "public"."session" add constraint "session_pkey" PRIMARY KEY using index "session_pkey";

alter table "public"."session_request" add constraint "session_request_pkey" PRIMARY KEY using index "session_request_pkey";

alter table "public"."advertisement" add constraint "advertisment_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."user"(id) ON DELETE CASCADE not valid;

alter table "public"."advertisement" validate constraint "advertisment_user_id_fkey";

alter table "public"."rating" add constraint "rating_reviewed_user_id_fkey" FOREIGN KEY (reviewed_user_id) REFERENCES public."user"(id) not valid;

alter table "public"."rating" validate constraint "rating_reviewed_user_id_fkey";

alter table "public"."rating" add constraint "rating_reviewer_user_id_fkey" FOREIGN KEY (reviewer_user_id) REFERENCES public."user"(id) not valid;

alter table "public"."rating" validate constraint "rating_reviewer_user_id_fkey";

alter table "public"."rating" add constraint "rating_session_id_fkey" FOREIGN KEY (session_id) REFERENCES public.session(session_id) ON DELETE CASCADE not valid;

alter table "public"."rating" validate constraint "rating_session_id_fkey";

alter table "public"."rating" add constraint "rating_session_id_key" UNIQUE using index "rating_session_id_key";

alter table "public"."rating" add constraint "rating_stars_check" CHECK (((stars >= 1) AND (stars <= 5))) not valid;

alter table "public"."rating" validate constraint "rating_stars_check";

alter table "public"."session" add constraint "session_advertisement_fkey" FOREIGN KEY (advertisement_id) REFERENCES public.advertisement(advertisment_id) not valid;

alter table "public"."session" validate constraint "session_advertisement_fkey";

alter table "public"."session" add constraint "session_request_fkey" FOREIGN KEY (request_id) REFERENCES public.session_request(session_request_id) ON DELETE SET NULL not valid;

alter table "public"."session" validate constraint "session_request_fkey";

alter table "public"."session" add constraint "session_request_id_key" UNIQUE using index "session_request_id_key";

alter table "public"."session" add constraint "session_student_fkey" FOREIGN KEY (student_user_id) REFERENCES public."user"(id) not valid;

alter table "public"."session" validate constraint "session_student_fkey";

alter table "public"."session" add constraint "session_teacher_fkey" FOREIGN KEY (teacher_user_id) REFERENCES public."user"(id) not valid;

alter table "public"."session" validate constraint "session_teacher_fkey";

alter table "public"."session_request" add constraint "session_request_advertisment_id_fkey" FOREIGN KEY (advertisement_id) REFERENCES public.advertisement(advertisment_id) ON DELETE CASCADE not valid;

alter table "public"."session_request" validate constraint "session_request_advertisment_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.auto_complete_session()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  
  IF NEW.status != 'completed' THEN
    
   
    IF NEW.end_time <= now() THEN
      NEW.status := 'completed';
    END IF;

  END IF;

  RETURN NEW;
END;
$function$
;

grant delete on table "public"."advertisement" to "anon";

grant insert on table "public"."advertisement" to "anon";

grant references on table "public"."advertisement" to "anon";

grant select on table "public"."advertisement" to "anon";

grant trigger on table "public"."advertisement" to "anon";

grant truncate on table "public"."advertisement" to "anon";

grant update on table "public"."advertisement" to "anon";

grant delete on table "public"."advertisement" to "authenticated";

grant insert on table "public"."advertisement" to "authenticated";

grant references on table "public"."advertisement" to "authenticated";

grant select on table "public"."advertisement" to "authenticated";

grant trigger on table "public"."advertisement" to "authenticated";

grant truncate on table "public"."advertisement" to "authenticated";

grant update on table "public"."advertisement" to "authenticated";

grant delete on table "public"."advertisement" to "service_role";

grant insert on table "public"."advertisement" to "service_role";

grant references on table "public"."advertisement" to "service_role";

grant select on table "public"."advertisement" to "service_role";

grant trigger on table "public"."advertisement" to "service_role";

grant truncate on table "public"."advertisement" to "service_role";

grant update on table "public"."advertisement" to "service_role";

grant delete on table "public"."rating" to "anon";

grant insert on table "public"."rating" to "anon";

grant references on table "public"."rating" to "anon";

grant select on table "public"."rating" to "anon";

grant trigger on table "public"."rating" to "anon";

grant truncate on table "public"."rating" to "anon";

grant update on table "public"."rating" to "anon";

grant delete on table "public"."rating" to "authenticated";

grant insert on table "public"."rating" to "authenticated";

grant references on table "public"."rating" to "authenticated";

grant select on table "public"."rating" to "authenticated";

grant trigger on table "public"."rating" to "authenticated";

grant truncate on table "public"."rating" to "authenticated";

grant update on table "public"."rating" to "authenticated";

grant delete on table "public"."rating" to "postgres";

grant insert on table "public"."rating" to "postgres";

grant references on table "public"."rating" to "postgres";

grant select on table "public"."rating" to "postgres";

grant trigger on table "public"."rating" to "postgres";

grant truncate on table "public"."rating" to "postgres";

grant update on table "public"."rating" to "postgres";

grant delete on table "public"."rating" to "service_role";

grant insert on table "public"."rating" to "service_role";

grant references on table "public"."rating" to "service_role";

grant select on table "public"."rating" to "service_role";

grant trigger on table "public"."rating" to "service_role";

grant truncate on table "public"."rating" to "service_role";

grant update on table "public"."rating" to "service_role";

grant delete on table "public"."session" to "anon";

grant insert on table "public"."session" to "anon";

grant references on table "public"."session" to "anon";

grant select on table "public"."session" to "anon";

grant trigger on table "public"."session" to "anon";

grant truncate on table "public"."session" to "anon";

grant update on table "public"."session" to "anon";

grant delete on table "public"."session" to "authenticated";

grant insert on table "public"."session" to "authenticated";

grant references on table "public"."session" to "authenticated";

grant select on table "public"."session" to "authenticated";

grant trigger on table "public"."session" to "authenticated";

grant truncate on table "public"."session" to "authenticated";

grant update on table "public"."session" to "authenticated";

grant delete on table "public"."session" to "postgres";

grant insert on table "public"."session" to "postgres";

grant references on table "public"."session" to "postgres";

grant select on table "public"."session" to "postgres";

grant trigger on table "public"."session" to "postgres";

grant truncate on table "public"."session" to "postgres";

grant update on table "public"."session" to "postgres";

grant delete on table "public"."session" to "service_role";

grant insert on table "public"."session" to "service_role";

grant references on table "public"."session" to "service_role";

grant select on table "public"."session" to "service_role";

grant trigger on table "public"."session" to "service_role";

grant truncate on table "public"."session" to "service_role";

grant update on table "public"."session" to "service_role";


  create policy "Anyone can view advertisements"
  on "public"."advertisement"
  as permissive
  for select
  to public
using (true);



  create policy "Users can delete own advertisement"
  on "public"."advertisement"
  as permissive
  for delete
  to public
using ((auth.uid() = user_id));



  create policy "Users can insert own advertisement"
  on "public"."advertisement"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));



  create policy "Users can update own advertisement"
  on "public"."advertisement"
  as permissive
  for update
  to public
using ((auth.uid() = user_id));



  create policy "Anyone can view availability"
  on "public"."availability"
  as permissive
  for select
  to public
using (true);



  create policy "Users manage own availability"
  on "public"."availability"
  as permissive
  for all
  to public
using ((auth.uid() = user_id));



  create policy "Participants create rating"
  on "public"."rating"
  as permissive
  for insert
  to public
with check ((auth.uid() = reviewer_user_id));



  create policy "Participants view rating"
  on "public"."rating"
  as permissive
  for select
  to public
using (((auth.uid() = reviewer_user_id) OR (auth.uid() = reviewed_user_id)));



  create policy "Participants update session"
  on "public"."session"
  as permissive
  for update
  to public
using (((auth.uid() = teacher_user_id) OR (auth.uid() = student_user_id)));



  create policy "Participants view session"
  on "public"."session"
  as permissive
  for select
  to public
using (((auth.uid() = teacher_user_id) OR (auth.uid() = student_user_id)));



  create policy "System inserts sessions"
  on "public"."session"
  as permissive
  for insert
  to public
with check (true);



  create policy "Receiver updates request"
  on "public"."session_request"
  as permissive
  for update
  to public
using ((auth.uid() = request_to_user_id));



  create policy "Users create requests as themselves"
  on "public"."session_request"
  as permissive
  for insert
  to public
with check ((auth.uid() = request_from_user_id));



  create policy "Users see own requests"
  on "public"."session_request"
  as permissive
  for select
  to public
using (((auth.uid() = request_from_user_id) OR (auth.uid() = request_to_user_id)));



  create policy "Users can update own profile"
  on "public"."user"
  as permissive
  for update
  to public
using ((auth.uid() = id));



  create policy "Users can view all profiles"
  on "public"."user"
  as permissive
  for select
  to public
using (true);


CREATE TRIGGER trg_auto_complete_session BEFORE UPDATE ON public.session FOR EACH ROW EXECUTE FUNCTION public.auto_complete_session();



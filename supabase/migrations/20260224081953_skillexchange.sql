create extension if not exists "pg_cron" with schema "pg_catalog";

create type "public"."session_request_status" as enum ('pending', 'rejected', 'cancelled', 'accepted');

drop trigger if exists "on_request_cancel_session" on "public"."session_request";

drop trigger if exists "on_request_accepted_create_session" on "public"."session_request";

alter table "public"."rating" drop constraint "rating_session_id_key";

alter table "public"."session" drop constraint "session_advertisement_fkey";

alter table "public"."session_request" drop constraint "session_request_advertisment_id_fkey";

drop function if exists "public"."cancel_session_from_request"();

drop function if exists "public"."create_session_from_request"();

alter table "public"."advertisement" drop constraint "advertisment_pkey";

drop index if exists "public"."advertisment_pkey";

drop index if exists "public"."rating_session_id_key";

alter table "public"."session" alter column "status" drop default;

alter type "public"."session_status" rename to "session_status__old_version_to_be_dropped";

create type "public"."session_status" as enum ('accepted', 'completed', 'cancelled');

alter table "public"."session" alter column status type "public"."session_status" using status::text::"public"."session_status";

alter table "public"."session" alter column "status" set default 'accepted'::public.session_status;

-- drop type "public"."session_status__old_version_to_be_dropped";

alter table "public"."advertisement" drop column "advertisment_id";

alter table "public"."advertisement" add column "advertisement_id" uuid not null default gen_random_uuid();

alter table "public"."rating" disable row level security;

alter table "public"."session" drop column "rating_by_student";

alter table "public"."session" drop column "rating_by_teacher";

alter table "public"."session" disable row level security;

alter table "public"."session_request" drop column "updatet_at";

alter table "public"."session_request" add column "updated_at" timestamp without time zone not null default now();

alter table "public"."session_request" alter column "status" set data type public.session_request_status using "status"::text::public.session_request_status;

CREATE UNIQUE INDEX advertisement_pkey ON public.advertisement USING btree (advertisement_id);

CREATE UNIQUE INDEX unique_reviewer_per_session ON public.rating USING btree (session_id, reviewer_user_id);

alter table "public"."advertisement" add constraint "advertisement_pkey" PRIMARY KEY using index "advertisement_pkey";

alter table "public"."rating" add constraint "unique_reviewer_per_session" UNIQUE using index "unique_reviewer_per_session";

alter table "public"."session" add constraint "session_advertisement_id_fkey" FOREIGN KEY (advertisement_id) REFERENCES public.advertisement(advertisement_id) not valid;

alter table "public"."session" validate constraint "session_advertisement_id_fkey";

alter table "public"."session_request" add constraint "session_request_advertisement_id_fkey" FOREIGN KEY (advertisement_id) REFERENCES public.advertisement(advertisement_id) ON DELETE CASCADE not valid;

alter table "public"."session_request" validate constraint "session_request_advertisement_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.cancel_session()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$begin
  if old.status = 'accepted'
     and new.status = 'cancelled'
     and old.start_time > now() + interval '10 minutes'
  then
     new.updated_at := now();
  else
     raise exception 'Session cannot be cancelled';
  end if;

  return new;
end;$function$
;

CREATE OR REPLACE FUNCTION public.cancel_session_request()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  if old.status = 'pending'
     and new.status = 'cancelled'
  then
     new.updated_at := now();
  else
     raise exception 'Only pending requests can be cancelled';
  end if;

  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.create_session_on_request_accepted()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$declare
    v_start timestamp;
    v_end timestamp;
begin
    
    if new.status <> 'accepted' then
        return new;
    end if;

    
    if exists (
        select 1 from session
        where request_id = new.session_request_id
    ) then
        return new;
    end if;

    
    select start_time, end_time
    into v_start, v_end
    from availability
    where availability_id = new.availability_id;

    
    insert into session (
        request_id,
        advertisement_id,
        teacher_user_id,
        student_user_id,
        start_time,
        end_time,
        status
    )
    values (
        new.session_request_id,
        new.advertisement_id,
        new.request_to_user_id,   
        new.request_from_user_id, 
        v_start,
        v_end,
        'accepted'
    );

    return new;
end;$function$
;

CREATE OR REPLACE FUNCTION public.validate_rating()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
declare
  v_status session_status;
  v_teacher uuid;
  v_student uuid;
begin

 
  select status, teacher_user_id, student_user_id
  into v_status, v_teacher, v_student
  from session
  where session_id = new.session_id;

  if v_status <> 'completed' then
    raise exception 'Rating only allowed for completed sessions';
  end if;

  if new.reviewer_user_id <> v_teacher
     and new.reviewer_user_id <> v_student
  then
     raise exception 'Reviewer not part of session';
  end if;


  if new.reviewer_user_id = v_teacher then
     if new.reviewed_user_id <> v_student then
        raise exception 'Teacher can only rate student';
     end if;
  else
     if new.reviewed_user_id <> v_teacher then
        raise exception 'Student can only rate teacher';
     end if;
  end if;

  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.auto_complete_session()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$begin
  
  if new.status = 'accepted'
     and new.end_time <= now()
  then
     new.status := 'completed';
     new.updated_at := now();
  end if;

  return new;
end;$function$
;

grant delete on table "public"."rating" to "postgres";

grant insert on table "public"."rating" to "postgres";

grant references on table "public"."rating" to "postgres";

grant select on table "public"."rating" to "postgres";

grant trigger on table "public"."rating" to "postgres";

grant truncate on table "public"."rating" to "postgres";

grant update on table "public"."rating" to "postgres";

grant delete on table "public"."session" to "postgres";

grant insert on table "public"."session" to "postgres";

grant references on table "public"."session" to "postgres";

grant select on table "public"."session" to "postgres";

grant trigger on table "public"."session" to "postgres";

grant truncate on table "public"."session" to "postgres";

grant update on table "public"."session" to "postgres";

CREATE TRIGGER trg_validate_rating BEFORE INSERT ON public.rating FOR EACH ROW EXECUTE FUNCTION public.validate_rating();

CREATE TRIGGER trg_cancel_session BEFORE UPDATE ON public.session FOR EACH ROW WHEN ((new.status = 'cancelled'::public.session_status)) EXECUTE FUNCTION public.cancel_session();

CREATE TRIGGER trg_cancel_session_request BEFORE UPDATE ON public.session_request FOR EACH ROW WHEN ((new.status = 'cancelled'::public.session_request_status)) EXECUTE FUNCTION public.cancel_session_request();

CREATE TRIGGER on_request_accepted_create_session AFTER UPDATE OF status ON public.session_request FOR EACH ROW WHEN ((new.status = 'accepted'::public.session_request_status)) EXECUTE FUNCTION public.create_session_on_request_accepted();



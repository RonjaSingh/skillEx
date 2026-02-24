alter table "public"."advertisement" disable row level security;

alter table "public"."availability" disable row level security;

alter table "public"."session_request" disable row level security;

alter table "public"."user" disable row level security;

alter table "public"."user_language" disable row level security;

alter table "public"."user_skills" disable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.cancel_session_from_request()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  if new.status = 'cancelled' then
    update session
    set status = 'cancelled'
    where request_id = new.session_request_id;
  end if;

  return new;
end;
$function$
;

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

CREATE OR REPLACE FUNCTION public.create_session_from_request()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  INSERT INTO session (
    request_id,
    advertisement_id,
    teacher_user_id,
    student_user_id,
    start_time,
    end_time,
    status,
    created_at,
    updated_at
  )
  SELECT
    sr.session_request_id,
    sr.advertisement_id,
    sr.request_to_user_id,
    sr.request_from_user_id,
    a.start_time,
    a.start_time + interval '30 minutes',
    'pending',
    now(),
    now()
  FROM session_request sr
  LEFT JOIN availability a ON a.availability_id = sr.availability_id
  WHERE sr.session_request_id = NEW.session_request_id;

  RETURN NEW;
END;
$function$
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

CREATE TRIGGER on_request_cancel_session AFTER UPDATE OF status ON public.session_request FOR EACH ROW WHEN ((new.status = 'cancelled'::public.session_status)) EXECUTE FUNCTION public.cancel_session_from_request();



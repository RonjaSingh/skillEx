set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_session_from_request()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF NEW.status = 'accepted' THEN
    INSERT INTO session (
      request_id,
      advertisement_id,
      teacher_user_id,
      student_user_id,
      start_time,
      end_time,
      status
    )
    SELECT
      NEW.session_request_id,
      NEW.advertisement_id,
      NEW.request_to_user_id,
      NEW.request_from_user_id,
      a.start_time,
      a.end_time,
      'accepted'
    FROM availability a
    WHERE a.availability_id = NEW.availability_id;
  END IF;

  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.auto_complete_session()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  -- Wenn Session noch nicht completed ist
  IF NEW.status != 'completed' THEN
    
    -- Wenn Endzeit erreicht
    IF NEW.end_time <= now() THEN
      NEW.status := 'completed';
    END IF;

  END IF;

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

CREATE TRIGGER on_request_accepted_create_session AFTER UPDATE OF status ON public.session_request FOR EACH ROW WHEN ((new.status = 'accepted'::public.session_status)) EXECUTE FUNCTION public.create_session_from_request();



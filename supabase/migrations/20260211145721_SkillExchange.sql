alter table "public"."session_request" add column "description" text;

alter table "public"."user" alter column "id" drop default;

set check_function_bodies = off;

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


  create policy "users can create own profile"
  on "public"."user"
  as permissive
  for insert
  to authenticated
with check ((auth.uid() = id));




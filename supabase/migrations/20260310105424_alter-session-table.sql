alter table "public"."user" add column "profile_image" text;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.validate_rating()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$declare
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
end;$function$
;



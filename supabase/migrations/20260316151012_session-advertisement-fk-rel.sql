alter table "public"."session" add column "availability_id" uuid;

alter table "public"."session" alter column "advertisement_id" drop not null;

alter table "public"."session_request" alter column "advertisement_id" drop not null;

alter table "public"."session" add constraint "session_availability_fkey" FOREIGN KEY (availability_id) REFERENCES public.availability(availability_id) not valid;

alter table "public"."session" validate constraint "session_availability_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_session_on_request_accepted()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$declare
  v_start timestamp;
  v_end timestamp;
  v_is_booked boolean;
begin

  -- nur reagieren wenn Status wirklich neu accepted ist
  if new.status <> 'accepted' or old.status = 'accepted' then
    return new;
  end if;

  -- 🔒 Availability row lock
  select start_time, end_time, is_booked
  into v_start, v_end, v_is_booked
  from availability
  where availability_id = new.availability_id
  for update;

  -- falls Slot schon vergeben
  if v_is_booked then
    raise exception 'Availability already booked';
  end if;

  -- falls Session bereits existiert (Sicherheitscheck)
  if exists (
    select 1
    from session
    where request_id = new.session_request_id
  ) then
    return new;
  end if;

  -- ✅ Session erstellen
  insert into session (
   request_id,
  advertisement_id,
  availability_id,
  teacher_user_id,
  student_user_id,
  start_time,
  end_time,
  description,
  status
  )
  values (
    new.session_request_id,
  new.advertisement_id,
  new.availability_id,
  new.request_to_user_id,
  new.request_from_user_id,
  v_start,
  v_end,
  new.description,
  'accepted'
  );

  -- 🔒 Availability als gebucht markieren
  update availability
  set is_booked = true
  where availability_id = new.availability_id;

  -- ❌ andere Requests auf denselben Slot canceln
  update session_request
  set status = 'cancelled'
  where availability_id = new.availability_id
  and session_request_id <> new.session_request_id
  and status = 'pending';

  -- ❌ andere Requests dieses Students im selben Zeitraum canceln
  update session_request sr
  set status = 'cancelled'
  from availability a
  where sr.availability_id = a.availability_id
  and sr.request_from_user_id = new.request_from_user_id
  and sr.session_request_id <> new.session_request_id
  and sr.status = 'pending'
  and a.start_time = v_start
  and a.end_time = v_end;

  return new;

end;$function$
;



drop trigger if exists "on_request_accepted_create_session" on "public"."session_request";

alter table "public"."availability" add column "is_booked" boolean default false;

alter table "public"."language" disable row level security;

alter table "public"."skills" disable row level security;

CREATE INDEX idx_session_request_availability ON public.session_request USING btree (availability_id);

CREATE INDEX idx_session_request_student ON public.session_request USING btree (request_from_user_id);

CREATE UNIQUE INDEX prevent_teacher_double_booking ON public.session USING btree (teacher_user_id, start_time) WHERE (status = 'accepted'::public.session_status);

CREATE UNIQUE INDEX unique_user_start_time ON public.availability USING btree (user_id, start_time);

CREATE UNIQUE INDEX unique_user_timeslot ON public.availability USING btree (user_id, start_time);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.prevent_delete_booked_availability()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  if old.is_booked = true then
    raise exception 'Booked availability cannot be deleted';
  end if;

  return old;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.create_session_on_request_accepted()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
declare
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

end;
$function$
;


  create policy "Users can create own availability"
  on "public"."availability"
  as permissive
  for insert
  to public
with check ((auth.uid() = user_id));


CREATE TRIGGER trg_prevent_delete_booked_availability BEFORE DELETE ON public.availability FOR EACH ROW EXECUTE FUNCTION public.prevent_delete_booked_availability();

CREATE TRIGGER trg_create_session_on_accept AFTER UPDATE OF status ON public.session_request FOR EACH ROW WHEN ((new.status = 'accepted'::public.session_request_status)) EXECUTE FUNCTION public.create_session_on_request_accepted();

CREATE TRIGGER on_request_accepted_create_session AFTER UPDATE OF status ON public.session_request FOR EACH ROW WHEN ((new.status = 'accepted'::public.session_request_status)) EXECUTE FUNCTION public.create_session_on_request_accepted();
ALTER TABLE "public"."session_request" DISABLE TRIGGER "on_request_accepted_create_session";



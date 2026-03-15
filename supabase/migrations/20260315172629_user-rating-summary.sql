alter table "public"."user" add column "first_login" boolean default true;

create or replace view "public"."user_rating_summary" as  SELECT reviewed_user_id AS user_id,
    (avg(stars))::numeric(3,2) AS average_rating,
    count(*) AS rating_count
   FROM public.rating
  GROUP BY reviewed_user_id;




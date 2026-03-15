
  create policy "No self rating"
  on "public"."rating"
  as permissive
  for insert
  to authenticated
with check (((auth.uid() = reviewer_user_id) AND (reviewer_user_id <> reviewed_user_id)));




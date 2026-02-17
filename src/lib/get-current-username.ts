import { createClient } from "@/lib/supabase/server";

export async function getCurrentUsername() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("user")
    .select("id, name")
    .eq("id", user.id)
    .single();

  return profile;
}

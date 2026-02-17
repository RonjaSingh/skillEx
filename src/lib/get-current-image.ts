import { createClient } from "@/lib/supabase/server";

export async function getCurrentImage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("user")
    .select("profile_image")
    .eq("id", user.id)
    .single();

  return profile?.profile_image ?? null;
}
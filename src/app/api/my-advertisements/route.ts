import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  // eingeloggten User holen
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // NUR Anzeigen dieses Users holen
  const { data, error } = await supabase
    .from("advertisement")
    .select("*")
    .eq("user_id", user.id)   // ← DAS ist der wichtige Filter!
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json(error, { status: 500 });

  return NextResponse.json(data);
}

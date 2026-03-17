import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  // eingeloggten user holen
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Nur Anzeigen dieses users holen
  const { data, error } = await supabase
    .from("advertisement")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json(error, { status: 500 });

  return NextResponse.json(data);
}


// Update advertisement
export async function PATCH(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id, title, description } = await req.json();

  const { data, error } = await supabase
    .from("advertisement")
    .update({
      title,
      description,
      updatet_at: new Date().toISOString(),
    })
    .eq("advertisement_id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) return NextResponse.json(error, { status: 500 });

  return NextResponse.json(data);
}



// Delete ads
export async function DELETE(req: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { id } = await req.json();

  // 🔥 1. Sessions löschen
  const { error: sessionError } = await supabase
    .from("session")
    .delete()
    .eq("advertisement_id", id);

  if (sessionError) {
    return NextResponse.json(sessionError, { status: 500 });
  }

  // 🔥 2. Anzeige löschen
  const { error: adError } = await supabase
    .from("advertisement")
    .delete()
    .eq("advertisement_id", id)
    .eq("user_id", user.id);

  if (adError) {
    return NextResponse.json(adError, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("advertisement")
    .select(`
      *,
      user:user_id (
        name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json(error, { status: 500 });

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user)
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

  const body = await req.json();

  const { data, error } = await supabase
    .from("advertisement")
    .insert([{
      title: body.title,
      description: body.description,
      typ: body.typ,
      user_id: user.id
    }])
    .select(`
      *,
      user:user_id (
        name
      )
    `)
    .single();

  if (error) return NextResponse.json(error, { status: 500 });

  return NextResponse.json(data);
}

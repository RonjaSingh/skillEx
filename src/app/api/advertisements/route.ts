import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";

export async function GET() {

    console.log("API ROUTE LÄUFT!!!");


    const supabase = createClient();

    const { data, error } = await supabase
        .from("advertisement")
        .select(`
      *,
      user (
        name
      )
    `)
        .order("created_at", { ascending: false });

    if (error) return NextResponse.json(error, { status: 500 });

    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const supabase = createClient();
    const body = await req.json();

    const { data, error } = await supabase
        .from("advertisement")
        .insert([body])
        .select()
        .single();

    if (error) return NextResponse.json(error, { status: 500 });

    return NextResponse.json(data);
}

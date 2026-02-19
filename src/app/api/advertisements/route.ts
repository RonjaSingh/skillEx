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

    const posts = data.map((ad: any) => ({
        advertisment_id: ad.advertisment_id,
        user_id: ad.user_id,
        title: ad.title,
        description: ad.description,
        typ: ad.typ, // bleibt offer / request
        creator: ad.user?.name ?? "Unknown",
        created_at: ad.created_at,
        updatet_at: ad.updatet_at,
    }));

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

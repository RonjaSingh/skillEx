import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
      const { id } = await params;

    console.log("PARAM ID:", id)

  const supabase = await createClient();

  /* User Profil laden */
  const { data: user, error } = await supabase
    .from("user")
    .select(`
      id,
      name,
      user_language (
        language:language_id ( name )
      ),
      user_skills (
        skills ( name )
      )
    `)
    .eq("id", id)
    .single();

  if (error || !user) {
    return <div className="p-6">Profil nicht gefunden</div>;
  }

  const languages =
    user.user_language?.map((l: any) => l.language.name).join(", ") || "—";

  const skills =
    user.user_skills?.map((s: any) => s.skills.name).join(", ") || "—";

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded-xl shadow">

      <h1 className="text-2xl font-bold mb-6">
        {user.name || "Unbekannt"}
      </h1>

      <div className="space-y-4">
        <div>
          <strong>Languages:</strong>
          <p>{languages}</p>
        </div>

        <div>
          <strong>Skills:</strong>
          <p>{skills}</p>
        </div>

        <div><strong>Book your Session:</strong></div>

      </div>
    </div>
  );
}

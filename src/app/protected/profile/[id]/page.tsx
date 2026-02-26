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
    <div className="max-w-2xl mx-auto mt-4 space-y-20 text-gray-800 font-semibold">

      <h1 className="text-3xl text-center">
        {user.name || "Username"}
      </h1>
     

      <div className="flex justify-center gap-36 text-xl">
        <div className="text-center">
          <strong>Languages:</strong>
          <p>{languages}</p>
        </div>

        <div className="text-center">
          <strong>Skills:</strong>
          <p>{skills}</p>
        </div>
   </div>
        <div className="text-center text-xl"><strong>Book your Session:</strong></div>

   
    </div>
  );
}

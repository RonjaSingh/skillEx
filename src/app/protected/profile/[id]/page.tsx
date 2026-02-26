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
    <div className="max-w-2xl mx-auto mt-4 space-y-10 text-gray-800 font-semibold">

      <h1 className="text-2xl text-center">
        {user.name || "Username"}
      </h1>
     

 <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-3xl mx-auto">
  
  <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition">
    <h2 className="text-xl font-semibold mb-4 underline">Languages</h2>
    <p className="text-lg text-gray-600">
      {languages}
    </p>
  </div>

  <div className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-lg transition">
    <h2 className="text-xl font-semibold mb-4 underline">Skills</h2>
    <p className="text-lg text-gray-600">
      {skills}
    </p>
  </div>

</div>
        <div className="text-center font-semibold text-xl">Book your Session:</div>

   
    </div>
  );
}

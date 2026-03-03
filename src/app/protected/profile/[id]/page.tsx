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
    <div className="max-w-7xl  mx-auto mt-10 space-y-12 text-gray-800 font-semibold">

      <h1 className="py-4 text-2xl text-center  bg-white/25 backdrop-blur shadow-md p-8 rounded-full">
        {user.name || "Username"}
      </h1>
     

 <div className="grid grid-cols-1 md:grid-cols-2 gap-52 relative">
  

  <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-white/25" />

  <div className="space-y-20">

      <div className="bg-white bg-white/25 backdrop-blur rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-3 text-center underline">Languages</h2>
        <p className="text-lg text-gray-600 text-center line-clamp-3">
          {languages}
        </p>
<div className="mt-3 text-right">
        <button
className="px-6 py-1 rounded-full 
     backdrop-blur 
    text-sm font-bold 
    hover:bg-white/25 
    transition cursor-pointer bg-gradient-to-r from-brand-magenta to-brand-teal bg-clip-text text-transparent"
>
  Read more…
</button>
</div>
      </div>

      <div className="bg-white bg-white/25 backdrop-blur rounded-2xl shadow-md p-8 hover:shadow-lg transition">
        <h2 className="text-2xl font-semibold mb-4 text-center underline">Skills</h2>
        <p className="text-lg text-gray-600 text-center">
          {skills}
        </p>
      <div className="mt-3 text-right">
        <button
className="px-6 py-1 rounded-full 
     backdrop-blur 
    text-sm font-bold 
    hover:bg-white/25 
    transition cursor-pointer bg-gradient-to-r from-brand-magenta to-brand-teal bg-clip-text text-transparent"
>
  Read more…
</button>
</div>
      </div>

    </div>

  
    <div className="flex items-center justify-center">
      <div className="bg-white bg-white/25 backdrop-blur rounded-2xl shadow-md p-12 hover:shadow-lg transition text-center w-full">
        <h2 className="text-2xl font-semibold mb-6 underline">Book your Session</h2>

 
        <button className="px-6 py-3 rounded-lg border border-white/25 bg-white/19 hover:bg-white/40 transition">
          View Availability
        </button>
      </div>
    </div>

  </div>
</div>
  );
}
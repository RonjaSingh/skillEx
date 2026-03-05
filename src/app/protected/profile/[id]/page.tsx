import { createClient } from "@/lib/supabase/server";
import { User } from "lucide-react";
import ReadMoreCard from "@/components/readmore";

type UserProfile = {
  id: string;
  name: string | null;
  profile_image: string | null;
  user_language: {
    language: {
      name: string;
    };
  }[] | null;
  user_skills: {
    skills: {
      name: string;
    };
  }[] | null;
};

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
      profile_image,
      user_language (
        language:language_id ( name )
      ),
      user_skills (
        skills ( name )
      )
    `)
    .eq("id", id)
    .single<UserProfile>();

  if (error || !user) {
    return <div className="p-6">Profil nicht gefunden</div>;
  }

  const languages =
    user.user_language?.map((l) => l.language.name) ||[];

  const skills =
    user.user_skills?.map((s) => s.skills.name)|| [];

  return (
    <div className="max-w-7xl mx-auto mt-4 space-y-12 text-gray-800 font-semibold">

      <div className="py-2 text-xl bg-white/15 backdrop-blur shadow-md p-8 rounded-full">
        <div className="flex items-center justify-center gap-12">
          <h1 className="text-2xl ">{user.name || "Username"}</h1>

          {user.profile_image ? (
            <img
              src={user.profile_image}
              alt="Profile Image"
              className="w-20 h-20 rounded-full object-cover border"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-xl">
              👤
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-52 relative">


        <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-white/25" />

        <div className="space-y-20">

          <div className="bg-white bg-white/15 backdrop-blur rounded-2xl shadow-md p-6  transition">
         
            <div className="mt-3 text-right">
              <ReadMoreCard title="Skills" items={skills} />
            </div>
          </div>

          <div className="bg-white bg-white/15 backdrop-blur rounded-2xl shadow-md p-8 mb-4 transition">
              <div className="mt-3 text-right">
              <ReadMoreCard title="Languages" items={languages} />
            </div>
          </div>

        </div>


        <div className="flex items-center justify-center">
          <div className="bg-white bg-white/15 backdrop-blur rounded-2xl shadow-md p-12 hover:shadow-lg transition text-center w-full">
            <h2 className="text-xl font-semibold mb-4 underline">Book your Session</h2>


            <button className="px-6 py-3 rounded-lg bg-white/20 hover:bg-white/40 transition">
              View Availability
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
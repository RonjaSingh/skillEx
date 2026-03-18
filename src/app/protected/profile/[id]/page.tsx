import { createClient } from "@/lib/supabase/server";
import { User } from "lucide-react";
import ReadMoreCard from "@/components/readmore";
import PublicProfileCalendar from "@/components/public-profile-calendar";



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

/*
  const { data: authData } = await supabase.auth.getUser()
  const currentUserId = authData.user?.id
  const isOwner = currentUserId === id

  /* User Profil laden */
 /* const { data: user, error } = await supabase
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


  

  //rating data laden
  const { data: ratings } = await supabase
  .from('rating')
  .select('stars')
  .eq('reviewed_user_id', id)

const safeRatings = ratings ?? []

const ratingCount = safeRatings.length

const averageRating =
  ratingCount > 0
    ? safeRatings.reduce((sum, r) => sum + r.stars, 0) / ratingCount
    : null

  const languages =
    user.user_language?.map((l) => l.language.name) || [];

  const skills =
    user.user_skills?.map((s) => s.skills.name) || [];
    */

    

const [
  /*{ data: authData },*/
  { data: user, error },
  { data: ratings }
] = await Promise.all([
  /*supabase.auth.getUser(),*/
  supabase
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
    .single<UserProfile>(),
  supabase
    .from('rating')
    .select('stars')
    .eq('reviewed_user_id', id)
])

// Auth
/*const currentUserId = authData.user?.id
const isOwner = currentUserId === id */

// Error handling
if (error || !user) {
  return <div className="p-6">Profil nicht gefunden</div>
}

// Ratings
const safeRatings = ratings ?? []

const ratingCount = safeRatings.length

const averageRating =
  ratingCount > 0
    ? safeRatings.reduce((sum, r) => sum + r.stars, 0) / ratingCount
    : null

// Mapping
const languages =
  user.user_language?.map((l) => l.language.name) || []

const skills =
  user.user_skills?.map((s) => s.skills.name) || []



  return (
    <div className="max-w-8xl mx-auto mt-4 px-24 space-y-12 text-gray-800 font-semibold">

      <div className="py-2 text-xl bg-white/10 backdrop-blur shadow-sm p-8 rounded-full">
        <div className="flex items-center justify-center gap-12">
          <h1 className="text-2xl ">{user.name || "Username"}</h1>

          {user.profile_image ? (
            <img
              src={user.profile_image}
              alt="Profile Image"
              className="w-16 h-16 rounded-full object-cover "
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-xl">
              👤
            </div>
          )}

<div className="flex flex-col items-center">
  {averageRating ? (
    <div className="flex items-center gap-1 text-yellow-500">
      {[1,2,3,4,5].map(n => (
        <span key={n} className={n <= Math.round(averageRating) ? '' : 'text-gray-300'}>
          ★
        </span>
      ))}
      <span className="ml-2 text-sm text-gray-600">
        {averageRating.toFixed(1)} ({ratingCount})
      </span>
    </div>
  ) : (
    <p className="text-sm text-gray-800">(No ratings yet)</p>
  )}
</div>



        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-52 relative">


        <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-white/25" />

        <div className="space-y-20">

          <div className="bg-white bg-white/8 backdrop-blur rounded-2xl shadow-md p-6  transition">

            <div className="mt-3 text-right">
              <ReadMoreCard title="Skills" items={skills} />
            </div>
          </div>

          <div className="bg-white bg-white/8 backdrop-blur rounded-2xl shadow-md p-8 mb-4 transition">
            <div className="mt-3 text-right">
              <ReadMoreCard title="Languages" items={languages} />
            </div>
          </div>

        </div>

        <div className="flex items-start justify-center">
          <div className="w-full">
            <PublicProfileCalendar profileUserId={id} />


          </div>
        </div>
      </div>

    </div>
  );
}
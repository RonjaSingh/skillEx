'use client';

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SkillSearch() {
  const supabase = createClient();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [allSkills, setAllSkills] = useState<any[]>([]);

  // Alle Skills laden
  useEffect(() => {
    const loadSkills = async () => {
      const { data } = await supabase
        .from("skills")
        .select("*");
      setAllSkills(data || []);
    };
    loadSkills();
  }, []);

  // Suche starten
const handleSearch = async () => {
  if (!search.trim()) return;

  const { data, error } = await supabase
    .from("user_skills")
.select(`
  user_id,
  skills:skills!user_skills_skill_id_fkey ( name ),
  user: user_skills_user_id_fkey (
    id,
    name,
    user_language (
      language:language_id ( name )
    )
  )
`)

    .ilike("skills.name", `%${search}%`);

  if (error) {
    console.error(error);
    return;
  }

console.log(JSON.stringify(data, null, 2));



  if (data) {
    const mapped = data.map((item: any) => ({
      user_id: item.user.id,
      name: item.user.name,
      skill: item.skills.name,
     languages:
  item.user.user_language
    ?.map((l: any) => l.language.name)
    .join(", ") || "—"

    }));

    setResults(mapped);
  }
};

  return (
    <div className="w-full max-w-xl mx-auto mt-2">

      {/* Suchleiste Container */}
      <div className="flex gap-2 p-2 border rounded-lg shadow-md bg-white">
        <input
          type="text"
          className="flex-1 border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          placeholder="Skill eingeben..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600"
        >
          Suchen
        </button>
      </div>

      {/* Ergebnisse */}
      <div className="space-y-3 mt-4">
        {results.map((user) => (
          <div
            key={user.user_id}
            onClick={() => router.push(`/protected/profile/${user.user_id}`)}
            className="border p-4 rounded-lg hover:bg-gray-50 cursor-pointer shadow-sm flex flex-col gap-1"
          >
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-gray-600">Sprache(n): {user.languages}</p>
            <p className="text-sm text-gray-600">Skill: {user.skill}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

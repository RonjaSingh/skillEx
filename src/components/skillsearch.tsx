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

  const [hasSearched, setHasSearched] = useState(false);


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

    setHasSearched(true);


    /* passende User ids finden */
    const { data: matches, error: matchError } = await supabase
      .from("user_skills")
      .select("user_id, skills!inner(name)")
      .ilike("skills.name", `%${search}%`);

    if (matchError) {
      console.error(matchError);
      return;
    }

    if (!matches || matches.length === 0) {
      setResults([]);
      return;
    }


    /* Alle Daten dieser User laden */
    const userIds = [...new Set(matches.map((m: any) => m.user_id))];

    const { data, error } = await supabase
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
      .in("id", userIds);

    if (error) {
      console.error(error);
      return;
    }


    /*für UI formatieren */
    const formatted = data.map((user: any) => ({
      user_id: user.id,
      name: user.name,
      languages:
        user.user_language
          ?.map((l: any) => l.language.name)
          .join(", ") || "—",
      skills:
        user.user_skills
          ?.filter((s: any) => s.skills)
          .map((s: any) => s.skills.name) || []
    }));

    setResults(formatted);
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

        {/* Treffer */}
        {results.map((user) => (
          <div
            key={user.user_id}
            onClick={() => router.push(`/protected/profile/${user.user_id}`)}
            className="border p-4 rounded-lg hover:bg-gray-50 cursor-pointer shadow-sm flex flex-col gap-1"
          >
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-gray-600">Sprache(n): {user.languages}</p>
            <p className="text-sm text-gray-600"> Skills: {user.skills.join(", ")}</p>
          </div>
        ))}

        {/*Keine Ergebnisse */}
        {hasSearched && results.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            Keine Ergebnisse gefunden
          </p>
        )}

      </div>
    </div>
  );
}
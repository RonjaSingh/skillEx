'use client';

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SkillSearch() {
  const supabase = createClient();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [allSkills, setAllSkills] = useState<any[]>([]);

  const [hasSearched, setHasSearched] = useState(false);


  const resultsRef = useRef<HTMLDivElement | null>(null);


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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setHasSearched(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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


    /* für UI formatieren */
    const formatted = data.map((user: any) => {
      const skillList =
        user.user_skills
          ?.filter((s: any) => s.skills)
          .map((s: any) => s.skills.name) || [];

      // Gesuchten Skill als erstes anzeigen
      const sortedSkills = skillList.sort((a: string, b: string) => {
        const searchLower = search.toLowerCase();

        const aMatch = a.toLowerCase().includes(searchLower);
        const bMatch = b.toLowerCase().includes(searchLower);

        if (aMatch && !bMatch) return -1;
        if (!aMatch && bMatch) return 1;
        return 0;
      });

      return {
        user_id: user.id,
        name: user.name,
        languages:
          user.user_language
            ?.map((l: any) => l.language.name)
            .join(", ") || "—",
        skills: sortedSkills
      };
    });

    setResults(formatted);
  };

  // erster Buchstabe immer gross(Helferfunktion)
  const capitalize = (str: string) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  return (

    <div className="w-full mt-0 px-0 relative">


      {/* Suchleiste Container */}
     <div className="flex justify-center gap-4 p-6 mt-10 mb-6 backdrop-blur-md bg-white/20 rounded-2xl shadow-xl border border-white/30">
        <input
          type="text"
          className="w-96 px-5 py-3 rounded-xl bg-white text-gray-800 placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-purple/40 focus:border-brand-purple transition-all shadow-sm"
          placeholder="Skill eingeben..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="w-64 p-3 rounded-xl bg-white/25 backdrop-blur-md text-gray-800 font-semibold text-lg shadow-lg border border-white/30 hover:bg-white/35 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-200 ease-out">
        Search
        </button>
      </div>


      {/* Ergebnisse */}
      {hasSearched && (
        <div ref={resultsRef} className="absolute top-20 left-0 right-0 bg-white border rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto p-3 space-y-3">

          {/* Treffer */}
          {results.map((user) => (
            <div
              key={user.user_id}
              className="border p-4 rounded-lg hover:bg-gray-50 shadow-sm flex items-center justify-between cursor-default"
            >
              <h3
                onClick={() => router.push(`/protected/profile/${user.user_id}`)}
                className="font-semibold cursor-pointer hover:text-pink-500 w-1/4">{user.name}</h3>
              <p className="text-sm text-gray-600 w-1/4"><strong>Sprache(n): </strong><br />{capitalize(user.languages)}</p>
              <p className="text-sm text-gray-600 w-1/4"> <strong>Skills: </strong><br />{capitalize(user.skills.join(", "))}</p>

              {/* Button rechts */}
              <button
                onClick={() => {
                  /*  router.push(`/calendar/${user.user_id}`) */
                }}
                className="bg-pink-500 text-white w-40 px-2 py-2 rounded-lg hover:bg-pink-600 transition"
              >
                Book a session
              </button>
            </div>
          ))}

          {/*Keine Ergebnisse */}
          {hasSearched && results.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              Keine Ergebnisse gefunden
            </p>
          )}
        </div>
      )}
    </div>
  )
}
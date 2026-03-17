'use client';

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import PublicProfileCalendar from "@/components/public-profile-calendar"

export default function SkillSearch() {
  const supabase = createClient();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [allSkills, setAllSkills] = useState<any[]>([]);

  const [hasSearched, setHasSearched] = useState(false);


  const resultsRef = useRef<HTMLDivElement | null>(null);


  const [calendarUserId, setCalendarUserId] = useState<string | null>(null)

  // Alle skills laden
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
    const searchTerm = search.toLowerCase();

    /* 1️⃣ Skill Matches */
    const { data: skillMatches, error: skillError } = await supabase
      .from("user_skills")
      .select("user_id, skills!inner(name)")
      .ilike("skills.name", `%${search}%`);

    if (skillError) {
      console.error(skillError);
      return;
    }

    /* 2️⃣ Username Matches */
    const { data: nameMatches, error: nameError } = await supabase
      .from("user")
      .select("id")
      .ilike("name", `%${search}%`);

    if (nameError) {
      console.error(nameError);
      return;
    }

    /* 3️⃣ IDs kombinieren */
    const skillUserIds = skillMatches?.map((m: any) => m.user_id) || [];
    const nameUserIds = nameMatches?.map((u: any) => u.id) || [];

    const userIds = [...new Set([...skillUserIds, ...nameUserIds])];

    if (userIds.length === 0) {
      setResults([]);
      return;
    }

    /* 4️⃣ Userdaten laden */
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

    /* 5️⃣ Für UI formatieren */
    const formatted = data.map((user: any) => {
      const skillList =
        user.user_skills
          ?.filter((s: any) => s.skills)
          .map((s: any) => s.skills.name) || [];

      const sortedSkills = skillList.sort((a: string, b: string) => {
        const aMatch = a.toLowerCase().includes(searchTerm);
        const bMatch = b.toLowerCase().includes(searchTerm);

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
  //Helferfunktionen:
  // erster Buchstabe immer gross
  const capitalize = (str: string) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  // Text kürzen, wenn zu lang
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.slice(0, maxLength) + "..."
      : text;
  };

  return (

    <div className="w-full mt-0 px-0 relative">


      {/* Suchleiste Container */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="flex justify-center gap-4 p-6 mt-30 lg:mt-10 mb-6 backdrop-blur-md bg-white/20 rounded-2xl shadow-xl"
      >
        <input
          type="text"
          className="w-96 px-5 py-3 rounded-xl bg-white text-gray-800 placeholder:text-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-purple/40 focus:border-brand-purple transition-all shadow-sm"
          placeholder="Skill or User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button

          type="submit"
          className="w-64 p-3 rounded-xl bg-white/25 backdrop-blur-md text-gray-800 font-semibold text-lg shadow-lg hover:bg-white/35 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-200 ease-out">
          Search
        </button>

      </form>

      {/* Ergebnisse */}
      {hasSearched && (
        <div
          ref={resultsRef}
          className="absolute top-24 left-0 right-0 border border-white/30 border-t-0
           backdrop-blur-xl bg-white/20 rounded-b-2xl shadow-xl 
           z-50 max-h-[400px] overflow-y-auto p-3 space-y-3"
        >
          {/* Treffer */}
          {results.map((user) => (
            <div
              key={user.user_id}
              className=" p-4 rounded-lg shadow-md flex items-center justify-between cursor-default hover:bg-white/10 transition"
            >
              <h3
                onClick={() => router.push(`/protected/profile/${user.user_id}`)}
                className="font-bold cursor-pointer hover:text-brand-purple/100 w-1/4">{user.name}</h3>
              <p className="text-sm font-bold text-gray-800 w-1/4"> <strong>Skills: </strong><br />{truncateText(capitalize(user.skills.join(", ")), 25)}</p>
              <p className="text-sm font-bold text-gray-800 w-1/4"><strong>Languages: </strong><br />{truncateText(capitalize(user.languages), 25)}</p>


              {/* Button rechts */}
              <button
                onClick={() => setCalendarUserId(user.user_id)}
                className="bg-brand-blue/80 text-white w-40 px-2 py-2 rounded-lg shadow-md hover:shadow-lg transition hover:bg-brand-blue/80 transition"
              >
                Book a session
              </button>
            </div>
          ))}

          {/*Keine Ergebnisse */}
          {hasSearched && results.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
             No Results
            </p>
          )}
        </div>
      )}

      {/* calendar popup */}
      {calendarUserId && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-6">

          {/* Overlay hinter dem Kalender */}
          <div
            className="absolute inset-0 backdrop-blur-md bg-black/20"
            onClick={() => setCalendarUserId(null)}
          />

          {/* Kalender selbst */}
          <div
            className="    relative 
    w-full 
    max-w-5xl
    bg-white/50
    backdrop-blur-xl
    border border-white/20
    shadow-2xl
    rounded-3xl
    overflow-auto
    p-8
    text-gray-800"
            onClick={(e) => e.stopPropagation()}
          >

            <PublicProfileCalendar profileUserId={calendarUserId}

            />

            {/* Button unter dem Kalender */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setCalendarUserId(null)}
                className="px-6 py-3  bg-gradient-to-r from-brand-magenta/10 to-brand-teal/10 rounded-xl shadow-md hover:from-brand-magenta/30 hover:to-brand-teal/30 font-semibold transition"
              >
               Close Calendar
              </button>
            </div>
          </div>

        </div>
      )}
    </div>

  )
}
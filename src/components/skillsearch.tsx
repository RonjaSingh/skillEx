'use client';

import { use, useState } from "react";
import { createClient } from "@/lib/supabase/client";



export default function SkillSearch() {
    const supabase = createClient();
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<any[]>([]);

    const handleSearch = async () => {
        if (!search) return;

        const { data, error } = await supabase
            .from("profiles_with_skills")
            .select("*")
            .ilike("skill", `%${search}%`);

        if (error) {
            console.error(error);
            return;
        }

        setResults(data);
    };

    return (
  <div className="w-full max-w-xl mx-auto mt-2 space-y-4 text-center">

    {/* Suchbereich */}
    <div className="flex justify-center gap-2">
      <input
        className="w-full max-w-md border px-4 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-gray-300"
        type="text"
        placeholder="Skill eingeben..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button
        onClick={handleSearch}
        className="px-6 py-2 border rounded bg-white hover:bg-gray-100 font-medium shadow-sm"
      >
        Suchen
      </button>
    </div>

    {/* Ergebnisse */}
    <div className="space-y-3">
      {results.map((user) => (
        <div
          key={user.id}
          className="border rounded p-3 bg-white shadow-sm"
        >
          <h3 className="font-semibold">{user.username}</h3>
          <p className="text-gray-600 text-sm">{user.skill}</p>
        </div>
      ))}
    </div>

  </div>
    );
}

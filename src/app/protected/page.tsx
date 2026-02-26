"use client";

import { LogoutButton } from '@/components/logout-button'

import Board from '@/components/board'
import { useEffect, useState } from "react";
import { createClient } from '@/lib/supabase/client';

interface Advertisement {
  advertisement_id: string
typ: "offer" | "request";
  title: string;
  description: string;
  created_at: string;
  user: {
    name: string;
  };
}

export default function ProtectedHome() {
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<"offer" | "request">("request");
  const [error, setError] = useState("");

  // Anzeigen laden
  useEffect(() => {

    const loadAds = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("advertisement")
        .select("advertisement_id, title, description, typ, created_at, user:user_id(name)")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setAds(data as Advertisement[]);
    };

    loadAds();
  }, []);

  // Anzeige erstellen
  const createAd = async () => {
    setError("");

    if (!title.trim() || !description.trim()) {
      setError("Titel und Beschreibung dürfen nicht leer sein.");
      return;
    }

    if (description.length > 300) {
      setError("Beschreibung darf maximal 300 Zeichen haben.");
      return;
    }
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData.user?.id;

    if (!userId) {
      setError("Du bist nicht eingeloggt.");
      return;
    }

    const { error } = await supabase.from("advertisement").insert({
      
    description,
    title,
    typ: type,
    user_id: userId,
    });

    if (error) setError("Fehler beim Speichern.");
    else {
      setTitle("");
      setDescription("");
      // Anzeigen neu laden
      const { data } = await supabase
        .from("advertisement")
        .select("*, user:user_id(name)")
        .order("created_at", { ascending: false });
      setAds(data as Advertisement[]);
    }
  };

  const angebote = ads.filter((ad) => ad.typ === "offer");
  const gesuche = ads.filter((ad) => ad.typ === "request");

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px" }}>
      <h1>Schwarzes Brett</h1>

      <div style={{ margin: "20px 0", display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Beschreibung"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value as any)}>
          <option value="GESUCH">Gesuch</option>
          <option value="ANGEBOT">Angebot</option>
        </select>
        <button onClick={createAd}>Anheften</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
        <div>
          <h2>Angebote</h2>
          {angebote.map((ad) => (
            <div key={ad.advertisement_id} style={{ backgroundColor: "#64b5f6", padding: "15px", borderRadius: "8px", marginBottom: "10px" }}>
              <strong>{ad.title}</strong>
              <p>{ad.description}</p>
              <small>von {ad.user?.name}</small>
            </div>
          ))}
        </div>
        <div>
          <h2>Gesuche</h2>
          {gesuche.map((ad) => (
            <div key={ad.advertisement_id} style={{ backgroundColor: "#fff176", padding: "15px", borderRadius: "8px", marginBottom: "10px" }}>
              <strong>{ad.title}</strong>
              <p>{ad.description}</p>
              <small>von {ad.user?.name}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

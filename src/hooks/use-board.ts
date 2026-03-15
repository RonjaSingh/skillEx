"use client";
import { useState, useEffect } from "react";

export type Post = {
  advertisment_id?: string;
  title: string;
  description: string;
  typ: "offer" | "request";
  user?: {
    id: string;      
    name: string;
  }| null;
  created_at: string;
};

export default function useBoard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Posts laden
  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/advertisements");
      const data = await res.json();

        console.log("Fetched posts:", data); // <-- Hier einfügen
      setPosts(data);
    }
    fetchPosts();
  }, []);

  // Post erstellen
  const addPost = async (
    title: string,
    description: string,
    type: "offer" | "request"
  ) => {

    if (isSaving) return;

    setIsSaving(true);

    try {
      const res = await fetch("/api/advertisements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          typ: type,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Server error:", text);
        throw new Error("Fehler beim Speichern");
      }

      const newPost = await res.json();

      setPosts((prev) => [newPost, ...prev]);
    } catch (err) {
      console.error("Post konnte nicht gespeichert werden:", err);
    }

       setIsSaving(false);
  };

  return { posts, addPost };
}

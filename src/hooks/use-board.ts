"use client";
import { useState, useEffect } from "react";

export type Post = {
  advertisment_id?: string;
  title: string;
  description: string;
  typ: "offer" | "request";
  user?: { name: string } | null;
  created_at: string;
};

export default function useBoard(userName: string | undefined) {
  const [posts, setPosts] = useState<Post[]>([]);

  // Laden von posts
  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/advertisements");
      const data = await res.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  // Neue posts erstellen
  const addPost = async (title: string, description: string, type: "offer" | "request") => {
    const body = { title, description, typ: type, user_id: "" };
    try {
      const res = await fetch("/api/advertisements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Fehler beim Speichern");

      const newPost = await res.json();
      setPosts([newPost, ...posts]);
    } catch (err) {
      console.error("Post konnte nicht gespeichert werden:", err);
    }
  };

  return { posts, addPost };
}

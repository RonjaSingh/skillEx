"use client";

import { useState } from "react";
import Image from "next/image";

export default function HomePage() {
  const [posts, setPosts] = useState<{ text: string; type: "gesuch" | "angebot" }[]>([]);
  const [newPost, setNewPost] = useState("");
  const [filter, setFilter] = useState<"gesuch" | "angebot" | "all">("all");

  const addPost = (type: "gesuch" | "angebot") => {
    if (!newPost.trim()) return;
    setPosts([{ text: newPost, type }, ...posts]);
    setNewPost("");
    setFilter(type);
  };

  const filteredPosts = posts.filter(p => filter === "all" ? true : p.type === filter);

  return (
    <main className="container">

      {/* HEADER */}
      <header className="header">
        <div className="left-header">
          <Image src="/skillexchange2.0.png" alt="Logo" width={60} height={60} />
          <h1>SkillExchange</h1>
        </div>
        <div className="right-header">
          <div className="username">Name</div>
          <div className="avatar">🎓</div>
        </div>
      </header>

      {/* MENÜ */}
      <section className="menu">
        <h2>Menü</h2>
      </section>

      {/* SUCHLEISTE */}
      <div className="search-area">
        <input type="text" placeholder="Suchleiste: Skill Suche…" className="search-input" />
        <button className="browse-btn">Browse Users…</button>
      </div>

      {/* SCHWARZES BRETT */}
      <section className="board">
        <h2>Schwarzes Brett</h2>

        <div className="new-post">
          <textarea
            placeholder="Schreibe hier etwas..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <div className="post-buttons">
            <button onClick={() => addPost("gesuch")}>Gesuch anheften</button>
            <button onClick={() => addPost("angebot")}>Angebot anheften</button>
          </div>
        </div>

        <div className="filter-buttons">
          <button onClick={() => setFilter("all")}>Alle</button>
          <button onClick={() => setFilter("gesuch")}>Gesuch</button>
          <button onClick={() => setFilter("angebot")}>Angebot</button>
        </div>

        <div className="posts">
          {filteredPosts.length === 0 && <div className="empty">Noch keine Beiträge.</div>}
          {filteredPosts.map((p, i) => (
            <div key={i} className="post">{p.text}</div>
          ))}
        </div>
      </section>

    
    
      <footer className="impressum">
        <button>Impressum</button>
      </footer>

    </main>
  );
}

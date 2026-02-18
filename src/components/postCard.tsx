"use client";

import { useState } from "react";

type Post = {
  title: string;
  text: string;
  type: "gesuch" | "angebot";
};

export default function PostCard({ post }: { post: Post }) {
  const [expanded, setExpanded] = useState(false);
  const cutoff = 60; 

  return (
    <div className="border rounded-lg p-3 bg-white shadow-sm w-[150px] h-[150px] flex flex-col">
      {/* Label */}
      <span
        className={`text-xs font-bold uppercase ${
          post.type === "gesuch" ? "text-black" : "text-black"
        }`}
      >
        {post.type === "gesuch" ? "Suche …" : "Biete …"}
      </span>

      {/* Titel */}
      <span className="text-sm font-semibold mt-1">{post.title}</span>

      {/* Text */}
      <p className="mt-1 text-sm flex-1 text-gray-700">
        {expanded
          ? post.text
          : post.text.length > cutoff
          ? post.text.slice(0, cutoff) + "..."
          : post.text}
      </p>

      {/* Read more */}
      {post.text.length > cutoff && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-600 text-xs mt-1 hover:underline self-start"
        >
          {expanded ? "Show less" : "Read more…"}
        </button>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

type Props = {
    post: Post
    onReadMore: (post: Post) => void
}

type Post = {
    title: string;
    text: string;
    type: "gesuch" | "angebot";
    creator: string;
    timestamp: string;
};

export default function PostCard({ post, onReadMore }: Props) {

    const cutoff = 60;

    return (
<div className="border rounded-lg p-3 bg-white aspect-square flex flex-col">


            {/* Label */}
            <span
                className="text-sm font-bold text-black"

            >
                {post.type === "gesuch" ? " Biete:" : "Suche:"}
            </span>

            {/* Titel */}
           <span className="text-sm font-bold underline m-1 break-words">{post.title}</span>


            {/* Text */}
            <p className="m-1 text-xs text-gray-700 break-words flex-1 overflow-hidden">

                {post.text.length > cutoff
                    ? post.text.slice(0, cutoff) + "..."
                    : post.text}
            </p>


            <button
                onClick={() => onReadMore(post)}
                className="text-blue-600 text-xs mt-2 hover:underline self-start"
            >
                Read more…
            </button>

        </div>

    );
}

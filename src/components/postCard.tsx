"use client";

import { useState } from "react";

type Props = {
    post: Post
    onReadMore: (post: Post) => void
}

type Post = {
    title: string;
    description: string;
    typ: "offer" | "request";
    user: { name: string } | null;
    created_at: string;
};

export default function PostCard({ post, onReadMore }: Props) {

    const cutoff = 60;

    return (
        <div className="border rounded-lg p-3 bg-white aspect-square flex flex-col relative">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-fuchsia-500 rounded-full shadow-md border border-fuchsia-800"></div>

            {/* Label */}
            <span
                className="text-sm font-bold text-black"

            >
                {post.typ === "offer" ? " Biete:" : "Suche:"}
            </span>

            {/* Titel */}
            <span className="text-sm font-bold underline m-1 break-words">{post.title}</span>


            {/* Text */}
            <p className="m-1 text-xs text-gray-700 break-words flex-1 overflow-hidden">
                {post.description.length > 60
                    ? post.description.slice(0, 60) + "..."
                    : post.description}
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

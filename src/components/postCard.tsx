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
        <div className="border rounded-lg p-3 bg-white w-[150px] h-[150px] flex flex-col">
            {/* Label */}
            <span
                className="text-xs font-bold uppercase text-black"
    
            >
                {post.type === "gesuch" ? "Suche …" : "Biete …"}
            </span>

            {/* Titel */}
            <span className="text-sm font-bold underline mt-1">{post.title}</span>

            {/* Text */}
            <p className="mt-1 text-sm text-gray-700 break-words h-[60px] overflow-hidden">
                {post.text.length > cutoff
                    ? post.text.slice(0, cutoff) + "..."
                    : post.text}
            </p>


            {post.text.length > cutoff && (
                <button
                    onClick={() => onReadMore(post)}
                    className="text-blue-600 text-xs mt-1 hover:underline self-start"
                >
                    Read more…
                </button>
            )}
        </div>

    );
}

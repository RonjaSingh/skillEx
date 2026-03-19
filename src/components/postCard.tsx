"use client";

import { useState } from "react";
import { Post } from "@/hooks/use-board";

type Props = {
    post: Post
    onReadMore: (post: Post) => void
}



export default function PostCard({ post, onReadMore }: Props) {

    const cutoff = 60;

    const isRequest = post.typ === "request";

    return (
<div
  className={`relative rounded-lg p-3 flex flex-col
  h-[180px]
  bg-white
  border
  
  ${isRequest
    ? "border-brand-magenta"
    : "border-brand-teal"
  }`}
>

            {/* Pin/Magnet */}
            <div
                className={`absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.4)]
           ${isRequest
                        ? "bg-brand-magenta border border-brand-magenta/80"
                        : "bg-brand-teal border border-brand-teal/80"}`}>

            </div>

            {/* Label */}
            <span
                className="text-sm font-bold text-gray-800 underline mb-2"

            >
                {post.typ === "offer" ? " Offer:" : "Request:"}
            </span>

            {/* Titel */}
            <span className="text-sm text-gray-800 font-semibold  break-words mb-1">{post.title}</span>


            {/* Text */}
            <p className=" text-sm text-gray-800 break-words flex-1 overflow-hidden">
                {post.description.length > 60
                    ? post.description.slice(0, 60) + "..."
                    : post.description}
            </p>



            <button
                onClick={() => onReadMore(post)}
                className=" bg-gradient-to-r from-brand-magenta to-brand-teal bg-clip-text text-transparent  text-xs font-semibold mt-2 hover:underline self-start cursor-pointer"
            >
                Read more…
            </button>

        </div>

    );
}

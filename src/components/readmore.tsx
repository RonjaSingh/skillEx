"use client";
import { useState } from "react";

export default function ReadMoreCard({
    title,
    items,
}: {
    title: string;
    items: string[];
}) {
    const [expanded, setExpanded] = useState(false);

    const previewItems = expanded ? items : items.slice(0, 3);
    const hasMore = items.length > 3;

    return (
        <div className="transition-all duration-300">

            <h2 className="text-xl font-semibold mb-4 text-center underline">
                {title}
            </h2>

            <div className="text-center text-gray-700 space-y-1 min-h-[92px]">
                {previewItems.map((item, index) => (
                    <div key={index}>
                        {item}
                    </div>
                ))}
            </div>


            <div className="mt-3 text-center bg-white bg-white/4 backdrop-blur rounded-2xl shadow-md hover:bg-white/15 transition">
                <button
                    onClick={() => hasMore && setExpanded(!expanded)}
                    disabled={!hasMore}
                    className={`px-6 py-1 rounded-full text-sm font-bold transition
    bg-gradient-to-r from-brand-magenta to-brand-teal bg-clip-text text-transparent
    ${hasMore
                            ? "cursor-pointer"
                            : " cursor-default pointer-events-none"
                        }`}
                >
                    {expanded ? "Show less…" : "Show more…"}
                </button>
            </div>

        </div>
    );
}
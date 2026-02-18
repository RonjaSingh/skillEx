"use client";

import { useState } from "react";

type Post = {
    text: string;
    type: "gesuch" | "angebot";
};

export default function Board() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [modalType, setModalType] = useState<"gesuch" | "angebot" | null>(null);

    const addPost = (text: string, type: "gesuch" | "angebot") => {
        setPosts([{ text, type }, ...posts]);
        setModalType(null);
    };

    return (
        <section className="max-w-4xl mx-auto">

            <strong><h2 className="text-2xl font-bold text-center mb-4  ">Board</h2></strong>

            <div className="space-y-3">

                {/* Feld für Anzeigen */}
                <div className="h-[450px] overflow-y-auto space-y-3 border-2 border-gray-300 rounded-lg p-4 bg-gray-800 text-white">

                    {posts.length === 0 && (
                        <div className="flex items-center justify-center text-center text-white h-full">
                            Noch keine Anzeigen angeheftet.
                        </div>
                    )}

                    {posts.map((post, i) => (
                        <div key={i} className="border rounded-lg p-4 bg-white shadow-sm">
                            <span className={`text-xs font-semibold uppercase ${post.type === "gesuch" ? "text-blue-600" : "text-green-600"
                                }`}>
                                {post.type}
                            </span>

                            <p className="mt-2">{post.text}</p>
                        </div>
                    ))}

                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-5 pt-2 mb-6 text-white font-bold text-xl">
                    <button
                        onClick={() => setModalType("gesuch")}
                        className="w-45 h-20 bg-pink-500 rounded-lg hover:bg-pink-700"
                    >
                        Gesuch
                    </button>

                    <button
                        onClick={() => setModalType("angebot")}
                        className="w-45 h-20 bg-pink-500 rounded-lg hover:bg-pink-700"
                    >
                        Angebot
                    </button>
                </div>

            </div>




        </section>
    );
}

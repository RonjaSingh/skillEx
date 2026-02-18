"use client";

import { useState } from "react";
import BoardPopup from "./board-popup";


type Post = {
    title: string;
    text: string;
    type: "gesuch" | "angebot";
};

export default function Board() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [popupType, setPopupType] = useState<"gesuch" | "angebot" | null>(null);

    const addPost = (title: string, text: string, type: "gesuch" | "angebot") => {
        const displayTitle =
            type === "gesuch" ? `Suche … ${title}` : `Biete … ${title}`;


        setPosts([{ title, text, type }, ...posts]);
        setPopupType(null);
    };

    return (
        <section className="max-w-4xl mx-auto">

            <strong><h2 className="text-2xl font-bold text-center mb-4  ">Board</h2></strong>

            <div className="space-y-3">

                {/* Feld für Anzeigen */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-[450px] overflow-y-auto space-y-3 border-2 border-gray-300 rounded-lg p-4 bg-gray-800 text-white">

                    {posts.length === 0 && (
                        <div className="flex items-center justify-center text-center text-white h-full">
                            Noch keine Anzeigen angeheftet.
                        </div>
                    )}

                    {posts.map((post, i) => (
                        <div
                            key={i}
                            className="border rounded-lg p-4 bg-white shadow-sm w-[200px] h-[200px] flex flex-col"
                        >
                            {/* Titel */}
                            <span
                                className={`text-sm font-bold uppercase 
                                    ${post.type === "gesuch" ? "text-blue-600" : "text-green-600"
                                    }`}
                            >
                                {post.title}
                            </span>

                            {/* Text */}
                            <p className="mt-2 text-sm flex-1 overflow-auto text-gray-700">
                                {post.text}
                            </p>
                        </div>
                    ))}

                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-10 mb-6 text-white font-bold text-xl">
                    <button
                        onClick={() => setPopupType("gesuch")}
                        className=" w-[180px] h-16 bg-pink-500 rounded-lg hover:bg-pink-700"
                    >
                        Request
                    </button>

                    <button
                        onClick={() => setPopupType("angebot")}
                        className="w-[180px] h-16 bg-pink-500 rounded-lg hover:bg-pink-700"
                    >
                        Offer
                    </button>
                </div>

            </div>

            {popupType && (
                <BoardPopup
                    type={popupType}
                    onClose={() => setPopupType(null)}
                    onSubmit={(title, text) => addPost(title, text, popupType)}
                />
            )}



        </section>
    );
}

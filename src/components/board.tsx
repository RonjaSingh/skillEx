"use client";

import { useState } from "react";
import BoardPopup from "./board-popup";
import PostCard from "./postCard";
import useProfile from "@/hooks/use-profile";
import PostFullPopup from "./fullPost-popup";


type Post = {
    title: string;
    text: string;
    type: "gesuch" | "angebot";
    creator: string;
    timestamp: string;
};

export default function Board() {
    const { name } = useProfile()
    const [posts, setPosts] = useState<Post[]>([]);

    const [selectedPost, setSelectedPost] = useState<Post | null>(null)

    const [popupType, setPopupType] = useState<"gesuch" | "angebot" | null>(null);

    const addPost = (title: string, text: string, type: "gesuch" | "angebot") => {
        const timestamp = new Date().toISOString();

        setPosts([{ title, text, type, creator: name, timestamp }, ...posts]);
        setPopupType(null);
    };

    return (
        <section className="max-w-4xl mx-auto">

            <strong><h2 className="text-2xl font-bold text-center mb-4  ">Board</h2></strong>

            <div className="space-y-3">

                {/*board container */}
             <div className="
  border-4 border-green-900
  rounded-lg
  p-6
  h-[500px]
  bg-[#1E3A2F]
  shadow-inner
">

                    {posts.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-white text-center px-4">
                            No posts yet. Be the first to create a post!
                        </div>
                    ) : (
                       <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-5">

                            {posts.map((post, i) => (
                                <PostCard
                                    key={i}
                                    post={post}
                                    onReadMore={(p) => setSelectedPost(p)}
                                />
                            ))}

                        </div>
                    )}
                </div>
                {/* Buttons */}
                <div className="flex justify-center gap-10 mb-6 text-white font-bold text-xl">
                    <button
                        onClick={() => setPopupType("gesuch")}
                        className=" w-[180px] h-16 bg-cyan-800 rounded-lg hover:bg-cyan-800"
                    >
                      Offer
                    </button>

                    <button
                        onClick={() => setPopupType("angebot")}
                        className="w-[180px] h-16 bg-fuchsia-800 rounded-lg hover:bg-fuchsia-800"
                    >
                        Request
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

            {selectedPost && (
                <PostFullPopup
                    post={selectedPost}
                    onClose={() => setSelectedPost(null)}
                />
            )}


        </section>
    );
}

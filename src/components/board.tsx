"use client";

import { useState } from "react";
import BoardPopup from "./board-popup";
import PostCard from "./postCard";
import PostFullPopup from "./fullPost-popup";
import useProfile from "@/hooks/use-profile";
import useBoard, { Post } from "@/hooks/use-board";


export default function Board() {
    const { name, loading } = useProfile();

    const { posts, addPost } = useBoard();


    const [selectedPost, setSelectedPost] = useState<Post | null>(null)

    const [popupType, setPopupType] = useState<"offer" | "request" | null>(null);

    if (loading) return null

    return (
        <section className="max-w-4xl mx-auto">

            <strong><h2 className="text-2xl font-bold text-center mb-2">Board</h2></strong>

            <div className="space-y-3">

                {/*board container */}
                <div className="border-4 border-green-900 rounded-lg p-6 h-[500px] bg-[#1E3A2F] shadow-inner
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
                <div className="flex justify-center gap-26 m-8 text-white font-bold text-xl">
                    <button
                        onClick={() => setPopupType("offer")}
                        className="w-64 p-3 rounded-xl bg-white/25 backdrop-blur-md text-gray-800 font-semibold text-lg shadow-lg border border-white/30 hover:bg-white/35 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-200 ease-out"
                    >
                        Offer
                    </button>

                    <button
                        onClick={() => setPopupType("request")}
                        className="w-64 p-3 rounded-xl bg-white/25 backdrop-blur-md text-gray-800 font-semibold text-lg shadow-lg border border-white/30 hover:bg-white/35 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-200 ease-out"
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

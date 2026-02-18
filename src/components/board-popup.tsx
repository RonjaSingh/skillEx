"use client";

import { useState } from "react";

type Props = {
    type: "gesuch" | "angebot";
    onClose: () => void;
    onSubmit: (title: string, text: string) => void;
};

export default function BoardPopup({ type, onClose, onSubmit }: Props) {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");

    const label = type === "gesuch" ? "Ich suche…" : "Ich biete…";

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[400px] space-y-4 shadow-lg">

                {/* Popup Titel */}
                <h3 className="text-xl font-bold text-center">
                    {type === "gesuch" ? "Gesuch erstellen" : "Angebot erstellen"}
                </h3>
                {/* Label über Titel */}
                <span className="text-sm font-semibold text-gray-500">{label}</span>

                {  /* Titel */}
                <input
                    type="text"
                    className="w-full border rounded p-3"
                    placeholder="Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />


                {/* Textarea */}
                <textarea
                    className="w-full border rounded p-3 h-32 resize-none"
                    placeholder="Description..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                {/* Buttons */}
                <div className="flex justify-between">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => {
                            if (!text.trim()) return;
                            onSubmit(title, text);
                        }}
                        className="px-8 py-2 bg-pink-500 text-white rounded hover:bg-pink-700"
                    >
                        Pin
                    </button>
                </div>

            </div>
        </div>
    );
}

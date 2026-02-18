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

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[400px] space-y-4 shadow-lg">

                {/* Popup Titel */}
                <h3 className="text-xl font-bold text-center">
                    {type === "gesuch" ? "Gesuch erstellen" : "Angebot erstellen"}
                </h3>

                <input
                    type="text"
                    className="w-full border rounded p-3"
                    placeholder="Titel eingeben"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />


                {/* Textarea */}
                <textarea
                    className="w-full border rounded p-3 h-32 resize-none"
                    placeholder="Beschreibung..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                
                {/* Buttons */}
                <div className="flex justify-between">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Abbrechen
                    </button>

                    <button
                        onClick={() => {
                            if (!text.trim()) return;
                            onSubmit(title, text);
                        }}
                        className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-700"
                    >
                        Anheften
                    </button>
                </div>

            </div>
        </div>
    );
}

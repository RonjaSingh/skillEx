"use client";

import { useState } from "react";

type Props = {
    type: "offer" | "request";
    onClose: () => void;
    onSubmit: (title: string, text: string) => void;
};

export default function BoardPopup({ type, onClose, onSubmit }: Props) {
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");

    const label = type === "request" ? "Ich suche…" : "Ich biete…";

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[400px] space-y-4 shadow-lg">

                {/* Popup Titel */}
                <h3 className="text-xl font-bold text-center">
                    {type === "request" ? "Gesuch erstellen" : "Angebot erstellen"}
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
                <div className="flex justify-center gap-4 ">
                    <button
                        onClick={onClose}
                        className="w-30 py-2 rounded-lg border bg-gray-300 hover:bg-gray-400 text-gray-800"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={async () => {
                            if (!text.trim()) return;


                            onSubmit(title, text);
                            onClose();
                        }}
                        className="w-30 py-2 rounded-lg border bg-pink-700 hover:bg-pink-800 text-white"
                    >
                        Pin
                    </button>

                </div>

            </div>
        </div>
    );
}

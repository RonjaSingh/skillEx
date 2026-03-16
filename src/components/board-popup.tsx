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


    const isRequest = type === "request";
    const cancelColor = isRequest
        ? "bg-brand-magenta/40 border border-brand-magenta/20 hover:bg-brand-magenta/20"
        : "bg-brand-blue/40 border border-brand-blue/20 hover:bg-brand-blue/20";

    const pinColor = isRequest
        ? "bg-brand-magenta/60 border border-brand-magenta/40 hover:bg-brand-magenta/40"
        : "bg-brand-blue/60 border border-brand-blue/40 hover:bg-brand-blue/40";

    return (
        <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50">
            <div className="w-full 
    max-w-2xl
    min-h-[35vh]
    bg-white/60
    backdrop-blur-xl
    shadow-2xl
    rounded-3xl
    overflow-auto
    px-8
    py-8
    text-gray-800">

                {/* Popup Titel */}
                <h3
                    className={`mb-2 text-xl font-bold text-center text-gray-800 backdrop-blur-md rounded-2xl p-2
                     ${isRequest
                            ? "bg-brand-magenta/25 border border-brand-magenta/40"
                            : "bg-brand-teal/25 border border-brand-teal/40"}`}>
                    {type === "request" ? "Create Request" : "Create Offer"}
                </h3>

            
                {  /* Titel */}
                <input
                    type="text"
                    className={`w-full rounded p-3 border
                     ${isRequest
                          ? "bg-brand-magenta/20 border-brand-magenta/10 focus:ring-1 focus:ring-brand-magenta/20 focus:border-brand-magenta"
      : "bg-brand-teal/20 border-brand-teal/10 focus:ring-1 focus:ring-brand-teal/20 focus:border-brand-teal"}
                               focus:outline-none transition-all duration-200`}
                    placeholder="Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />


                {/* Textarea */}
               <textarea
  className={`w-full h-[150px] resize-none rounded p-3 mt-1 border
    ${isRequest
      ? "bg-brand-magenta/20 border-brand-magenta/10 focus:ring-1 focus:ring-brand-magenta/20 focus:border-brand-magenta"
      : "bg-brand-teal/20 border-brand-teal/40 focus:ring-1 focus:ring-brand-teal/30 focus:border-brand-teal"
    }
    focus:outline-none transition-all duration-200`}
  placeholder="Description..."
  value={text}
  onChange={(e) => setText(e.target.value)}
/>
                {/* Buttons */}
                <div className="flex justify-center gap-4 m-3 ">
                    <button
                        onClick={onClose}
                        className={`w-64 p-3 rounded-xl backdrop-blur-md text-gray-800 font-semibold text-lg shadow-lg
                  ${cancelColor}
                    hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-200 ease-out`}>
                        Cancel
                    </button>

                    <button
                        onClick={async () => {
                            if (!text.trim()) return;


                            onSubmit(title, text);
                            onClose();
                        }}
                        className={`w-64 p-3 rounded-xl backdrop-blur-md text-gray-800 font-semibold text-lg shadow-lg
                      ${pinColor}
                      hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-200 ease-out`}>
                        Pin
                    </button>

                </div>

            </div>
        </div>
    );
}

'use client'

import { useState } from "react"

type EditProfilePopupProps = {
    name: string
    setName: (value: string) => void
    skills: string
    setSkills: (value: string) => void
    language: string
    setLanguage: (value: string) => void
    onClose: () => void
}

export default function EditProfilePopup({
    name,
    setName,
    skills,
    setSkills,
    language,
    setLanguage,
    onClose,
}: EditProfilePopupProps) {
    const [tempName, setTempName] = useState(name)
    const [tempSkills, setTempSkills] = useState(skills)
    const [tempLanguage, setTempLanguage] = useState(language)

    const handleSave = () => {
        setName(tempName)
        setSkills(tempSkills)
        setLanguage(tempLanguage)
        alert('Profile saved (locally)')
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
                <h2 className="text-xl font-bold">Edit Profile</h2>

                <label className="flex flex-col gap-1">
                    Name:
                    <input
                        value={tempName}
                        onChange={(e) => setTempName(e.target.value)}
                        className="border px-2 py-1 rounded"
                    />
                </label>

                <label className="flex flex-col gap-1">
                    Skills:
                    <input
                        value={tempSkills}
                        onChange={(e) => setTempSkills(e.target.value)}
                        className="border px-2 py-1 rounded"
                    />
                </label>

                <label className="flex flex-col gap-1">
                    Language:
                    <input
                        value={tempLanguage}
                        onChange={(e) => setTempLanguage(e.target.value)}
                        className="border px-2 py-1 rounded"
                    />
                </label>

                <div className="flex justify-end gap-2 mt-2">
                    <button
                        className="px-4 py-2 border rounded hover:bg-gray-100 transition"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 border rounded hover:bg-green-100 transition"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

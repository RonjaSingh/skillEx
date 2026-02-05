'use client'

import { useState } from "react"

type EditProfilePopupProps = {
    name: string
    setName: (value: string) => void
    skills: string[]
    setSkills: (value: string[]) => void
    language: string
    setLanguage: (value: string) => void
    profileImage: string | null
    setProfileImage: (value: string | null) => void
    onClose: () => void
}

export default function EditProfilePopup({
    name,
    setName,
    skills,
    setSkills,
    language,
    setLanguage,
    profileImage,
    setProfileImage,
    onClose,
}: EditProfilePopupProps) {
    const [tempName, setTempName] = useState(name)
    const [tempSkills, setTempSkills] = useState<string[]>(skills)
    const [newSkill, setNewSkill] = useState('')
    const [tempLanguage, setTempLanguage] = useState(language)
    const [tempProfileImage, setTempProfileImage] =
        useState<string | null>(profileImage)


    const handleSave = () => {
        setName(tempName)
        setSkills(tempSkills)
        setLanguage(tempLanguage)
        setProfileImage(tempProfileImage)
        alert('Profile saved (locally)')
        onClose()
    }

    const handleAddSkill = () => {
        const skill = newSkill.trim()
        if (!skill) return
        if (tempSkills.includes(skill)) return

        setTempSkills([...tempSkills, skill])
        setNewSkill('')
    }


    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
                <h2 className="text-xl font-bold">Edit Profile</h2>

                <label className="flex flex-col gap-2">
                    Profile Image
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                            {tempProfileImage ? (
                                <img
                                    src={tempProfileImage}
                                    alt="Profile preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-xs text-gray-500">No Image</span>
                            )}
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (!file) return

                                setTempProfileImage(URL.createObjectURL(file))
                            }}
                        />
                    </div>
                </label>
                
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

                    <div className="flex flex-wrap gap-2 mt-1">
                        {tempSkills.map((skill) => (
                            <span
                                key={skill}
                                className="bg-blue-200 px-2 py-1 rounded flex items-center gap-1"
                            >
                                {skill}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setTempSkills(tempSkills.filter((s) => s !== skill))
                                    }
                                    className="text-red-600 font-bold"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-2 mt-2">
                        <input
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            className="border px-2 py-1 rounded flex-1"
                            placeholder="Add a skill"
                        />
                        <button
                            type="button"
                            onClick={handleAddSkill}
                            className="px-4 py-1 border rounded"
                        >
                            Add
                        </button>
                    </div>
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

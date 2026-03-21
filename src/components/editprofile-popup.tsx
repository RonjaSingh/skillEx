'use client'

import { useState } from 'react'

type Props = {
  name: string
  setName: (val: string) => void
  skills: string[]
  setSkills: (val: string[]) => void
  languages: string[]
  setLanguages: (val: string[]) => void

  profileImage: string | null
  setProfileImage: (val: string | null) => void

  onSave: (name: string, skills: string[], languages: string[], profileImage: string | null) => Promise<void>
  onClose: () => void
}

export default function EditProfilePopup({ name, setName, skills, setSkills, languages, setLanguages, profileImage, setProfileImage, onSave, onClose }: Props) {
  const [tempName, setTempName] = useState(name)
  const [tempSkills, setTempSkills] = useState<string[]>(skills)
  const [tempLanguages, setTempLanguages] = useState<string[]>(languages)
  const [newSkill, setNewSkill] = useState('')
  const [newLang, setNewLang] = useState('')
  const [tempImage, setTempImage] = useState<string | null>(profileImage)


  //helferfunktion capitalize
  const capitalize = (text: string) => {
    if (!text) return ""
    const trimmed = text.trim()
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
  }

  const handleAddSkill = () => {
    const formatted = capitalize(newSkill)

    if (!formatted || tempSkills.includes(formatted)) return

    setTempSkills([...tempSkills, formatted])
    setNewSkill("")
  }

  const handleAddLang = () => {
    const formatted = capitalize(newLang)

    if (!formatted || tempLanguages.includes(formatted)) return

    setTempLanguages([...tempLanguages, formatted])
    setNewLang("")
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setTempImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }


  const handleSave = async () => {
    await onSave(tempName, tempSkills, tempLanguages, tempImage)
    setName(tempName)
    setSkills(tempSkills)
    setLanguages(tempLanguages)
    setProfileImage(tempImage)
    onClose()
  }

  return (
    <div className="fixed inset-0 backdrop-blur-xl flex items-center justify-center z-50">
      <div className="bg-white/30 p-6 rounded-2xl w-full max-w-md text-md text-gray-800 shadow-xl border border-white/10 space-y-5">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>




        <label className="flex flex-col gap-1 ">
          <strong>Name:</strong>
          <input value={tempName} onChange={(e) => setTempName(e.target.value)} className="px-3 py-2 rounded-xl flex-1 bg-white/20 focus:outline-none focus:ring-1 focus:ring-white/30 transition" />
        </label>

        <label className="flex flex-col gap-2">
          <div className="flex items-center gap-4 mt-1">
            {tempImage && (
              <img
                src={tempImage}
                className="w-24 h-24 rounded-full object-cover border"
              />
            )}
            <label className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/40 transition shadow-sm text-gray-800 cursor-pointer">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

          </div>
        </label>


        <label className="flex flex-col gap-2">
          <strong>Skills:</strong>

          <div className="flex gap-2">
            <input value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddSkill()
                }
              }}
              className=" px-3 py-2 rounded-xl flex-1 bg-white/20 focus:outline-none focus:ring-1 focus:ring-white/30 transition" placeholder="Add skill" />
            <button type="button" onClick={handleAddSkill} className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/40 transition shadow-sm text-gray-800">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
{tempSkills.map((s, index) => (
  <span
    key={`${s}-${index}`}
    className="bg-brand-blue/40 px-3 py-2 text-gray-800 rounded-full flex items-center gap-2 text-sm"
  >
    {s}
    <button
      type="button"
      onClick={() =>
        setTempSkills(tempSkills.filter((_, i) => i !== index))
      }
      className="text-xl cursor-pointer text-red-700"
    >
      ×
    </button>
  </span>
))}
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <strong>Languages:</strong>

          <div className="flex gap-2 ">
            <input value={newLang}
              onChange={(e) => setNewLang(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddLang()
                }
              }}
              className="px-3 py-2 rounded-xl flex-1 bg-white/20 focus:outline-none focus:ring-1 focus:ring-white/30 transition" placeholder="Add language" />
            <button type="button" onClick={handleAddLang} className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/40 transition shadow-sm text-gray-800">Add</button>
          </div>
          <div className="flex flex-wrap gap-2">
  {tempLanguages.map((l, index) => (
  <span
    key={`${l}-${index}`}
    className="bg-brand-blue/40 px-3 py-2 text-gray-800 rounded-full flex items-center gap-2 text-sm"
  >
    {l}
    <button
      type="button"
      onClick={() =>
        setTempLanguages(tempLanguages.filter((_, i) => i !== index))
      }
      className="text-xl cursor-pointer text-red-700"
    >
      ×
    </button>
  </span>
))}
          </div>
        </label>

        <div className="flex justify-center gap-3 mt-12">
          <button onClick={onClose} className="flex-1 px-4 py-2 rounded-xl bg-brand-magenta/50 hover:bg-brand-magenta/30 transition shadow-sm text-gray-800">Cancel</button>
          <button onClick={handleSave} className="flex-1 px-4 py-2 rounded-xl bg-brand-teal/50 hover:bg-brand-teal/30 transition shadow-sm text-gray-800">Save</button>
        </div>
      </div>
    </div>
  )
}

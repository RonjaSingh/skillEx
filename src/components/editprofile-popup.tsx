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


  const handleAddSkill = () => {
    const s = newSkill.trim()
    if (!s || tempSkills.includes(s)) return
    setTempSkills([...tempSkills, s])
    setNewSkill('')
  }

  const handleAddLang = () => {
    const l = newLang.trim()
    if (!l || tempLanguages.includes(l)) return
    setTempLanguages([...tempLanguages, l])
    setNewLang('')
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Edit Profile</h2>

        <label className="flex flex-col gap-1">
          Name:
          <input value={tempName} onChange={(e) => setTempName(e.target.value)} className="border px-2 py-1 rounded" />
        </label>

        <label className="flex flex-col gap-2">
          Profile Picture:
          <div className="flex items-center gap-4 mt-1">
            {tempImage && (
              <img
                src={tempImage}
                className="w-24 h-24 rounded-full object-cover border"
              />
            )}
            <label className="px-3 py-1 border rounded cursor-pointer hover:bg-gray-100">
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
          Skills:
          <div className="flex flex-wrap gap-2 mt-1">
            {tempSkills.map((s) => (
              <span key={s} className="bg-blue-200 px-2 py-1 rounded flex items-center gap-1">
                {s}
                <button type="button" onClick={() => setTempSkills(tempSkills.filter((x) => x !== s))} className="text-red-600 font-bold">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="border px-2 py-1 rounded flex-1" placeholder="Add skill" />
            <button type="button" onClick={handleAddSkill} className="px-4 py-1 border rounded">Add</button>
          </div>
        </label>

        <label className="flex flex-col gap-2">
          Languages:
          <div className="flex flex-wrap gap-2 mt-1">
            {tempLanguages.map((l) => (
              <span key={l} className="bg-green-200 px-2 py-1 rounded flex items-center gap-1">
                {l}
                <button type="button" onClick={() => setTempLanguages(tempLanguages.filter((x) => x !== l))} className="text-red-600 font-bold">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2 mt-2">
            <input value={newLang} onChange={(e) => setNewLang(e.target.value)} className="border px-2 py-1 rounded flex-1" placeholder="Add language" />
            <button type="button" onClick={handleAddLang} className="px-4 py-1 border rounded">Add</button>
          </div>
        </label>

        <div className="flex justify-end gap-2 mt-2">
          <button onClick={onClose} className="px-4 py-2 border rounded hover:bg-gray-100">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 border rounded hover:bg-green-100">Save</button>
        </div>
      </div>
    </div>
  )
}

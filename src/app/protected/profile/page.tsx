'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import EditProfilePopup from '@/components/editprofile-popup'
import useProfile from '@/hooks/use-profile'
import useProfileInit from '@/hooks/use-profile-init'

export default function ProfilePage() {
  
useProfileInit()

  const router = useRouter()
  const { name, setName, skills, setSkills, languages, setLanguages, saveProfile, loading } = useProfile()
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  if (loading) return <p>Loading...</p>

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{name || 'Username'}</h1>
        <button className="px-4 py-2 border rounded hover:bg-gray-100" onClick={() => setIsPopupOpen(true)}>Edit Profile</button>
      </div>

      <p><strong>Skills:</strong> {skills.join(', ')}</p>
      <p><strong>Languages:</strong> {languages.join(', ')}</p>
      <div className="flex items-center justify-between mt-4">
  <p><strong>Attended Sessions:</strong></p>
  <button
    onClick={() => router.push('/protected/sessions')}
    className="px-4 py-2 border rounded hover:bg-gray-100"
  >
    My Sessions
  </button>
</div>


      {isPopupOpen && (
        <EditProfilePopup
          name={name}
          setName={setName}
          skills={skills}
          setSkills={setSkills}
          languages={languages}
          setLanguages={setLanguages}
          onSave={saveProfile}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  )
}

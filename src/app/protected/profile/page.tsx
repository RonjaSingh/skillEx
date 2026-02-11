'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import EditProfilePopup from '@/components/editprofile-popup'
import useProfileInit from '@/hooks/use-profile-init'
import useProfile from '@/hooks/use-profile'

export default function ProfilePage() {
  const router = useRouter()

  useProfileInit()

  const {
    name,
    setName,
    skills,
    setSkills,
    language,
    setLanguage,
    loading
  } = useProfile()

  const [isPopupOpen, setIsPopupOpen] = useState(false)

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {name || 'Username'}
        </h1>

        <button
          className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          onClick={() => setIsPopupOpen(true)}
        >
          Edit Profile
        </button>
      </div>

      <div className="space-y-2">
        <p>
          <strong>Skills:</strong> {skills.join(', ')}
        </p>

        <p>
          <strong>Language:</strong> {language}
        </p>

        <div className="flex justify-between items-center mt-4">
          <strong>Attended Sessions:</strong>

          <button
            onClick={() => router.push('/protected/sessions')}
            className="px-4 py-2 border rounded hover:bg-gray-100 transition"
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
            language={language}
            setLanguage={setLanguage}
            onClose={() => setIsPopupOpen(false)}
          />
        )}
      </div>
    </div>
  )
}

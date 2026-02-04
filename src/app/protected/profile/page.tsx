'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import EditProfilePopup from '@/components/editprofile-popup'

export default function ProfilePage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [language, setLanguage] = useState('')

  const [isPopupOpen, setIsPopupOpen] = useState(false)


  return (
    <div className="max-w-xl mx-auto mt-10 p-4 space-y-6">

      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-bold">Profile</h1>
        {/* profil bearbeiten button */}
        <button className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          onClick={() => setIsPopupOpen(true)}>
          Edit Profile
        </button>
      </div>

      <div className="space-y-2">
        <p>
          <strong>Name:</strong>{name}
        </p>

        <p>
          <strong>Skills:</strong>{skills}
        </p>

        <p>
          <strong>Language:</strong>{language}
        </p>


        <div className="flex justify-between items-center mt-2">
          <p>
            <strong>Attended Sessions:</strong>
          </p>

          {/* session uebersicht button */}
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

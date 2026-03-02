'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import EditProfilePopup from '@/components/editprofile-popup'
import useProfile from '@/hooks/use-profile'
import useProfileInit from '@/hooks/use-profile-init'
import Calendar from './calendar'

export default function ProfilePage() {

  useProfileInit()

  const router = useRouter()
  const { name, setName, skills, setSkills, languages, setLanguages, profileImage, setProfileImage, saveProfile, loading } = useProfile()
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  if (loading) return <p>Loading...</p>

  return (
    <div className="max-w-2xl mx-auto mt-4 space-y-20 text-gray-800 font-semibold">

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-10">
          <h1 className="text-3xl"><strong>{name || 'Username'}</strong></h1>

          {profileImage ? (
            <img
              src={profileImage}
              className="w-16 h-16 rounded-full object-cover border"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-lg font-bold ">
              <span className="text-lg">👤</span>
            </div>
          )}
        </div>

        <button className="ml-auto w-64 p-3 rounded-xl bg-white/25 backdrop-blur-md text-gray-800 font-semibold text-lg shadow-lg border border-white/30 hover:bg-white/35 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-200 ease-out ml-auto" onClick={() => setIsPopupOpen(true)}>Edit Profile</button>
      </div>

      <p className="text-xl m-2 gap-3"><strong>My Skills:</strong>{skills.join(', ')}</p>
      <p className="text-xl m-2 mt-10 flex gap-3"><strong>Languages I speak:</strong> {languages.join(', ')}</p>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xl m-2 mt-10"><strong>Attended Sessions:</strong></p>

        <button
          onClick={() => router.push('/protected/sessions')}
          className="w-64 p-3 rounded-xl bg-white/25 backdrop-blur-md text-gray-800 font-semibold text-lg shadow-lg border border-white/30 hover:bg-white/35 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-200 ease-out"
        >
          My Sessions
        </button>
      </div>
      <p className="text-xl underline m-2"><strong>My Calender</strong></p>
      <Calendar />

      {isPopupOpen && (
        <EditProfilePopup
          name={name}
          setName={setName}
          skills={skills}
          setSkills={setSkills}
          languages={languages}
          setLanguages={setLanguages}
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          onSave={saveProfile}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  )
}

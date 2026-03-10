'use client'

import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
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
  const [showWelcome, setShowWelcome] = useState(false)


  useEffect(() => {
    const checkFirstLogin = async () => {
      const supabase = createClient()

      const { data: authData } = await supabase.auth.getUser()
      const user = authData.user
      if (!user) return

      const { data } = await supabase
        .from('user')
        .select('first_login')
        .eq('id', user.id)
        .single()

      if (data?.first_login) {
        setShowWelcome(true)

        await supabase
          .from('user')
          .update({ first_login: false })
          .eq('id', user.id)
      }
    }

    checkFirstLogin()
  }, [])



  if (loading) return <p>Loading...</p>


  return (
    <div className="max-w-7xl mx-auto mt-0 space-y-8 text-gray-800 font-semibold">


      {showWelcome && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="relative bg-brand-mint/70 text-xl text-brand-purple text-shadow-sm px-12 pb-16 pt-16 leading-loose rounded-xl text-center shadow-md max-w-xl w-full">

            <button
              onClick={() => setShowWelcome(false)}
              className="absolute top-6 right-8 hover:text-brand-magenta text-2xl"
            >
              ✕
            </button>
            Hi {name}! 👋 <br />
            Welcome to SkillExchange! <br />
            Start connecting with others & sharing your knowledge!<br />

            <div className="flex justify-center gap-10 mt-10 flex-wrap">
              <div className="relative group">
                <Link
                  href="/protected"
                  className="px-8 py-2 mb-4 text-lg rounded-xl backdrop-blur-md shadow hover:bg-brand-magenta/20 transition"
                >
                  Show Board
                </Link>

                <div className="absolute top-full left-1/2 -translate-x-1/2 
  opacity-0 group-hover:opacity-100 transition-all duration-200
  z-50
  bg-white/20 backdrop-blur-md text-magenta text-sm 
  px-4 py-1 rounded-xl shadow-lg w-max max-w-xs text-center">

                  Explore the board, discover sessions and connect with others.

                </div>
              </div>
              <div className="relative group">
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="px-8 py-2 mb-4 text-lg rounded-xl backdrop-blur-md shadow hover:bg-brand-magenta/20 transition"
                >
                  Edit Profile
                </button>

                <div className="absolute top-full mt-0 left-1/2 -translate-x-1/2 
  opacity-0 group-hover:opacity-100 transition-all duration-200
  z-50
  bg-white/20 backdrop-blur-md text-magenta text-sm 
  px-4 py-1 rounded-xl shadow-lg w-max max-w-xs text-center">
                  Update your profile so others can learn more about you.

                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      <div className="py-2 text-center bg-white/15 backdrop-blur shadow-md p-8 rounded-full">

        <div className="flex items-center justify-center gap-12">
          <h1 className="text-2xl font-semibold">
            {name || "Username"}
          </h1>
          {profileImage ? (
            <img
              src={profileImage}
              className="w-20 h-20 rounded-full object-cover border"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
              👤
            </div>
          )}

        </div>


      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 relative">

        <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 h-full w-px bg-white/25" />

        <div className="space-y-10">

          <div className="bg-white/15 backdrop-blur rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-center py-2 text-center  backdrop-blur shadow-sm p-8 rounded-full">My Skills</h2>

            <p className="text-lg text-gray-700 text-center mb-4">{skills.length > 0 ? skills.join(', ') : "-"}</p>
          </div>

          <div className="bg-white/15 backdrop-blur rounded-2xl shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 text-center py-2 text-center  backdrop-blur shadow-sm p-8 rounded-full">Languages I Speak</h2>

            <p className="text-lg mb-4 text-gray-700 text-center">{languages.length > 0 ? languages.join(', ') : "-"}</p>
          </div>

          <div className="bg-white/15 backdrop-blur rounded-2xl shadow-md p-6 mb-4">
            <h2 className="text-lg font-semibold mb-4 text-center py-2 text-center backdrop-blur shadow-sm p-8 rounded-full">
              Attended Sessions
            </h2>

            <div className="flex items-center justify-center gap-8 ">

              <p className="text-lg text-gray-700 mb-4">
                No sessions yet
              </p>

              <button
                onClick={() => router.push('/protected/sessions')}
                className="px-8 py-2 mb-4 text-lg rounded-xl backdrop-blur-md shadow shadow-sm hover:bg-white/20 transition"
              >
                My Sessions
              </button>
            </div>
          </div>


          <button
            onClick={() => setIsPopupOpen(true)}
            className="w-full px-6 py-3 mt-12 text-center text-lg rounded-xl bg-white/20 backdrop-blur-md shadow hover:bg-white/40 transition"
          >
            Edit Profile
          </button>


        </div>


        <div className="flex items-start justify-center">
          <div className="w-full">
            <Calendar />

          </div>
        </div>
      </div>
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

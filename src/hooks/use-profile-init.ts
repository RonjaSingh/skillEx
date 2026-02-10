'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function useProfileInit() {
  const [name, setName] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [language, setLanguage] = useState('')
  const [profileImage, setProfileImage] = useState<string | null>(null)

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient()

      // Auth User holen
      const { data: authData } = await supabase.auth.getUser()
      const user = authData.user
      if (!user) return

      //  Profil aus DB holen
      const { data: profile, error } = await supabase
        .from('user')
        .select('*')
        .eq('id', user.id)
        .maybeSingle()

      // Profil erstellen, falls noch nicht vorhanden
      if (!profile) {
        const { data: newProfile } = await supabase
          .from('user')
          .insert({ id: user.id, email: user.email, name: '' })
          .select('*')
          .maybeSingle()

        if (newProfile) setName(newProfile.name)
        return
      }

      //  State setzen
      setName(profile.name)
      // später: setSkills(profile.skills), 
      // setLanguage(profile.language)
    }

    loadProfile()
  }, [])

  return { name, setName, skills, setSkills, language, setLanguage, profileImage, setProfileImage }
}

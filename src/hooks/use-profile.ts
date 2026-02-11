'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function useProfile() {
  const [name, setName] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [language, setLanguage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient()

      const { data: authData } = await supabase.auth.getUser()
      const user = authData.user
      if (!user) return

      const { data } = await supabase
        .from('user')
        .select(`
          name,
          user_skills (
            skills ( name )
          ),
          user_language (
            language ( name )
          )
        `)
        .eq('id', user.id)
        .single()

      if (!data) return

      const profile = data as any

      setName(profile.name ?? '')

      const loadedSkills =
        profile.user_skills?.map((s: any) => s.skills?.name) ?? []

      setSkills(loadedSkills)

      const loadedLanguage =
        profile.user_language?.[0]?.language?.name ?? ''

      setLanguage(loadedLanguage)

      setLoading(false)
    }

    loadProfile()
  }, [])

  return {
    name,
    setName,
    skills,
    setSkills,
    language,
    setLanguage,
    loading
  }
}

'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function useProfile() {
  const [name, setName] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [averageRating, setAverageRating] = useState<number | null>(null)
  const [ratingCount, setRatingCount] = useState<number>(0)
  const [attendedSessionsCount, setAttendedSessionsCount] = useState(0)


  useEffect(() => {
    const loadProfile = async () => {
      const supabase = createClient()

      // Auth User holen
      const { data: authData } = await supabase.auth.getUser()
      const user = authData.user
      if (!user) {
        setLoading(false)
        return
      }
  // Rating Data Laden
    const { data: ratingData } = await (supabase as any)
   .from('user_rating_summary')
   .select('average_rating, rating_count')
   .eq('user_id', user.id)
   .maybeSingle()

    setAverageRating(ratingData?.average_rating ?? null)
    setRatingCount(ratingData?.rating_count ?? 0)

      // Name laden
      const { data: profile } = await supabase
        .from('user')
        .select('*')
        .eq('id', user.id)
        .single()

      setName(profile?.name || '')

      // Profilbild laden
      setProfileImage(profile?.profile_image || null)


      // Skills laden
      const { data: skillData } = await supabase
        .from('user_skills')
        .select('skills(name)')
        .eq('user_id', user.id)

   setSkills(
  [...new Set(skillData?.map((s: any) => s.skills.name) || [])]
)

      // Languages laden
      const { data: langData } = await supabase
        .from('user_language')
        .select('language(name)')
        .eq('user_id', user.id)

      setLanguages(
  [...new Set(langData?.map((l: any) => l.language.name) || [])]
)
      
      
      // Anzahl besuchter Sessions laden
      const { data: sessionData } = await supabase
      .from('session')
      .select('session_id')
      .or(`student_user_id.eq.${user.id},teacher_user_id.eq.${user.id}`)
      .eq('status', 'completed')

      setAttendedSessionsCount(sessionData?.length ?? 0)

      setLoading(false)
    }

    loadProfile()
  }, [])


  const saveProfile = async (newName: string, newSkills: string[], newLanguages: string[], newProfileImage: string | null) => {
    const supabase = createClient()
    const { data: authData } = await supabase.auth.getUser()
    const user = authData.user
    if (!user) return

    // Name speichern + profileimage
    await supabase
      .from('user')
      .update({ name: newName, profile_image: newProfileImage })
      .eq('id', user.id)

    // Skills speichern
    // Alte Skills löschen
    await supabase.from('user_skills').delete().eq('user_id', user.id)

    // Neue Skills einfügen
    for (const skillName of newSkills) {
      if (!skillName) continue // leeren Wert überspringen

      // Prüfen, ob Skill existiert
      let { data: skill } = await supabase
        .from('skills')
        .select('*')
        .eq('name', skillName)
        .maybeSingle()

      // Skill ggf. erstellen
      if (!skill) {
        const { data: newSkill } = await supabase
          .from('skills')
          .insert({ name: skillName })
          .select('*')
          .single()
        skill = newSkill
      }

      // Nur einfügen, wenn skill wirklich existiert
      if (skill?.skill_id) {
        await supabase.from('user_skills').insert({
          user_id: user.id,
          skill_id: skill.skill_id
        })
      }
    }

    // Alte Languages löschen
    await supabase.from('user_language').delete().eq('user_id', user.id)

    // Neue Languages einfügen
    for (const langName of newLanguages) {
      if (!langName) continue

      let { data: lang } = await supabase
        .from('language')
        .select('*')
        .eq('name', langName)
        .maybeSingle()

      if (!lang) {
        const { data: newLang } = await supabase
          .from('language')
          .insert({ name: langName })
          .select('*')
          .single()
        lang = newLang
      }

      if (lang?.id) {
        await supabase.from('user_language').insert({
          user_id: user.id,
          language_id: lang.id
        })
      }
    }


    // State aktualisieren
    setName(newName)
    setSkills(newSkills)
    setLanguages(newLanguages)
    setProfileImage(newProfileImage)
  }

  return {
    name,
  setName,
  skills,
  setSkills,
  languages,
  setLanguages,
  profileImage,
  setProfileImage,
  averageRating,
  ratingCount,
  attendedSessionsCount,
  loading,
  saveProfile
  }
}

'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function useProfile() {
  const [name, setName] = useState('')
  const [skills, setSkills] = useState<string[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

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

      // Name laden
      const { data: profile } = await supabase
        .from('user')
        .select('*')
        .eq('id', user.id)
        .single()

      setName(profile?.name || '')

      // Skills laden
      const { data: skillData } = await supabase
        .from('user_skills')
        .select('skills(name)')
        .eq('user_id', user.id)

      setSkills(skillData?.map((s: any) => s.skills.name) || [])

      // Languages laden
      const { data: langData } = await supabase
        .from('user_language')
        .select('language(name)')
        .eq('user_id', user.id)

      setLanguages(langData?.map((l: any) => l.language.name) || [])

      setLoading(false)
    }

    loadProfile()
  }, [])


  const saveProfile = async (newName: string, newSkills: string[], newLanguages: string[]) => {
    const supabase = createClient()
    const { data: authData } = await supabase.auth.getUser()
    const user = authData.user
    if (!user) return

    // Name speichern
    await supabase
      .from('user')
      .update({ name: newName })
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
  }

  return { name, setName, skills, setSkills, languages, setLanguages, loading, saveProfile }
}

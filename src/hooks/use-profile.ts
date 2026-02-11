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


            const { data } = await supabase.auth.getUser()
            const user = data.user

            if (!user) {
                setLoading(false)
                return
            }

            const { data: profile } = await supabase
                .from('user')
                .select('*')
                .eq('id', user.id)
                .single()

            if (profile) {
                setName(profile.name ?? '')
                setSkills(profile.skills ?? [])
                setLanguage(profile.language ?? '')
            }

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

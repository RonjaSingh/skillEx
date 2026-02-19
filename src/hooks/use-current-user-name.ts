import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export const useCurrentUserName = () => {
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfileName = async () => {
      const supabase = createClient()

     
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setName('?')
        return
      }

    
      const { data: profile, error } = await supabase
        .from('user')
        .select('name')
        .eq('id', user.id)
        .single()

      if (error) {
        console.error(error)
        setName('?')
        return
      }

      setName(profile?.name || '?')
    }

    fetchProfileName()
  }, [])

  return name || '?'
}

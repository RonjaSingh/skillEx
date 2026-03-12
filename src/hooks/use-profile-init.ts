'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from 'lucide-react'

export default function useProfileInit() {

  useEffect(() => {
    const init = async () => {
      const supabase = createClient()

      const { data } = await supabase.auth.getUser()
      const user = data.user

      if (!user) return

      const { data: profile } = await supabase
        .from('user')
        .select('id, name')
        .eq('id', user.id)
        .maybeSingle()

  if (!profile) {
  await supabase.from('user').insert({
    id: user.id,
    email: user.email
  } as any)
}
    }

    init()
  }, [])
}

'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function NotificationBell() {
  const supabase = createClient()
  const router = useRouter()
  const [count, setCount] = useState(0)

  const loadNotifications = useCallback(async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError || !userData?.user) {
      setCount(0)
      return
    }

    const { count: pendingCount, error } = await supabase
      .from('session_request')
      .select('*', { count: 'exact', head: true })
      .eq('request_to_user_id', userData.user.id)
      .eq('status', 'pending')

    if (!error) {
      setCount(pendingCount ?? 0)
    }
  }, [supabase])

  useEffect(() => {
    loadNotifications()

    const interval = setInterval(loadNotifications, 10000)

    return () => clearInterval(interval)
  }, [loadNotifications])

  return (
    <div
      onClick={() => router.push('/protected/sessions')}
      className="relative cursor-pointer flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
       
        viewBox="0 0 24 24"
         fill="currentColor"
        className={`w-10 h-12 transition ${
          count > 0 ? 'text-brand-magenta' : 'text-brand-blue/80'
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 17h5l-1.405-1.405C18.21 15.21 18 14.714 18 14V11a6 6 0 10-12 0v3c0 .714-.21 1.21-.595 1.595L4 17h5m6 0a3 3 0 11-6 0"
        />
      </svg>

      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-brand-blue/80 text-white text-sm font-bold px-2 py-0.5 rounded-full shadow-md">
          {count}
        </span>
      )}
    </div>
  )
}
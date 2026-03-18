'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function NotificationBell() {
  const supabase = createClient()
  const router = useRouter()
  const [count, setCount] = useState(0)

  const [callCountdown, setCallCountdown] = useState<number | null>(null)
  const [isUrgent, setIsUrgent] = useState(false)

  const loadNotifications = useCallback(async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError || !userData?.user) {
      setCount(0)
      setCallCountdown(null)
      setIsUrgent(false)
      return
    }

    const userId = userData.user.id

    // bell pending Requests
    const { count: pendingCount, error } = await supabase
      .from('session_request')
      .select('*', { count: 'exact', head: true })
      .eq('request_to_user_id', userId)
      .eq('status', 'pending')

    if (!error) {
      setCount(pendingCount ?? 0)
    }

    // call Accepted Sessions prüfen
    const { data: sessions } = await supabase
      .from('session')
      .select('start_time')
      .or(`teacher_user_id.eq.${userId},student_user_id.eq.${userId}`)
      .eq('status', 'accepted')

    if (!sessions) return

    const now = new Date()

    let nextSession: number | null = null
    let urgent = false

    sessions.forEach((s) => {
      const start = new Date(s.start_time)

      const diffMinutes = Math.floor((start.getTime() - now.getTime()) / 60000)

      // session läuft oder max 30 Minuten nach Start
      if (diffMinutes <= 0 && diffMinutes >= -30) {
        nextSession = 0
        urgent = true
        return
      }

      // session startet in 5 minuten
      if (diffMinutes > 0) {
        if (nextSession === null || diffMinutes < nextSession) {
          nextSession = diffMinutes
          urgent = diffMinutes <= 5
        }
      }
    })

    setCallCountdown(nextSession)
    setIsUrgent(urgent)

  }, [supabase])

  useEffect(() => {
    loadNotifications()

    const interval = setInterval(loadNotifications, 10000)

    return () => clearInterval(interval)
  }, [loadNotifications])



  return (
    <div className="flex items-center gap-3">

      {/* bell emoji */}
      <div
        onClick={() => router.push('/protected/sessions')}
        className="relative cursor-pointer flex items-center justify-center w-12 h-12 rounded-full hover:bg-white/10 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-10 h-12 transition ${count > 0 ? 'text-brand-magenta' : 'text-brand-blue/80'
            }`}
        >
          <path d="M15 17h5l-1.405-1.405C18.21 15.21 18 14.714 18 14V11a6 6 0 10-12 0v3c0 .714-.21 1.21-.595 1.595L4 17h5m6 0a3 3 0 11-6 0" />
        </svg>

        {count > 0 && (
          <span className="absolute -top-1 -right-1 bg-brand-blue/80 text-white text-sm font-bold px-2 py-0.5 rounded-full shadow-md">
            {count}
          </span>
        )}
      </div>

      {/* emoji for call */}
      {callCountdown !== null && (
        <div
          onClick={() => router.push('/protected/sessions')}
          className="relative cursor-pointer flex flex-col items-center justify-center w-10"
        >
          <span
            className={`text-xl mt-2  transition ${isUrgent
              ? 'scale-125 animate-pulse'
              : 'opacity-50'
              }`}
          >
            🎧
          </span>

          <span
            className={`text-xs font-bold -mt-1 ${isUrgent ? 'text-red-700' : 'text-gray-400'
              }`}
          >
            {callCountdown === 0 ? 'now' : `${callCountdown}m`}
          </span>
        </div>
      )}

    </div>
  )
}
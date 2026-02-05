'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

type SessionRow = {
  id: string
  start_time: string
  title: string
  name: string
  message?: string
}

export default function SessionsPage() {
  const supabase = createClient()

  const [requests, setRequests] = useState<SessionRow[]>([])
  const [upcoming, setUpcoming] = useState<SessionRow[]>([])
  const [past, setPast] = useState<SessionRow[]>([])

  useEffect(() => {
    loadSessions()
  }, [])

    async function loadSessions() {
    const now = new Date().toISOString()

    const { data } = await supabase
      .from('session_request')
      .select(`
        session_request_id,
        status,
        availability(start_time),
        advertisement(title),
        user!session_request_request_from_user_id_fkey(name)
      `)

    if (!data) return

    const mapped = data.map((s: any) => ({
      id: s.session_request_id,
      start_time: s.availability?.start_time,
      title: s.advertisement?.title,
      name: s.user?.name,
      status: s.status
    }))

   
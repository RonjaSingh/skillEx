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

  
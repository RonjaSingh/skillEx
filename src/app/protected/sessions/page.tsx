
'use client'
import { useEffect, useState } from 'react'
import SessionBox from '@/components/sessionbox'
import SessionRow from '@/components/sessionrow'
import { createClient } from '@/lib/supabase/client'
import {
  getIncomingRequests,
  getOutgoingRequests,
  getCompletedSessions
} from '@/lib/supabase/sessionQueries'

const supabase = createClient()

export default function SessionsPage() {
  const [incoming, setIncoming] = useState<any[]>([])
  const [outgoing, setOutgoing] = useState<any[]>([])
  const [completed, setCompleted] = useState<any[]>([])

  useEffect(() => {
    loadData()
  }, [])

    async function loadData() {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData.user?.id
    if (!userId) return

    const incomingRes = await getIncomingRequests(userId)
    const outgoingRes = await getOutgoingRequests(userId)
    const completedRes = await getCompletedSessions(userId)

    setIncoming(incomingRes.data || [])
    setOutgoing(outgoingRes.data || [])
    setCompleted(completedRes.data || [])
  }
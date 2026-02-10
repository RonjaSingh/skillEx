'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import SessionBox from '@/components/session-box'


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

   
    setRequests(mapped.filter(s => s.status === 'open'))

    setUpcoming(
      mapped.filter(
        s => s.status === 'accepted' && s.start_time > now
      )
    )

    setPast(
      mapped.filter(
        s => s.status === 'accepted' && s.start_time < now
      )
    )
  }


async function updateStatus(id: string, status: 'accepted' | 'rejected') {
    await supabase
      .from('session_request')
      .update({ status })
      .eq('session_request_id', id)

    loadSessions()
  }

  async function cancelSession(id: string) {
    await supabase
      .from('session_request')
      .update({ status: 'rejected' })
      .eq('session_request_id', id)

    loadSessions()
  }


  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">

      <h1 className="text-2xl font-bold">Sessions</h1>

      <SessionBox
        title="Session Requests"
        data={requests}
        showAcceptReject
        onAccept={(id) => updateStatus(id, 'accepted')}
        onReject={(id) => updateStatus(id, 'rejected')}
      />

      <SessionBox
        title="Upcoming Sessions"
        data={upcoming}
        showCancel
        onCancel={cancelSession}
      />

      <SessionBox
        title="Past Sessions"
        data={past}
        showRate
      />
    </div>
  )
}
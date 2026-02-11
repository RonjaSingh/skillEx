
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

   return (
    <div className="max-w-4xl mx-auto mt-6 space-y-6">

      <SessionBox title="Session Requests">
        {incoming.map((s) => (
          <SessionRow
            key={s.session_request_id}
            date={new Date(s.created_at).toLocaleString()}
            topic={s.advertisement?.title}
            name={s.request_from_user?.name}
            actions={
              <>
                <button className="px-2 py-1 border rounded bg-green-100">Accept</button>
                <button className="px-2 py-1 border rounded bg-red-100">Reject</button>
              </>
            }
          />
        ))}
      </SessionBox>

      <SessionBox title="Upcoming Sessions">
        {outgoing.map((s) => (
          <SessionRow
            key={s.session_request_id}
            date={new Date(s.created_at).toLocaleString()}
            topic={s.advertisement?.title}
            name={s.request_to_user?.name}
            actions={
              <button className="px-2 py-1 border rounded bg-red-100">Cancel</button>
            }
          />
        ))}
      </SessionBox>

      <SessionBox title="Completed Sessions">
        {completed.map((s) => (
          <SessionRow
            key={s.session_id}
            date={new Date(s.start_time).toLocaleString()}
            topic={s.advertisement?.title}
            name={
              s.teacher?.id === s.currentUserId
                ? s.student?.name
                : s.teacher?.name
            }
            actions={
              <button className="px-2 py-1 border rounded bg-yellow-100">
                Rate ⭐
              </button>
            }
          />
        ))}
      </SessionBox>

    </div>
  )
}
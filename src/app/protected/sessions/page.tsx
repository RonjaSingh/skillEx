
'use client'
import { useEffect, useState } from 'react'
import SessionBox from '@/components/sessionbox'
import SessionRow from '@/components/sessionrow'
import { createClient } from '@/lib/supabase/client'
import {
  getIncomingRequests,
  getOutgoingRequests,
  getCompletedSessions,
  getAcceptedRequests,
  /*getActiveSessions*/
} from '@/lib/supabase/sessionQueries'

const supabase = createClient()

export default function SessionsPage() {
  const [incoming, setIncoming] = useState<any[]>([])
  const [outgoing, setOutgoing] = useState<any[]>([])
  const [completed, setCompleted] = useState<any[]>([])
  const [accepted, setAccepted] = useState<any[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  /*const [active, setActive] = useState<any[]>([])*/


  useEffect(() => {
    loadData()
  }, [])

    async function loadData() {
    const { data: userData } = await supabase.auth.getUser()
    const userId = userData.user?.id
    if (!userId) return
    setUserId(userId)

    const incomingRes = await getIncomingRequests(userId)
    const outgoingRes = await getOutgoingRequests(userId)
    const completedRes = await getCompletedSessions(userId)
    const acceptedRes = await getAcceptedRequests(userId)
    /*const activeRes = await getActiveSessions(userId)*/

    setIncoming(incomingRes.data || [])
    setOutgoing(outgoingRes.data || [])
    setCompleted(completedRes.data || [])
    setAccepted(acceptedRes.data || [])
    /*setActive(activeRes.data || [])*/
    
  }

   /*async function updateRequestStatus(id: string, status: 'accepted' | 'rejected' | 'cancelled') {
    await supabase
      .from('session_request')
      .update({ status })
      .eq('session_request_id', id)

    loadData()
  }*/
 async function updateRequestStatus(
  id: string,
  status: 'accepted' | 'rejected' | 'cancelled'
) {
  const { data, error } = await supabase
    .from('session_request')
    .update({ status })
    .eq('session_request_id', id)

  console.log('update result:', data)
  console.error('update error:', error)

  if (!error) loadData()
}

  async function updateDescription(id: string, newDescription: string) {
    await supabase
    .from('session_request')
    .update({ description: newDescription })
    .eq('session_request_id', id)

    loadData()
}


   return (
    <div className="max-w-7xl mx-auto m-0 p-4 space-y-10">

      <SessionBox  title="Incoming Session Requests">
        {incoming.map((s) => (
          <SessionRow
            key={s.session_request_id}
            date={new Date(s.created_at).toLocaleString()}
            topic={s.advertisement?.title}
            name={s.request_from_user?.name}
            description={s.description}
            actions={
              <>
                <button
                  onClick={() => updateRequestStatus(s.session_request_id, 'accepted')}
                  className="px-2 py-1 border rounded bg-green-100"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateRequestStatus(s.session_request_id, 'rejected')}
                  className="px-2 py-1 border rounded bg-red-100"
                >
                  Reject
                </button>
              </>
            }
          />
        ))}
      </SessionBox>

      <SessionBox title="Upcoming Sessions">
      {accepted.map((s) => {

      const otherUser =
      s.teacher_user_id === userId
        ? s.student?.name
        : s.teacher?.name

      return (
      <SessionRow
        key={s.session_id}
        date={new Date(s.start_time).toLocaleString()}
        topic={s.advertisement?.title}
        description={s.description}
        name={otherUser}
        actions={
          <button onClick={() =>
                updateRequestStatus(s.request_id, 'cancelled')
              }className="px-2 py-1 border rounded bg-red-100">
            Cancel
          </button>
        }
      />
    )
    })}
    </SessionBox>

      <SessionBox title="Outgoing Session Requests">
        {outgoing.map((s) => (
    <SessionRow
      key={s.session_request_id}
      date={new Date(s.created_at).toLocaleString()}
      topic={s.advertisement?.title}
      name={s.request_to_user?.name}
      description={s.description}
      editable={s.status === 'pending'}
      onSave={(text) => updateDescription(s.session_request_id, text)}
      actions={
        <div className="flex gap-2 items-center">
          <span className="text-sm px-2 py-1 border rounded bg-gray-100">
            {s.status}
          </span>

          {s.status === 'pending' && (
            <button
              onClick={() =>
                updateRequestStatus(s.session_request_id, 'cancelled')
              }
              className="px-2 py-1 border rounded bg-red-100"
            >
              Cancel
            </button>
          )}
        </div>
      }
    />
  ))}
      </SessionBox>

{/*<SessionBox title="Active Sessions">
  {active.map((s) => {
    const otherUser =
      s.teacher_user_id === userId
        ? s.student?.name
        : s.teacher?.name

    return (
      <SessionRow
        key={s.session_id}
        date={new Date(s.start_time).toLocaleString()}
        topic={s.advertisement?.title}
        name={otherUser}
        actions={
          <span className="px-2 py-1 bg-green-100 rounded">
            Live
          </span>
        }
      />
    )
  })}
</SessionBox>*/}

    

      <SessionBox title="Completed Sessions">
        {completed.map((s) => {
          const otherUserName =
            s.teacher_user_id === userId
              ? s.student?.name
              : s.teacher?.name

          return (
            <SessionRow
              key={s.session_id}
              date={new Date(s.start_time).toLocaleString()}
              topic={s.advertisement?.title}
              name={otherUserName}
              description={s.description}
              actions={
                <button className="px-2 py-1 border rounded bg-yellow-100">
                  Rate Session 
                </button>
              }
            />
          )
        })}
      </SessionBox>

    </div>
  )
}
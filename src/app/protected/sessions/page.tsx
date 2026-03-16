
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
  const [hoverRating, setHoverRating] = useState<Record<string, number>>({})
  const [selectedRating, setSelectedRating] = useState<Record<string, number>>({})
  const [ratings, setRatings] = useState<Record<string, number>>({})
  /*const [active, setActive] = useState<any[]>([])*/

    const sessionUserMap: Record<string, string> = {}

  completed.forEach((s) => {
    if (!userId) return

    const otherUserId =
      s.teacher_user_id === userId
        ? s.student_user_id
        : s.teacher_user_id

    sessionUserMap[s.session_id] = otherUserId
  })



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

  /* Ratings des aktuellen Users laden */
  const ratingsRes = await supabase
    .from('rating')
    .select('session_id, stars')
    .eq('reviewer_user_id', userId)

  /* Map bauen: session_id -> stars */
  const ratingMap: Record<string, number> = {}

  ratingsRes.data?.forEach((r) => {
    ratingMap[r.session_id] = r.stars
  })

  setIncoming(incomingRes.data || [])
  setOutgoing(outgoingRes.data || [])
  setCompleted(completedRes.data || [])
  setAccepted(acceptedRes.data || [])

  setRatings(ratingMap)
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


async function handleRating(session: any, stars: number) {

  const reviewedUserId =
    session.teacher_user_id === userId
      ? session.student_user_id
      : session.teacher_user_id

  const success = await submitRating(session.session_id, reviewedUserId, stars)

  if (success) {
    setRatings((prev) => ({
      ...prev,
      [session.session_id]: stars
    }))
  }
}


async function submitRating(
  sessionId: string,
  reviewedUserId: string,
  stars: number,
  comment?: string
) {
  if (!userId) return false

  const { error } = await supabase
    .from('rating')
    .insert([
      {
        session_id: sessionId,
        reviewer_user_id: userId,
        reviewed_user_id: reviewedUserId,
        stars,
        comment: comment || null
      }
    ])

  if (error) {
    console.error("Rating insert error:", error)
    return false
  }

  return true
}


   return (
    <div className="max-w-7xl mx-auto m-0 p-4 space-y-10">

      <SessionBox  title="Incoming Session Requests">
        {incoming.map((s) => (
          <SessionRow
            key={s.session_request_id}
            date={s.availability
    ? `${new Date(s.availability.start_time).toLocaleString()} - ${new Date(s.availability.end_time).toLocaleTimeString()}`
    : 'No time selected'}
            topic={s.advertisement?.title ?? 'Direct request'}
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
        date={s.availability
    ? `${new Date(s.availability.start_time).toLocaleString()} - ${new Date(s.availability.end_time).toLocaleTimeString()}`
    : 'No time selected'}
        topic={s.advertisement?.title ?? 'Direct request'}
        description={s.description}
        name={otherUser}
        actions={
          <button onClick={() =>
                updateRequestStatus(s.session_request_id, 'cancelled')
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
      date={s.availability
    ? `${new Date(s.availability.start_time).toLocaleString()} - ${new Date(s.availability.end_time).toLocaleTimeString()}`
    : 'No time selected'}
      topic={s.advertisement?.title ?? 'Direct request'}
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
              date={s.availability
    ? `${new Date(s.availability.start_time).toLocaleString()} - ${new Date(s.availability.end_time).toLocaleTimeString()}`
    : 'No time selected'}
              topic={s.advertisement?.title ?? 'Direct request'}
              name={otherUserName}
              description={s.description}
              actions={
             <div className="flex gap-1 items-center">
  <span className="mr-2 text-sm">Rate:</span>

{[1,2,3,4,5].map((n) => {
  const active =
    hoverRating[s.session_id] >= n ||
    ratings[s.session_id] >= n

  return (
    <button
      key={n}
      type="button"
      onMouseEnter={() =>
        setHoverRating((prev) => ({ ...prev, [s.session_id]: n }))
      }
      onMouseLeave={() =>
        setHoverRating((prev) => ({ ...prev, [s.session_id]: 0 }))
      }
      onClick={() => handleRating(s, n)}
      disabled={ratings[s.session_id] !== undefined}
      className={`text-xl cursor-pointer ${
        active ? "text-yellow-500" : "text-gray-400"
      }`}
    >
      ★
    </button>
  )
})}
</div>
                }
            />
          )
        })}
      </SessionBox>

    </div>
  )
}
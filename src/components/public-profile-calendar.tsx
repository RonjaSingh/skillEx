'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Slot {
  availability_id: string
  user_id: string
  start_time: string
  end_time: string
  is_booked: boolean
}

export default function PublicProfileCalendar({
  profileUserId
}: {
  profileUserId: string
}) {

  const supabase = createClient()

  const [slots, setSlots] = useState<Slot[]>([])
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'month' | 'day'>('month')
  const [currentDate] = useState(new Date())

  const [requestingSlot, setRequestingSlot] = useState<Slot | null>(null)
  const [description, setDescription] = useState('')
  const [advertisementId, setAdvertisementId] = useState<string | null>(null)

  /* Slots laden */

  useEffect(() => {
    loadSlots()
    loadAdvertisement()
  }, [])

  const loadSlots = async () => {

    const { data } = await supabase
      .from('availability')
      .select('*')
      .eq('user_id', profileUserId)
      .order('start_time')

    if (data) setSlots(data as Slot[])
  }

  /* Advertisement des Users laden */

  const loadAdvertisement = async () => {

    const { data } = await supabase
      .from('advertisement')
      .select('advertisement_id')
      .eq('user_id', profileUserId)
      .limit(1)
      .single()

    if (data) setAdvertisementId(data.advertisement_id)
  }

  /* Request senden */

  const sendRequest = async () => {

    if (!requestingSlot) return

    const { data: authData } = await supabase.auth.getUser()
    const currentUser = authData.user

    if (!currentUser) {
      alert('Login required')
      return
    }

    if (!advertisementId) {
      alert('User has no advertisement')
      return
    }

    const { error } = await supabase
      .from('session_request')
      .insert({
        request_from_user_id: currentUser.id,
        request_to_user_id: profileUserId,
        availability_id: requestingSlot.availability_id,
        advertisement_id: advertisementId,
        status: 'pending',
        description: description
      })

    if (error) {
      console.error(error)
      alert('Error sending request')
      return
    }

    alert('Session request sent!')

    setRequestingSlot(null)
    setDescription('')
  }

  /* Zeitfelder */

  const generateTimes = () => {
    const times: string[] = []

    for (let h = 0; h < 24; h++) {
      times.push(`${String(h).padStart(2,'0')}:00`)
      times.push(`${String(h).padStart(2,'0')}:30`)
    }

    return times
  }

  /* Monatstage */

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const daysArray = Array.from({ length: daysInMonth }, (_, i) =>
    new Date(year, month, i + 1).toISOString().split('T')[0]
  )

  const firstDay = new Date(year, month, 1)
  const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
  const emptyDays = Array.from({ length: startDay })

  return (

    <div className="w-full max-w-4xl mx-auto p-4 text-gray-800 shadow-lg rounded-2xl">

      <h2 className="bg-white/20 text-lg font-semibold mb-4 text-center py-2 backdrop-blur shadow-sm rounded-full">
        Available Slots
      </h2>

      {/* Month View */}

      {viewMode === 'month' && (

        <>
          <div className="grid grid-cols-7 gap-1 mb-2 font-semibold text-center">
            {['Mo','Tu','We','Th','Fr','Sa','Su'].map(d => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">

            {emptyDays.map((_,i)=><div key={i} />)}

            {daysArray.map(day => {

              const daySlots = slots.filter(s =>
                s.start_time.startsWith(day)
              )

              return (

                <div
                  key={day}
                  className="bg-white/20 backdrop-blur rounded-2xl min-h-[60px] p-2 cursor-pointer shadow-md hover:bg-white/30 flex flex-col items-center transition"
                  onClick={()=>{
                    setSelectedDay(day)
                    setViewMode('day')
                  }}
                >

                  <div className="font-semibold mb-1">
                    {new Date(day).getDate()}
                  </div>

                  {daySlots.map(slot => (

                    <div
                      key={slot.availability_id}
                      className={`rounded-lg text-xs px-1 py-0.5 w-full text-center mb-0.5
                      ${slot.is_booked
                        ? 'bg-gray-400/60 text-white'
                        : 'bg-green-400/60 text-white hover:bg-green-500/70'
                      }`}
                    >
                      {slot.start_time.slice(11,16)}
                    </div>

                  ))}

                </div>
              )
            })}

          </div>
        </>
      )}

      {/* Day View */}

      {viewMode === 'day' && selectedDay && (

        <div className="m-1 p-4">

          <button
            onClick={()=>setViewMode('month')}
            className="mb-4 px-4 py-2 rounded-xl hover:bg-white/20 transition"
          >
            ← Back
          </button>

          <h3 className="mb-6 text-lg font-semibold text-center">
            {new Date(selectedDay).toDateString()}
          </h3>

          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">

            {generateTimes().map(time => {

              const slotString = `${selectedDay}T${time}:00`
              const slot = slots.find(s => s.start_time === slotString)

              if (!slot)
                return <div key={time} className="bg-white/20 rounded-2xl p-2 min-h-[50px]" />

              const isFree = !slot.is_booked

              return (

                <div
                  key={time}
                  className={`text-center text-sm p-2 min-h-[50px] rounded-2xl flex items-center justify-center transition cursor-pointer
                  ${isFree
                    ? 'bg-green-400/60 text-white hover:bg-green-500/70'
                    : 'bg-gray-400/60 text-white'
                  }`}
                  onClick={()=> isFree && setRequestingSlot(slot)}
                >
                  {time}
                </div>

              )

            })}

          </div>

        </div>

      )}

      {/* Popup */}

      {requestingSlot && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

          <div className="bg-white/20 backdrop-blur rounded-2xl shadow-lg p-6 max-w-md w-full">

            <h3 className="text-lg font-semibold mb-4">
              Request Slot {requestingSlot.start_time.slice(11,16)}
            </h3>

            <textarea
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              placeholder="Describe your session..."
              className="w-full p-3 rounded-xl mb-4 bg-white/30"
            />

            <div className="flex justify-end gap-4">

              <button
                onClick={()=>setRequestingSlot(null)}
                className="px-4 py-2 rounded-xl hover:bg-white/30"
              >
                Cancel
              </button>

              <button
                onClick={sendRequest}
                className="px-4 py-2 rounded-xl bg-green-400/60 text-white hover:bg-green-500/70"
              >
                Send Request
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )
}
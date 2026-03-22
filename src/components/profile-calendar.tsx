'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import CalendarInfo from './calendar-info-box'


interface Slot {
  availability_id: string
  user_id: string
  start_time: string
  end_time: string
  is_booked: boolean
}

export default function BookingCalendar() {
  const [slots, setSlots] = useState<Slot[]>([])
  const [userId, setUserId] = useState<string | null>(null)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<'month' | 'day'>('month')
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const init = async () => {
      const { data: authData } = await supabase.auth.getUser()
      const currentUserId = authData.user?.id ?? null
      setUserId(currentUserId)
      if (currentUserId) await loadSlots(currentUserId)
    }
    init()
  }, [])

  const loadSlots = async (uid: string) => {
    const { data } = await supabase
      .from('availability')
      .select('*')
      .eq('user_id', uid)
      .order('start_time', { ascending: true })
    if (data) setSlots(data as Slot[])
  }

  /* German time utility */
  const formatGermanDate = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`
  }

  const toggleSlot = async (time: string) => {
    if (!selectedDay || !userId) return
    const clickedDate = new Date(`${selectedDay}T${time}`)
    const slotString = formatGermanDate(clickedDate)
    const existing = slots.find(s => s.start_time === slotString)

    if (existing) {
      await supabase.from('availability').delete().eq('availability_id', existing.availability_id)
    } else {
      const start = clickedDate
      const end = new Date(start)
      end.setMinutes(start.getMinutes() + 30)
      await supabase.from('availability').insert({
        user_id: userId,
        start_time: formatGermanDate(start),
        end_time: formatGermanDate(end),
        is_booked: false
      })
    }

    await loadSlots(userId)
  }


  // month switch
  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() - 1)
    setCurrentDate(newDate)
  }

  const goToNextMonth = () => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  // day switch

  const goToPreviousDay = () => {
    if (!selectedDay) return
    const d = new Date(selectedDay)
    d.setDate(d.getDate() - 1)
    setSelectedDay(d.toISOString().split('T')[0])
}

const goToNextDay = () => {
    if (!selectedDay) return
    const d = new Date(selectedDay)
    d.setDate(d.getDate() + 1)
    setSelectedDay(d.toISOString().split('T')[0])
}

  const generateTimes = () => {
    const times: string[] = []
    for (let h = 0; h < 24; h++) {
      times.push(`${String(h).padStart(2, '0')}:00`)
      times.push(`${String(h).padStart(2, '0')}:30`)
    }
    return times
  }

  /* Calendar logic */
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const formatDate = (date: Date) => {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  const daysArray = Array.from({ length: daysInMonth }, (_, i) =>
    formatDate(new Date(year, month, i + 1))
  )
  const firstDay = new Date(year, month, 1)
  let startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
  const emptyDays = Array.from({ length: startDay })

  return (
    <div className="w-full max-w-4xl mx-auto p-4 mt-0 text-gray-800 shadow-lg rounded-xl">
      <h2 className="bg-white/8 text-lg font-semibold mb-4 text-center py-2 text-center backdrop-blur shadow-sm p-8 rounded-full ">My Availability</h2>

      {/* Month view */}
      {viewMode === 'month' && (
        <>
          <div className="flex items-center justify-between mb-4 px-6">

            <button onClick={goToPreviousMonth}>
              ←---
            </button>

            <h3>
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h3>

            <button onClick={goToNextMonth}>
              ---→
            </button>

          </div>
          <div className="grid grid-cols-7 gap-1 mb-2 font-semibold text-center sm:text-base">
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {emptyDays.map((_, i) => <div key={i} />)}

            {daysArray.map(day => {


              const today = new Date()
              today.setHours(0, 0, 0, 0)

              const dayDate = new Date(day)
              const isPastDay = dayDate < today

              const daySlots = slots.filter(s => s.start_time.startsWith(day))


              const freeSlots = daySlots.filter(s => !s.is_booked)
              const bookedSlots = daySlots.filter(s => s.is_booked)

              return (

                <div
                  key={day}
                  className={`bg-white/20 backdrop-blur rounded-2xl min-h-[60px] p-2  shadow-md flex flex-col items-center transition
                 ${isPastDay
                      ? ' text-gray-500 cursor-not-allowed'
                      : 'cursor-pointer hover:bg-white/30'}
                   `}
                  onClick={() => {
                    if (!isPastDay) {
                      setSelectedDay(day)
                      setViewMode('day')
                    }
                  }}
                >

                  <div className="font-semibold">
                    {new Date(day).getDate()}
                  </div>

                 <div className="w-full flex flex-col gap-1 mt-1">

                  {/* freie Slots */}
                  {freeSlots.length > 0 && (
                      <div
                          className={`w-full h-2 rounded-full
                              ${isPastDay ? 'bg-gray-400/60' : 'bg-brand-teal'}
                          `}
                      />
                  )}

                  {/* gebuchte Slots */}
                  {bookedSlots.length > 0 && (
                      <div
                          className={`w-full h-2 rounded-full
                              ${isPastDay ? 'bg-gray-400/60' : 'bg-cyan-200/80'}
                          `}
                      />
                  )}

              </div>

                </div>

              )

            })}

          </div>
        </>
      )}

      {/* Day view */}
      {viewMode === 'day' && selectedDay && (
      <div className="m-1 p-4">

              <div className="flex items-center justify-between mb-4 px-6">

                  <button onClick={goToPreviousDay}>
                      ←---
                  </button>

                        <h3>
                            {new Date(selectedDay).toLocaleDateString('default', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </h3>

                  <button onClick={goToNextDay}>
                      ---→
                  </button>

              </div>

          <button
              onClick={() => setViewMode('month')}
              className="mb-2 px-4 py-2 text-sm font-semibold rounded-xl hover:bg-white/15 transition"
          >
              ← Back
          </button>

    <h3 className="mb-6 text-lg font-semibold text-gray-700 text-center py-2 shadow-sm p-4 rounded-xl">
        {new Date(selectedDay).toDateString()}
    </h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 ">
            {generateTimes().map(time => {


              const slotDate = new Date(`${selectedDay}T${time}:00`)
              const now = new Date()

              const isPast =
                slotDate.getTime() < now.getTime()


              const slotString = `${selectedDay}T${time}:00`
              const slot = slots.find(s => s.start_time.startsWith(`${selectedDay}T${time}`))
              const isFree = !!slot
              const isBooked = slot?.is_booked;

              return (
                <div
                  key={time}
                  className={`text-center text-sm sm:text-base p-2 sm:p-3 min-h-[50px] rounded-2xl transition flex items-center justify-center
                   ${isPast
                    ? 'bg-gray-500/50 text-gray-700 cursor-not-allowed'
                    : isBooked
                        ? 'bg-cyan-200/60 text-cyan-900'
                        : isFree
                            ? 'bg-brand-teal text-white hover:bg-brand-mint/70 cursor-pointer'
                            : 'bg-white/20 text-gray-600 cursor-pointer'}
                                  `}
                  onClick={() => { if (!isPast) toggleSlot(time) }}
                >
                  {time}

                  {isBooked && (
                      <span className="text-xs opacity-70 mt-1">✓</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
      <CalendarInfo />
    </div>
  )
}
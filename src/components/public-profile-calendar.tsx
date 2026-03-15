'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'

import PublicCalendarInfo from './public-calendar-info-box'

interface Slot {
    availability_id: string
    user_id: string
    start_time: string
    end_time: string
    is_booked: boolean
}

export default function PublicProfileCalendar({
    profileUserId,
    variant = "default"
}: {
    profileUserId: string
    variant?: "default" | "popup"
}) {

    const supabase = createClient()

    const [slots, setSlots] = useState<Slot[]>([])
    const [selectedDay, setSelectedDay] = useState<string | null>(null)
    const [viewMode, setViewMode] = useState<'month' | 'day'>('month')
    const [currentDate, setCurrentDate] = useState(new Date())

    const [requestingSlot, setRequestingSlot] = useState<Slot | null>(null)
    const [description, setDescription] = useState('')
    const [advertisementId, setAdvertisementId] = useState<string | null>(null)

    const [successMessage, setSuccessMessage] = useState(false)

    /* Slots laden */

    useEffect(() => {
        if (profileUserId) {
            loadSlots()
            loadAdvertisement()
        }
    }, [profileUserId])

    const loadSlots = async () => {

        const { data } = await supabase
            .from('availability')
            .select('*')
            .eq('user_id', profileUserId)
            .order('start_time')

        if (data) setSlots(data as Slot[])
    }

    /* Advertisement des user laden */

    const loadAdvertisement = async () => {

        const { data } = await supabase
            .from('advertisement')
            .select('advertisement_id')
            .eq('user_id', profileUserId)
            .limit(1)
            .single()

        if (data) setAdvertisementId(data.advertisement_id)
    }

    // zwischen monaten switchen
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


    /* Request senden */

    const sendRequest = async () => {

        if (!requestingSlot) return

        const { data: authData } = await supabase.auth.getUser()
        const currentUser = authData.user

        if (!currentUser) {
            alert('Login required')
            return
        }

        const { error } = await supabase
            .from('session_request')
            .insert({
                request_from_user_id: currentUser.id,
                request_to_user_id: profileUserId,
                availability_id: requestingSlot.availability_id,
                advertisement_id: advertisementId || null,
                status: 'pending',
                description: description
            } as any)

        if (error) {
            console.error(error)
            alert('Error sending request')
            return
        }

        setSuccessMessage(true)

        setTimeout(() => {
            setSuccessMessage(false)
        }, 2000)

        setRequestingSlot(null)
        setDescription('')
    }

    /* Zeitfelder */

    const generateTimes = () => {
        const times: string[] = []

        for (let h = 0; h < 24; h++) {
            times.push(`${String(h).padStart(2, '0')}:00`)
            times.push(`${String(h).padStart(2, '0')}:30`)
        }

        return times
    }

    /* Monatstage */

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const daysInMonth = new Date(year, month + 1, 0).getDate()


    const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
        const d = new Date(year, month, i + 1)
        const y = d.getFullYear()
        const m = String(d.getMonth() + 1).padStart(2, '0')
        const day = String(d.getDate()).padStart(2, '0')
        return `${y}-${m}-${day}`
    })


    const firstDay = new Date(year, month, 1)
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1
    const emptyDays = Array.from({ length: startDay })

    return (

        <div className="w-full max-w-4xl mx-auto p-4 text-gray-800 shadow-lg rounded-xl">

            <h2 className="bg-white/8 text-lg font-semibold mb-4 text-center py-2 text-center backdrop-blur shadow-sm p-8 rounded-full ">Available Slots</h2>

            {/* Month View */}

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
                    <div className="grid grid-cols-7 gap-1 mb-2 font-semibold text-center">
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

                            const daySlots = slots.filter(s =>
                                s.start_time.startsWith(day)
                            )

                            const freeSlots = daySlots.filter(s => !s.is_booked)

                            return (


                                <div
                                    key={day}
                                    className={`backdrop-blur rounded-2xl min-h-[60px] p-2 shadow-md flex flex-col items-center transition
                                          ${isPastDay
                                            ? 'bg-gray-400/40 cursor-not-allowed'
                                            : 'bg-white/20 hover:bg-white/30 cursor-pointer'}
                                               `}
                                    onClick={() => {
                                        if (!isPastDay) {
                                            setSelectedDay(day)
                                            setViewMode('day')
                                        }
                                    }}
                                >
                                    <div className="font-semibold mb-1">
                                        {new Date(day).getDate()}
                                    </div>

                                    {freeSlots.length > 0 && (
                                        <div className={`w-full h-2 rounded-full mt-1
                                      ${isPastDay ? 'bg-gray-400/60' : 'bg-brand-mint'}
                                       `}></div>
                                    )}

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
                        onClick={() => setViewMode('month')}
                        className="mb-2 px-4 py-2 text-sm font-semibold rounded-xl hover:bg-white/15 transition"
                    >
                        ← Back
                    </button>

                    <h3 className="mb-6 text-lg font-semibold text-gray-700 text-center text-lg py-2 shadow-sm p-4 rounded-xl">
                        {new Date(selectedDay).toDateString()}
                    </h3>
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-2">
                        {generateTimes().map(time => {
                            const slot = slots.find(s => s.start_time.startsWith(`${selectedDay}T${time}`));
                            const slotDate = new Date(`${selectedDay}T${time}`);
                            const now = new Date();
                            const isPast = slotDate < now;
                            const isFree = slot && !slot.is_booked;

                            return (
                                <div
                                    key={time}
                                    className={`backdrop-blur rounded-2xl min-h-[60px] p-4 shadow-md flex flex-col items-center justify-center transition
                                      ${isPast
                                            ? 'bg-gray-400/40 text-gray-700 cursor-not-allowed'
                                            : isFree
                                                ? 'bg-brand-teal text-white hover:bg-brand-mint/70 cursor-pointer'
                                                : 'bg-white/20 text-gray-800'
                                        }`}
                                    onClick={() => {
                                        if (!isPast && isFree && slot) setRequestingSlot(slot);
                                    }}
                                >
                                    {time}
                                </div>
                            );
                        })}
                    </div>

                </div>

            )}

            {/* Popup */}

            {requestingSlot && (

                <div className="fixed inset-0 flex items-center justify-center z-50 p-4">

                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-xl p-6 md:p-8 mx-2">

                        <h3 className="text-lg md:text-xl text-gray-800 bg-brand-magenta/10 rounded-2xl p-3 font-semibold mb-6 text-center">
                            Session Request for {requestingSlot.start_time.slice(11, 16)}
                        </h3>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="..."
                            className="w-full p-3 md:p-4 rounded-xl mb-6 border border-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-200"
                            rows={4}
                        />

                        <div className="flex justify-center gap-6 pt-2 w-full">

                            <button
                                onClick={() => setRequestingSlot(null)}
                                className="flex-1 px-8 py-2 text-lg text-white rounded-xl backdrop-blur-md shadow-sm bg-brand-purple/70 hover:bg-brand-purple/20 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={sendRequest}
                                className="flex-1 px-8 py-2 text-lg rounded-xl backdrop-blur-md shadow-sm bg-brand-teal/80 text-white hover:bg-brand-mint transition"
                            >
                                Send Request
                            </button>

                        </div>

                    </div>

                </div>

            )}
            <PublicCalendarInfo />


            {successMessage && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-brand-teal/70 backdrop-blur shadow-xl rounded-2xl px-8 py-6 text-center">
                        <p className="text-lg font-semibold text-white">
                            Session request sent!
                        </p>
                    </div>
                </div>
            )}

        </div>

    )
}
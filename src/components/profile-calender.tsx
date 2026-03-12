"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

/* types */

interface Slot {
  availability_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  is_booked: boolean;
}

interface Request {
  session_request_id: string;
  availability_id: string;
  request_from_user_id: string;
  request_to_user_id: string;
  description: string | null;
  status: "pending" | "accepted" | "rejected";
}

/* component */

export default function BookingCalendar() {

  const [slots, setSlots] = useState<Slot[]>([])
  const [requests, setRequests] = useState<Request[]>([])
  const [userId, setUserId] = useState<string | null>(null)

  const [currentDate, setCurrentDate] = useState(new Date())

  const [viewMode, setViewMode] = useState<"month" | "day">("month")
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  const [requestMessage, setRequestMessage] = useState("")

  /* init */

  useEffect(() => {

    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUserId(data.user?.id ?? null)
    }

    fetchUser()
    loadSlots()
    loadRequests()

    const interval = setInterval(() => {
      loadSlots()
      loadRequests()
    }, 5000)

    return () => clearInterval(interval)

  }, [])

  /* loading data */

  const loadSlots = async () => {

    const { data } = await supabase
      .from("availability")
      .select("*")
      .order("start_time", { ascending: true })

    if (data) setSlots(data as Slot[])

  }

  const loadRequests = async () => {

    const { data } = await supabase
      .from("session_request")
      .select("*")

    if (data) setRequests(data as Request[])

  }

  /* request */

  const sendRequest = async (slot: Slot) => {

    if (!userId) return

    await supabase
      .from("session_request")
      .insert({
        request_from_user_id: userId,
        request_to_user_id: slot.user_id,
        availability_id: slot.availability_id,
        description: requestMessage,
        status: "pending"
      } as any)

    setRequestMessage("")
    loadRequests()

  }

  /* accept request */

  const handleRequest = async (req: Request, accept: boolean) => {

    await supabase
      .from("session_request")
      .update({
        status: accept ? "accepted" : "rejected"
      })
      .eq("session_request_id", req.session_request_id)

    if (accept) {

      await supabase
        .from("availability")
        .update({ is_booked: true })
        .eq("availability_id", req.availability_id)

    }

    loadSlots()
    loadRequests()

  }


  /* create slot */

  const createSlot = async (time: string) => {

    if (!selectedDay || !userId) return

    const start = new Date(`${selectedDay}T${time}`)

    const end = new Date(start)
    end.setMinutes(start.getMinutes() + 30)

    await supabase
      .from("availability")
      .insert({
        user_id: userId,
        start_time: start.toLocaleString("sv-SE").replace(" ", "T"),
        end_time: end.toLocaleString("sv-SE").replace(" ", "T"),
        is_booked: false
      })

    loadSlots()

  }


  /* delete slot */

  const deleteSlot = async (slotId: string) => {

    await supabase
      .from("availability")
      .delete()
      .eq("availability_id", slotId)

    loadSlots()

  }

  /* generate times */

  const generateTimes = () => {

    const times: string[] = []

    for (let h = 1; h < 24; h++) {

      times.push(`${String(h).padStart(2, "0")}:00`)
      times.push(`${String(h).padStart(2, "0")}:30`)

    }

    return times

  }

  /* calendar */

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const days = new Date(year, month + 1, 0).getDate()

  const daysArray = Array.from({ length: days }, (_, i) =>
    new Date(year, month, i + 1).toISOString().split("T")[0]
  )

  const firstDay = new Date(year, month, 1)

  let startDay = firstDay.getDay()
  startDay = startDay === 0 ? 6 : startDay - 1

  const emptyDays = Array.from({ length: startDay })

  const getStatusColor = (slot: Slot) => {

    if (slot.is_booked) return "bg-red-300"
    return "bg-green-400"

  }

  const openDayView = (day: string) => {

    setSelectedDay(day)
    setViewMode("day")

  }

  /* UI */

  return (
    <div className="w-full max-w-7xl mx-auto p-4">

      <h1 className="text-2xl font-bold mb-4 text-center text-white">
        Session Calendar
      </h1>

      {/* Navigation */}

      <div className="flex justify-between items-center mb-3 text-white">

        <button
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40"
          onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
        >{"<"}</button>

        <span className="font-semibold text-lg">
          {currentDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
        </span>

        <button
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40"
          onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
        >{">"}</button>

      </div>

      {/* MONTH VIEW */}

      {viewMode === "month" && (

        <div className="border rounded-lg p-3 bg-gradient-to-tr from-purple-600 via-blue-400 to-pink-400">

          <div className="grid grid-cols-7 gap-1 mb-1 font-bold text-center text-white text-sm">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d =>
              <div key={d}>{d}</div>
            )}
          </div>

          <div className="grid grid-cols-7 gap-2 sm:gap-3 text-xs sm:text-sm">

            {emptyDays.map((_, i) => <div key={i}></div>)}

            {daysArray.map(day => {

              const daySlots = slots.filter(s => s.start_time.startsWith(day))

              return (

                <div
                  key={day} className="border rounded-lg flex flex-col min-h-[40px] sm:min-h-[50px] md:min-h-[60px] bg-white cursor-pointer p-2"
                  onClick={() => openDayView(day)}
                >

                  <div className="font-semibold text-sm border-b mb-1">
                    {new Date(day).getDate()}
                  </div>

                  {daySlots.map(slot => (

                    <div
                      key={slot.availability_id}
                      className={`${getStatusColor(slot)} rounded px-1 py-[2px] text-[10px] sm:text-xs mb-1 truncate`}
                    >
                      {slot.start_time.slice(11, 16)} - {slot.end_time.slice(11, 16)}
                    </div>

                  ))}

                </div>

              )

            })}

          </div>

        </div>

      )}

      {/* DAY VIEW */}

      {viewMode === "day" && selectedDay && (

        <div className="mt-6 bg-white p-4 rounded-lg">

          <button
            onClick={() => setViewMode("month")}
            className="mb-3 text-sm"
          >
            ← zurück
          </button>

          <h2 className="font-bold mb-3">
            {new Date(selectedDay).toLocaleDateString()}
          </h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">

            {generateTimes().map(time => {

              const slot = slots.find(s =>
                s.start_time.startsWith(`${selectedDay}T${time}`)
              )

              const isOwner = slot?.user_id === userId

              return (

                <div
                  key={time}
           onClick={() => {

  // Slot erstellen
  if (!slot && userId) {
    createSlot(time)
  }

  // Slot löschen (Owner)
  if (slot && slot.user_id === userId && !slot.is_booked) {
    deleteSlot(slot.availability_id)
  }

  // Request senden (Besucher)
  if (slot && slot.user_id !== userId && !slot.is_booked) {
    sendRequest(slot)
  }

}}
                  className={`text-xs text-center p-2 rounded border cursor-pointer
      ${slot ? "bg-green-300" : "bg-gray-200 hover:bg-gray-300"}
      ${slot?.is_booked ? "bg-red-300" : ""}
      `}
                >

                  {time}

                </div>

              )

            })}

          </div>

        </div>

      )}

    </div>

  )

}
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();


/*types */

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



/* component*/

export default function BookingCalendar() {

  const [slots, setSlots] = useState<Slot[]>([])
  const [requests, setRequests] = useState<Request[]>([])
  const [userId, setUserId] = useState<string | null>(null)

  const [currentDate, setCurrentDate] = useState(new Date())

  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [modalSlots, setModalSlots] = useState<Slot[]>([])
  const [showModal, setShowModal] = useState(false)

  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [requestMessage, setRequestMessage] = useState("")
  const [error, setError] = useState("")



  /* init*/

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


  /* loading data*/

  const loadSlots = async () => {

    const { data, error } = await supabase
      .from("availability")
      .select("*")
      .order("start_time", { ascending: true })

    if (error || !data) return

    setSlots(data as any)

  }

  const loadRequests = async () => {

    const { data, error } = await supabase
      .from("session_request")
      .select("*")

    if (error || !data) return

    setRequests(data as any)

  }

  /* create slot*/

  const addSlot = async () => {

    if (!selectedDay || !startTime || !endTime || !userId) {
      setError("Bitte alles ausfüllen")
      return
    }

    const start = new Date(`${selectedDay}T${startTime}`)
    const end = new Date(`${selectedDay}T${endTime}`)

    const THIRTY_MINUTES = 30 * 60 * 1000

    if (end.getTime() - start.getTime() !== THIRTY_MINUTES) {
      setError("Slot muss genau 30 Minuten sein")
      return
    }

    const { error } = await supabase
      .from("availability")
      .insert({
        user_id: userId,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        is_booked: false
      })

    if (!error) {
      setStartTime("")
      setEndTime("")
      setShowModal(false)
      loadSlots()
    }

  }


  /* request */

  const sendRequest = async (slot: Slot) => {

    if (!userId) return

    const { error } = await supabase
      .from("session_request")
      .insert({

        request_from_user_id: userId,
        request_to_user_id: slot.user_id,
        availability_id: slot.availability_id,
        description: requestMessage,
        status: "pending"

      } as any)

    if (!error) {

      setRequestMessage("")
      loadRequests()

    }

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

  /* calender*/

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

  const openModal = (day: string) => {

    setSelectedDay(day)

    const filtered = slots.filter(s =>
      s.start_time.startsWith(day)
    )

    setModalSlots(filtered)

    setShowModal(true)

  }

  /* UI */
  return (

    <div className="max-w-3xl mx-auto p-4">

      <h1 className="text-2xl font-bold mb-4 text-center text-white">
        Session Calender
      </h1>


      {/* Navigation */}
      <div className="flex justify-between items-center mb-3 text-white">

        <button
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40"
          onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
        >{"<"}</button>

        <span className="font-semibold text-lg">
          {currentDate.toLocaleString("de-DE", { month: "long", year: "numeric" })}
        </span>

        <button
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40"
          onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
        >{">"}</button>

      </div>


      {/* Calendar */}
      <div className="border rounded-lg p-3 bg-gradient-to-tr from-purple-600 via-blue-400 to-pink-400">

        <div className="grid grid-cols-7 gap-1 mb-1 font-bold text-center text-white text-sm">
          {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map(d =>
            <div key={d}>{d}</div>
          )}
        </div>

        <div className="grid grid-cols-7 gap-1 text-xs">

          {emptyDays.map((_, i) =>
            <div key={i}></div>
          )}

          {daysArray.map(day => {

            const daySlots = slots.filter(s => s.start_time.startsWith(day))

            return (

              <div
                key={day}
                className="border rounded-lg flex flex-col min-h-[80px] max-h-[80px] bg-white cursor-pointer p-1"
                onClick={() => openModal(day)}
              >

                <div className="font-semibold text-sm border-b mb-1">
                  {new Date(day).getDate()}
                </div>

                {daySlots.map(slot => (

                  <div
                    key={slot.availability_id}
                    className={`${getStatusColor(slot)} rounded p-1 text-[10px] mb-1`}
                  >

                    {slot.start_time.slice(11, 16)} - {slot.end_time.slice(11, 16)}

                  </div>

                ))}

              </div>

            )

          })}

        </div>

      </div>


      {/* Modal*/}

      {showModal && selectedDay && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white rounded-lg w-96 p-4">

            <h3 className="font-semibold mb-2">
              {new Date(selectedDay).toLocaleDateString()}
            </h3>

            {modalSlots.map(slot => (

              <div key={slot.availability_id} className="border p-2 rounded mb-2">

                <div className="flex justify-between">

                  <span>
                    {slot.start_time.slice(11, 16)} - {slot.end_time.slice(11, 16)}
                  </span>

                </div>


                {/* student request */}

                {userId !== slot.user_id && !slot.is_booked && (

                  <div className="flex gap-1 mt-1">

                    <input
                      type="text"
                      placeholder="Nachricht"
                      value={requestMessage}
                      onChange={e => setRequestMessage(e.target.value)}
                      className="flex-1 border p-1 text-xs rounded"
                    />

                    <button
                      onClick={() => sendRequest(slot)}
                      className="bg-blue-600 text-white px-2 rounded text-xs"
                    >

                      Request

                    </button>

                  </div>

                )}

                {/* teacher request */}
                {userId === slot.user_id &&

                  requests
                    .filter(r => r.availability_id === slot.availability_id && r.status === "pending")
                    .map(r => (

                      <div key={r.session_request_id} className="flex justify-between mt-1 bg-gray-100 p-1 rounded text-xs">

                        <span>{r.description}</span>

                        <div className="flex gap-1">

                          <button
                            onClick={() => handleRequest(r, true)}
                            className="bg-green-600 text-white px-2 rounded"
                          >
                            ✓
                          </button>

                          <button
                            onClick={() => handleRequest(r, false)}
                            className="bg-red-600 text-white px-2 rounded"
                          >
                            ✕
                          </button>

                        </div>

                      </div>

                    ))

                }

              </div>

            ))}

            {/* create slot*/}
            {userId && modalSlots.length === 0 && (

              <div className="mt-2">

                {error && (
                  <p className="text-red-500 text-xs">{error}</p>
                )}

                <input
                  type="time"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  className="w-full mb-1 border p-1 rounded"
                />

                <input
                  type="time"
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                  className="w-full mb-1 border p-1 rounded"
                />

                <button
                  onClick={addSlot}
                  className="bg-green-600 text-white w-full py-1 rounded"
                >

                  Create Slot

                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  )

}
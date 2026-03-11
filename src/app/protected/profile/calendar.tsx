"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

interface Session {
  id: string;
  title: string;
  date: string;
  start_time: string;
  end_time: string;
  creator_id: string;
  status: "free" | "booked" | "confirmed";
  google_meet_link: string | null;
}

interface Request {
  id: string;
  session_id: string;
  requester_id: string;
  message: string;
  requested_time: string;
  status: "pending" | "accepted" | "declined";
}

export default function BookingCalendar() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userId, setUserId] = useState<string | null>(null);

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalSessions, setModalSessions] = useState<Session[]>([]);

  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id ?? null);
    };
    fetchUser();
    loadSessions();
    loadRequests();

    // Live Update alle 5 Sekunden
    const interval = setInterval(() => {
      loadSessions();
      loadRequests();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadSessions = async () => {
    const { data, error } = await supabase
      .from("session")
      .select("*")
      .order("date", { ascending: true })
      .order("start_time", { ascending: true });
    if (!error && data) setSessions(data);
  };

  const loadRequests = async () => {
    const { data, error } = await supabase
      .from("session_request")
      .select("*")
      .order("status", { ascending: true });
    if (!error && data) setRequests(data);
  };

  const addSession = async () => {
    if (!title || !startTime || !endTime || !selectedDay || !userId) {
      setError("Bitte alles ausfüllen");
      return;
    }
     const start = new Date(startTime);
     const end = new Date(endTime);

    const THIRTY_MINUTES = 30 * 60 * 1000;

    if (end.getTime() - start.getTime() !== THIRTY_MINUTES) {
    setError("Die Endzeit muss genau 30 Minuten nach der Startzeit liegen.");
    return;
  }

    const googleMeetLink = `https://meet.google.com/${Math.random().toString(36).substring(2,10)}`;
    if (!userId) {
      setError("Du bist nicht eingeloggt.");
      return;
    }

    const { data: existing } = await supabase
  .from("availability")
  .select("availability_id")
  .eq("user_id", userId)
  .eq("start_time", startTime);

  if (existing && existing.length > 0) {
  setError("Für diese Startzeit existiert bereits ein Slot.");
  return;
  }

    const { error } = await supabase.from("session").insert({
      title,
      date: selectedDay,
      start_time: startTime,
      end_time: endTime,
      status: "free",
      creator_id: userId,
      google_meet_link: googleMeetLink,
    }as any);

    if (!error) {
      setTitle("");
      setStartTime("");
      setEndTime("");
      setSelectedDay(null);
      setShowModal(false);
      loadSessions();
    }
  };

  const sendRequest = async (session: Session) => {
    if (!userId || !requestMessage) return;
    const { error } = await supabase.from("session_request").insert({
      session_request_id: session.id,
      requester_id: userId,
      message: requestMessage,
      requested_time: session.start_time,
      status: "pending",
    });
    if (!error) {
      setRequestMessage("");
      loadRequests();
    }
  };

  const handleRequest = async (request: Request, accept: boolean) => {
    await supabase.from("session_request").update({ status: accept ? "accepted" : "declined" }).eq("id", request.id);
    if (accept) {
      await supabase.from("session").update({ status: "confirmed" }).eq("id", request.session_id);
    }
    loadSessions();
    loadRequests();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from({ length: days }, (_, i) =>
    new Date(year, month, i + 1).toISOString().split("T")[0]
  );

  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay();
  startDay = startDay === 0 ? 6 : startDay - 1;
  const emptyDays = Array.from({ length: startDay });

  const getStatusColor = (status: string) => {
    if (status === "free") return "bg-green-400";
    if (status === "booked") return "bg-yellow-400";
    if (status === "confirmed") return "bg-red-300";
  };

  const openModal = (day: string) => {
    setSelectedDay(day);
    setModalSessions(sessions.filter(s => s.date === day));
    setShowModal(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-white">Session-Kalender</h1>

      {/* Navigation */}
      <div className="flex justify-between items-center mb-3 text-white">
        <button
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition"
          onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
        >{"<"}</button>

        <span className="font-semibold text-lg">{currentDate.toLocaleString("de-DE", { month: "long", year: "numeric" })}</span>

        <button
          className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition"
          onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
        >{">"}</button>
      </div>

      {/* Kalender Grid */}
      <div className="border rounded-lg p-3 bg-gradient-to-tr from-purple-600 via-blue-400 to-pink-400">
        <div className="grid grid-cols-7 gap-1 mb-1 font-bold text-center text-white text-sm">
          {["Mo","Di","Mi","Do","Fr","Sa","So"].map(d => <div key={d}>{d}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-1 text-xs">
          {emptyDays.map((_, i) => <div key={"empty-"+i}></div>)}

          {daysArray.map(day => {
            const daySessions = sessions.filter(s => s.date === day);
            return (
              <div
                key={day}
                className={`border rounded-lg flex flex-col min-h-[80px] max-h-[80px] shadow-sm hover:shadow-md transition cursor-pointer p-1
                  ${day === new Date().toISOString().split("T")[0] ? "ring-2 ring-white/70" : "bg-white"}`}
                onClick={() => openModal(day)}
              >
                <div className="font-semibold text-sm border-b mb-1">{new Date(day).getDate()}</div>
                <div className="flex-1 flex flex-col gap-1 overflow-hidden">
                  {daySessions.map(s => {
                    const pendingCount = requests.filter(r => r.session_id === s.id && r.status === "pending").length;
                    return (
                      <div key={s.id} className="relative">
                        {/* Live Badge */}
                        {pendingCount > 0 && (
                          <div className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] px-1 rounded-full">
                            {pendingCount}
                          </div>
                        )}

                        <div
                          className={`${getStatusColor(s.status)} rounded p-1 text-[10px] flex justify-between items-center`}
                        >
                          <span>{s.start_time}-{s.end_time} {s.title}</span>
                          {s.google_meet_link && (
                            <a href={s.google_meet_link} target="_blank" className="text-xs underline" title="Google Meet">🔗</a>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedDay && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 p-4 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg font-bold"
              onClick={()=>setShowModal(false)}
            >✖</button>

            <h3 className="text-lg font-semibold mb-2">Sessions für {new Date(selectedDay).toLocaleDateString()}</h3>

            {modalSessions.map(s => (
              <div key={s.id} className="border p-2 rounded mb-1 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{s.start_time}-{s.end_time} {s.title}</span>
                  {s.google_meet_link && (
                    <a href={s.google_meet_link} target="_blank" className="text-xs underline" title="Google Meet">🔗</a>
                  )}
                </div>

                {/* Requests für Besitzer */}
                {userId === s.creator_id && requests.filter(r => r.session_id === s.id && r.status === "pending").map(r => (
                  <div key={r.id} className="flex justify-between items-center bg-gray-100 p-1 rounded text-xs">
                    <span>{r.message} ({r.requested_time})</span>
                    <div className="flex gap-1">
                      <button onClick={() => handleRequest(r, true)} className="bg-green-600 px-2 rounded hover:bg-green-500 transition text-[10px]">Akzeptieren</button>
                      <button onClick={() => handleRequest(r, false)} className="bg-red-600 px-2 rounded hover:bg-red-500 transition text-[10px]">Ablehnen</button>
                    </div>
                  </div>
                ))}

                {/* Andere Nutzer können Request senden */}
                {userId && userId !== s.creator_id && s.status === "free" && (
                  <div className="flex gap-1 mt-1">
                    <input
                      type="text"
                      placeholder="Nachricht / Zweck"
                      value={requestMessage}
                      onChange={e=>setRequestMessage(e.target.value)}
                      className="flex-1 border p-1 text-xs rounded"
                    />
                    <button onClick={()=>sendRequest(s)} className="bg-blue-600 px-2 rounded hover:bg-blue-500 transition text-xs">Anfrage</button>
                  </div>
                )}
              </div>
            ))}

            {/* Besitzer kann neuen Slot erstellen */}
            {userId && modalSessions.length === 0 && (
              <div className="mt-2">
                <h4 className="font-semibold mb-1">Neue freie Zeit eintragen</h4>
                {error && <p className="text-red-500 text-xs mb-1">{error}</p>}
                <input placeholder="Titel" value={title} onChange={e=>setTitle(e.target.value)} className="w-full mb-1 p-1 border rounded text-sm"/>
                <input type="time" value={startTime} onChange={e=>setStartTime(e.target.value)} className="w-full mb-1 p-1 border rounded text-sm"/>
                <input type="time" value={endTime} onChange={e=>setEndTime(e.target.value)} className="w-full mb-1 p-1 border rounded text-sm"/>
                <button onClick={addSession} className="bg-green-600 w-full py-1 rounded text-white hover:bg-green-500 transition mt-1">Slot erstellen</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
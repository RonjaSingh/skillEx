"use client";

import { useEffect, useState } from "react";
import FullCalendar, { EventApi, EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { supabase } from "@/lib/supabase/client";

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  user_id: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Events laden
  const loadEvents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from<Event>("events")
      .select("*")
      .order("start", { ascending: true });
    if (error) console.error(error);
    else setEvents(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Neues Event erstellen
  const handleDateSelect = async (selectInfo: any) => {
    const title = prompt("Titel für Event eingeben:");
    if (!title) return;

    const { data, error } = await supabase.from("events").insert({
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      user_id: "user-id-hier", // TODO: dynamisch den eingeloggten User
    });

    if (error) {
      alert("Fehler beim Speichern!");
      console.error(error);
    } else {
      loadEvents();
    }
  };

  // Event löschen
  const handleEventClick = async (clickInfo: EventClickArg) => {
    const confirmDelete = confirm(`Event "${clickInfo.event.title}" löschen?`);
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", clickInfo.event.id);

    if (error) {
      alert("Fehler beim Löschen!");
      console.error(error);
    } else {
      loadEvents();
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px" }}>
      <h1>Kalender</h1>
      {loading && <p>Lade Events…</p>}

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        events={events.map((e) => ({
          id: e.id,
          title: e.title,
          start: e.start,
          end: e.end,
        }))}
        select={handleDateSelect}
        eventClick={handleEventClick}
        height="auto"
      />
    </div>
  );
}

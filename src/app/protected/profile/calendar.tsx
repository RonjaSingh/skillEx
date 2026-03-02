"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Availability {
  availability_id: string;
  start_time: string;
  end_time: string;
}

export default function CalendarPage() {

   const supabase = createClient();
   
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Aktuellen User laden
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData } = await supabase.auth.getUser();
      setUserId(userData.user?.id ?? null);
    };
    fetchUser();
  }, []);

  // Termine laden
  useEffect(() => {
    if (!userId) return;

    const loadAvailabilities = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("availability")
        .select("*")
        .eq("user_id", userId)
        .order("start_time", { ascending: true });

      if (error) {
        console.error(error.message);
      } else {
        setAvailabilities(data as Availability[]);
      }
      setLoading(false);
    };

    loadAvailabilities();
  }, [userId]);

  // Termin erstellen
  const addAvailability = async () => {
    setError("");

    if (!startTime || !endTime) {
      setError("Bitte Start- und Endzeit auswählen.");
      return;
    }

    if (new Date(startTime) >= new Date(endTime)) {
      setError("Endzeit muss nach Startzeit liegen.");
      return;
    }

    if (!userId) {
      setError("Du bist nicht eingeloggt.");
      return;
    }

    const { error } = await supabase.from("availability").insert({
      user_id: userId,
      start_time: startTime,
      end_time: endTime,
    });

    if (error) {
      setError(error.message);
    } else {
      setStartTime("");
      setEndTime("");
      // sofort neu laden
      setAvailabilities((prev) => [
        ...prev,
        { availability_id: crypto.randomUUID(), start_time: startTime, end_time: endTime },
      ]);
    }
  };

  // Termin löschen
  const deleteAvailability = async (id: string) => {
    const { error } = await supabase.from("availability").delete().eq("availability_id", id);
    if (error) {
      console.error(error.message);
    } else {
      setAvailabilities((prev) => prev.filter((a) => a.availability_id !== id));
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Terminkalender</h1>

      {/* Formular */}
      <div style={formStyle}>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          style={inputStyle}
        />
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          style={inputStyle}
        />
        <button onClick={addAvailability} style={buttonStyle}>
          Termin hinzufügen
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>

      {/* Termine anzeigen */}
      {loading ? (
        <p>Lade Termine...</p>
      ) : availabilities.length === 0 ? (
        <p>Keine Termine vorhanden.</p>
      ) : (
        <div style={boardStyle}>
          {availabilities.map((a) => (
            <div key={a.availability_id} style={availabilityStyle}>
              <strong>
                {new Date(a.start_time).toLocaleString()} - {new Date(a.end_time).toLocaleString()}
              </strong>
              <button
                onClick={() => deleteAvailability(a.availability_id)}
                style={deleteButtonStyle}
              >
                Löschen
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* Styles */
const containerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "40px",
  textAlign: "center" as const,
};

const formStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  marginBottom: "30px",
  flexWrap: "wrap" as const,
};

const inputStyle = {
  padding: "8px",
  fontSize: "16px",
};

const buttonStyle = {
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "#333",
  color: "#fff",
  border: "none",
  cursor: "pointer",
};

const boardStyle = {
  display: "flex",
  flexDirection: "column" as const,
  gap: "10px",
};

const availabilityStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#90caf9",
  padding: "10px",
  borderRadius: "6px",
};

const deleteButtonStyle = {
  backgroundColor: "#e57373",
  border: "none",
  padding: "6px 10px",
  cursor: "pointer",
  color: "#fff",
};
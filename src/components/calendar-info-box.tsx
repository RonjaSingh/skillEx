'use client'

import { useState } from 'react'

export default function CalendarInfo() {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="mt-3 flex flex-col items-center">

      <button
        onClick={() => setShowInfo(!showInfo)}
        className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition"
      >  How it works
        <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white/30 text-gray-800 font-bold">
          ?
        </span>

      </button>

      {showInfo && (
        <div className="mt-3 p-5 rounded-xl bg-white/20 backdrop-blur text-sm text-gray-800 shadow-md max-w-md w-full">

          <p className=" mb-5 text-center underline text-gray-700">
            How this calendar works
          </p>

          <div className="grid grid-cols-2 gap-6">

            {/* Erklärung */}
            <div className="space-y-2 leading-relaxed text-gray-700">
              <ul className="list-disc pl-5 space-y-2">

                <li>
                  Click on a day to open its time slots.
                </li>

                <li>
                  Select a time slot to add or remove your availability.
                </li>

                <li>
                  Other users can choose from your available times to send you a session request.
                </li>

                <li>
                  Past days and times cannot be selected.
                </li>

              </ul>
            </div>

            {/* Legende */}
            <div className="space-y-3">

              <div className="flex items-center gap-2">
                <div className="w-8 h-2 bg-brand-teal rounded"></div>
                <span>Day has free slots</span>
              </div> 
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-2 bg-brand-mint rounded"></div>
                <span>Day has booked slots</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-brand-teal rounded"></div>
                <span>Available slot</span>
              </div>

             <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-brand-mint rounded"></div>
                <span>Booked slot</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-500/50 rounded"></div>
                <span>Past time</span>
              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  )
}
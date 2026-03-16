'use client'

import { useState } from 'react'

export type Ad = {
  id: string
  title: string
  description: string
  type: 'offer' | 'request'
}

type Props = {
  ad: Ad
  onSave: (updatedAd: Ad) => void
  onClose: () => void
}

export default function EditAdvertisementPopup({
  ad,
  onSave,
  onClose,
}: Props) {
  const [title, setTitle] = useState(ad.title)
  const [description, setDescription] = useState(ad.description)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center ">
      <div className="relative 
    w-full 
 max-w-2xl
max-h-[90vh]
    bg-white/70
    backdrop-blur-xl
    shadow-2xl
    rounded-3xl
    overflow-y-scroll
    px-8
    py-8
    text-gray-800 flex flex-col justify-between">
        <h2 className="text-lg text-center font-bold text-gray-800 bg-brand-mint/25 backdrop-blur-md border border-brand-mint/30 rounded-2xl mb-6 p-2">
          Edit Your Posting
        </h2>

        <div className="flex flex-col gap-4 flex-1">
          <input
            className="
    border
    bg-white/40
    backdrop-blur-md
    p-3
    w-full
    rounded-xl
    focus:outline-none
    focus:ring-1
    focus:ring-brand-mint/5
    focus:border-brand-mint
    transition
  "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="
    border
    bg-white/40
    backdrop-blur-md
    p-3
    w-full
    rounded-xl
    focus:outline-none
    focus:ring-1
    focus:ring-brand-mint/5
    focus:border-brand-mint
    transition"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex justify-center gap-8 mt-6">
          <button
            onClick={onClose}
            className="w-52 p-2 rounded-xl bg-brand-magenta/28 backdrop-blur-md text-gray-800 font-semibold text-lg shadow-lg hover:bg-brand-magenta/35 "
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSave({
                ...ad,
                title,
                description,
                type: ad.type,
              })
            }
            className="w-52 p-2 rounded-xl bg-brand-mint/28 backdrop-blur-md text-gray-800 font-semibold text-lg shadow-lg hover:bg-brand-mint/50 "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

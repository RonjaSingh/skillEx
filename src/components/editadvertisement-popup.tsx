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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className=" p-6 rounded-lg w-full max-w-md space-y-4 bg-brand-mirounded-xl bg-brand-mint/80 backdrop-blur-xl text-gray-700 font-semibold text-md shadow-lg border border-brand-mint/20  ">
       

        <input
          className="border border-brand-mint/50 p-2 w-full rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border border-brand-mint/50 p-2 w-full rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-center gap-2">
          <button
            onClick={onClose}
          className="w-36 p-2 rounded-xl bg-brand-pink/30 backdrop-blur-md text-gray-700 font-semibold text-md shadow-lg border border-brand-pink/40 hover:bg-brand-pink/60 hover:border-brand-pink hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-200 ease-out"
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
           className="w-36 p-2 rounded-xl bg-brand-mint/30 backdrop-blur-md text-gray-700 font-semibold text-md shadow-lg border border-brand-mint/40 hover:bg-brand-mint/60 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-200 ease-out"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

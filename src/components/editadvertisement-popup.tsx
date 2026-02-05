'use client'

import { useState } from 'react'

export type Ad = {
  id: number
  title: string
  description: string
  type: 'ANGEBOT' | 'GESUCH'
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
      <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
        <h2 className="text-lg font-bold">Anzeige bearbeiten</h2>

        <input
          className="border p-2 w-full rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border p-2 w-full rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSave({
                ...ad,
                title,
                description,
              })
            }
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

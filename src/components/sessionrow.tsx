'use client'
import { useState } from 'react'



type Props = {
  date: string
  topic: string
  name: string
  description?: string
  editable?: boolean
  onSave?: (newDescription: string) => void
  actions?: React.ReactNode
  className?: string
}

export default function SessionRow({
  date,
  topic,
  name,
  description,
  editable,
  onSave,
  actions,
  className = ""
}: Props) {

  const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(description || '')

  function handleSave() {
    onSave?.(text)
    setEditing(false)
  }

  return (
    <div className={`shadow-sm rounded-xl p-2 text-md font-semibold space-y- transition ${className}`}>

      {/* ROW */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
        <div className='text-red-900'>{date}</div>
        <div>{topic}</div>
        <div
          className="text-gray-800 truncate cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
          {description || '-'}
        </div>
        <div>{name}</div>


        <div className="flex gap-2 justify-end">
          {editable && !editing && (
            <button
              onClick={() => {
                setExpanded(true)
                setEditing(true)
              }}
              className="px-2 py-1 border rounded bg-blue-100"
            >
              Edit
            </button>
          )}
          {actions}
        </div>
      </div>


      {expanded && (
        <div className="  rounded p-3 space-y-2">

          {!editing ? (
            <p className="text-gray-800 whitespace-pre-wrap">
              {description || 'No description'}
            </p>
          ) : (
            <>
              <textarea
                className="w-full border rounded p-2 text-sm"
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 border rounded bg-green-100"
                >
                  Save
                </button>

                <button
                  onClick={() => {
                    setEditing(false)
                    setText(description || '')
                  }}
                  className="px-3 py-1 border rounded bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}



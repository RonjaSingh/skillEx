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
}

export default function SessionRow({
  date,
  topic,
  name,
  description,
  editable,
  onSave,
  actions
}: Props)  {
  
    const [expanded, setExpanded] = useState(false)
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(description || '')

  function handleSave() {
    onSave?.(text)
    setEditing(false)
  }
  
  
  
  
    return (


    <div className="grid grid-cols-5 items-center border p-2 rounded text-sm">
      <div>{date}</div>
      <div>{topic}</div>
      <div>{name}</div>


        <div
          className="text-gray-600 truncate cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        >
         {description || '-'}
      </div>

      <div className="flex gap-2 justify-end">
        {editable && !editing &&(
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
  )
}

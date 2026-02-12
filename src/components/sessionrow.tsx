type Props = {
  date: string
  topic: string
  name: string
  description?: string
  editable?: boolean
  onEdit?: () => void
  actions?: React.ReactNode
}

export default function SessionRow({ date, topic, name, description,
  editable, onEdit, actions }: Props) {
  return (
    <div className="grid grid-cols-5 items-center border p-2 rounded text-sm">
      <div>{date}</div>
      <div>{topic}</div>
      <div>{name}</div>
      <div className="text-gray-600 truncate">
        {description || '-'}
      </div>

      <div className="flex gap-2 justify-end">
        {editable && (
          <button
            onClick={onEdit}
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

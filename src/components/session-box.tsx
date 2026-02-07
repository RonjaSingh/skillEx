type Session = {
  id: string
  start_time: string
  title: string
  name: string
}

type Props = {
  title: string
  data: Session[]
  showAcceptReject?: boolean
  showCancel?: boolean
  showRate?: boolean
  onAccept?: (id: string) => void
  onReject?: (id: string) => void
  onCancel?: (id: string) => void
}

export default function SessionBox({
  title,
  data,
  showAcceptReject,
  showCancel,
  showRate,
  onAccept,
  onReject,
  onCancel
}: Props) {
  return (
    <div className="border rounded-lg p-4 h-64 overflow-y-auto">

      <h2 className="font-semibold mb-3">{title}</h2>

      {data.map(session => (
        <div
          key={session.id}
          className="grid grid-cols-4 gap-2 border-b py-2 items-center"
        >
          <div>{new Date(session.start_time).toLocaleString()}</div>
          <div>{session.title}</div>
          <div>{session.name}</div>

          <div className="flex gap-2 justify-end">

            {showAcceptReject && (
              <>
                <button
                  onClick={() => onAccept?.(session.id)}
                  className="px-2 py-1 border rounded bg-green-100"
                >
                  Accept
                </button>

                <button
                  onClick={() => onReject?.(session.id)}
                  className="px-2 py-1 border rounded bg-red-100"
                >
                  Reject
                </button>
              </>
            )}

            {showCancel && (
              <button
                onClick={() => onCancel?.(session.id)}
                className="px-2 py-1 border rounded"
              >
                Cancel
              </button>
            )}

            {showRate && (
              <button className="px-2 py-1 border rounded">
                Rate
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

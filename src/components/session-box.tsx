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
    <div >

      <h2 >{title}</h2>

      {data.map(session => (
        <div
          key={session.id}
          
        >
          <div>{new Date(session.start_time).toLocaleString()}</div>
          <div>{session.title}</div>
          <div>{session.name}</div>

          <div >
            
            {showAcceptReject && (
              <>
                <button
                  onClick={() => onAccept?.(session.id)}>
                  Accept
                </button>

                <button
                  onClick={() => onReject?.(session.id)}>
                  Reject
                </button>
              </>
            )}

            {showCancel && (
              <button
                onClick={() => onCancel?.(session.id)}>
                Cancel
              </button>
            )}

            {showRate && (
              <button >
                Rate
              </button>
            )}

          </div>
        </div>
      ))}
    </div>
  )
}

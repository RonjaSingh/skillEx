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
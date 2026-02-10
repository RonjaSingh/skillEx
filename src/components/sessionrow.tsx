type Props = {
  date: string
  topic: string
  name: string
  actions?: React.ReactNode
}

export default function SessionRow({ date, topic, name, actions }: Props) {
  return (
    <div className="grid grid-cols-4 items-center border p-2 rounded text-sm">
      <div>{date}</div>
      <div>{topic}</div>
      <div>{name}</div>
      <div className="flex gap-2 justify-end">{actions}</div>
    </div>
  )
}

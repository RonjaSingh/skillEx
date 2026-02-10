type Props = {
  title: string
  children: React.ReactNode
}

export default function SessionBox({ title, children }: Props) {
  return (
    <div className="border rounded-lg p-3 h-64 flex flex-col">
      <h2 className="font-bold mb-2">{title}</h2>

      <div className="overflow-y-auto flex-1 space-y-2">
        {children}
      </div>
    </div>
  )
}

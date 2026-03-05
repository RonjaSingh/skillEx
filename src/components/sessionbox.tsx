type Props = {
  title: string
  children: React.ReactNode
}

export default function SessionBox({ title, children }: Props) {
  return (
    <div className="max-w-7xl mx-auto m-0 p-4 space-y-10">
      <h2 className="text-xl text-center font-semibold text-gray-800 bg-white/25 backdrop-blur-md rounded-2xl p-2">{title}</h2>

      <div className="overflow-y-auto flex-1 space-y-2">
        {children}
      </div>
    </div>
  )
}

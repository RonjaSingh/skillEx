type Props = {
  title: string
  children: React.ReactNode
}

export default function SessionBox({ title, children }: Props) {
  return (
    <section className="bg-white/15 backdrop-blur rounded-2xl shadow-md p-8">

      <h2 className="text-lg text-center font-semibold text-gray-800 mb-2 backdrop-blur-md rounded-2xl p-2">
        {title}
      </h2>

      <div className="space-y-4">
        {children}
      </div>

    </section>
  )
}
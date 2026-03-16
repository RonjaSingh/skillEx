'use client'

type Props = {
  title: string
  onConfirm: () => void
  onClose: () => void
}

export default function DeleteAdvertisementPopup({
  title,
  onConfirm,
  onClose,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative 
    w-full 
 max-w-2xl
max-h-[90vh]
    bg-white/70
    backdrop-blur-xl
    shadow-2xl
    rounded-3xl
    overflow-y-scroll
    px-8
    py-8
    text-gray-800 flex flex-col justify-between">
        <h2 className="text-lg text-center font-bold text-gray-800 bg-brand-pink/25 border border-brand-pink/30 backdrop-blur-md rounded-2xl p-2 mb-6">Delete Your Posting</h2>

        <p className="text-md  text-center font-semibold text-gray-800 mb-6">
          Are you sure you want to delete <strong>{title}</strong>?
        </p>

        <div className="flex justify-center gap-2">
          <button
            onClick={onClose}
            className="w-52 p-2 rounded-xl bg-brand-blue/28 backdrop-blur-md text-gray-800 font-semibold text-lg shadow-lg hover:bg-brand-blue/35"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-52 p-2 rounded-xl bg-brand-magenta/28 backdrop-blur-md text-gray-800 font-semibold text-lg shadow-lg hover:bg-brand-magenta/35"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

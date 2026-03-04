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
      <div className="bg-white p-6 rounded-lg w-full max-w-sm space-y-4">
        <h2 className="text-lg text-center font-bold text-gray-800">Delete Your Posting</h2>

        <p className="text-md text-gray-800 mb-6">
          Are you sure you want to delete <strong>{title}</strong>?
        </p>

        <div className="flex justify-center gap-2">
          <button
            onClick={onClose}
            className="w-36 p-2 rounded-xl bg-brand-mint/30 backdrop-blur-md text-gray-700 font-semibold text-md shadow-lg border border-brand-mint/40 hover:bg-brand-mint/60 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-200 ease-out"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="w-36 p-2 rounded-xl bg-brand-pink/30 backdrop-blur-md text-gray-700 font-semibold text-md shadow-lg border border-brand-pink/40 hover:bg-brand-pink/60 hover:border-brand-pink hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-200 ease-out"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

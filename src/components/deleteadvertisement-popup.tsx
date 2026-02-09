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
        <h2 className="text-lg font-bold">Delete Advertisement</h2>

        <p className="text-sm text-gray-600">
          Are you sure you want to delete <strong>{title}</strong>?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 border rounded text-red-600 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

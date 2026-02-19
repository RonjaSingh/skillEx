'use client'

import React from 'react'

type Post = {
  title: string
  text: string
  type: 'offer' | 'request'
  creator: string
  timestamp: string
}

type Props = {
  post: Post
  onClose: () => void
}

export default function PostFullPopup({ post, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 relative shadow-lg max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold"
        >
          ✕
        </button>

        <h2 className="text-md font-semibold text-black">
          {post.type === 'request' ? 'Suche …' : 'Biete …'}
        </h2>

        <h2 className="text-md font-semibold underline mt-2">{post.title}</h2>

        <p className="mt-4 text-md text-gray-800 whitespace-pre-wrap break-words">{post.text}</p>

        <div className="mt-4 text-gray-500 text-xs">
          Createt from <strong>{post.creator}</strong> am{' '}
          {new Date(post.timestamp).toLocaleString()}
        </div>
  
     <div className="flex justify-center gap-4 mt-5">
  <button className="px-2 py-2 w-48 h-10 bg-gray-500 text-white rounded-lg hover:bg-gray-700">
    Cancel
  </button>

  <button className="px-2 py-2 w-48 h-10 bg-pink-500 text-white rounded-lg hover:bg-pink-700">
    Book your Session
  </button>
</div>

      </div>
    </div>
  )
}

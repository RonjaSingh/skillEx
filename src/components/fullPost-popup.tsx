'use client'

import React from 'react'
import { Post } from '@/hooks/use-board';
import { useState } from 'react';
import { useEffect } from "react"

import PublicProfileCalendar from './public-profile-calendar';


type Props = {
  post: Post
  onClose: () => void
}


export default function PostFullPopup({ post, onClose }: Props) {

  const [calendarUserId, setCalendarUserId] = useState<string | null>(null)


useEffect(() => {
  document.body.style.overflow = "hidden"

  return () => {
    document.body.style.overflow = "auto"
  }
}, [])

  return (
    <div className="fixed inset-0 backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="   relative 
    w-full 
 max-w-2xl
max-h-[90vh]
    bg-white/50
    backdrop-blur-xl
    shadow-2xl
    rounded-3xl
    overflow-y-scroll
    px-8
    py-8
    text-gray-800 flex flex-col justify-between">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-500 hover:text-gray-700 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-md font-semibold text-black ">
          {post.typ === 'request' ? 'Looking for …' : 'I offer …'}
        </h2>

        <h2 className="text-md font-semibold underline ">{post.title}</h2>

        <p className="mt-1 text-md text-gray-800 whitespace-pre-wrap break-words">{post.description}</p>

        <div className="mt-4 text-gray-500 text-xs">
          Createt from <strong>{post.user?.name || "Unknown User"}</strong> am{' '}
          {new Date(post.created_at).toLocaleString()}
        </div>
  {!calendarUserId && (
        <div className="flex justify-center gap-8 mt-6">
          <button
            onClick={onClose}
            className="w-48 p-2 rounded-xl bg-brand-mint/28 backdrop-blur-md text-gray-800 font-semibold text-lg shadow-lg hover:bg-brand-mint/35 ">
            Cancel
          </button>

          <button
            onClick={() => {

    console.log("Clicked Post User:", post.user);
              if (post.user?.id) {
                setCalendarUserId(post.user.id)
              } else {
                alert("User not available")
              }
            }}
            className="w-48 p-2 rounded-xl bg-brand-teal/28 backdrop-blur-md text-gray-800 font-semibold text-lg shadow-lg hover:bg-brand-teal/35 "
          >
            Book your Session
          </button>
        </div>
  )}
        {calendarUserId && (
          <div className="mt-2">
            <PublicProfileCalendar profileUserId={calendarUserId} 
            />
          </div>
        )}
      </div>
    </div>
  )
}

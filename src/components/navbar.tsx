'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LogoutButton } from '@/components/logout-button'
import { useRef, useEffect } from 'react'


export function Navbar() {
  const [open, setOpen] = useState(false)

  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="relative" ref={navRef}>
      {/* Menü Button */}
      <div>
        <button
          onClick={() => setOpen(!open)}
         className="w-62 p-3 rounded-xl bg-white/25 backdrop-blur-md text-gray-800 font-semibold text-lg shadow-lg hover:bg-white/35 active:scale-[0.98] transition-all duration-200 ease-out border  border-white/30"
        >
       Menue
        </button>
      </div>

      {/* Dropdown*/}
      {open && (
 <ul
  className={`absolute left-1/2 top-full -translate-x-1/2 mt-2
              w-64 rounded-2xl shadow-xl
              flex flex-col gap-1 p-3 z-50
              bg-white/30 backdrop-blur-xl
              border border-white/30
              transition-all duration-200
              ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
>
    <li className="w-full">
      <Link
        href="/protected"
        className="block w-full text-center px-4 py-3
                   rounded-xl
                   text-lg font-semibold text-gray-800
                   hover:bg-white/40
                   transition"
      >
        Startseite
      </Link>
    </li>

    <li className="w-full">
      <Link
        href="/protected/profile"
        className="block w-full text-center px-4 py-3
                   rounded-xl
                   text-lg font-semibold text-gray-800
                   hover:bg-white/40
                   transition"
      >
        My Profile
      </Link>
    </li>

    <li className="w-full">
      <Link
        href="/protected/sessions"
        className="block w-full text-center px-4 py-3
                   rounded-xl
                   text-lg font-semibold text-gray-800
                   hover:bg-white/40
                   transition"
      >
        My Sessions
      </Link>
    </li>

    <li className="w-full">
      <Link
        href="/protected/advertisement"
        className="block w-full text-center px-4 py-3
                   rounded-xl
                   text-lg font-semibold text-gray-800
                   hover:bg-white/40
                   transition"
      >
        My Posts
      </Link>
    </li>

    <li className="w-full pt-3 border-t border-white/30">
      <LogoutButton
        />
    </li>
  </ul>
)}
    </nav>
  )
}

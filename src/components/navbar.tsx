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
          className="w-64 p-3 rounded-xl bg-white/25 backdrop-blur-md text-gray-800 font-semibold text-lg shadow-lg border border-white/30 hover:bg-white/35 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 active:shadow-md transition-all duration-200 ease-out"
        >
          Menu
        </button>
      </div>

      {/* Dropdown*/}
      {open && (
        <ul
          className={`absolute left-1/2 top-full -translate-x-1/2 w-64 rounded-2xl shadow-xl flex flex-col gap-1 p-3 z-50 bg-white/25 backdrop-blur-xl border border-t-0 border-white/30 transition-all duration-200 ${open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
        >
          <li className="w-full">
            <Link
              href="/protected"
              className="block w-full text-center p-3 rounded-xl text-gray-800 font-semibold text-lg shadow-lg hover:bg-white/35 active:scale-[0.98] transition-all duration-200 ease-out border border-white/30"
            >
              Startseite
            </Link>
          </li>

          <li className="w-full">
            <Link
              href="/protected/profile"
             className="block w-full text-center p-3 rounded-xl text-gray-800 font-semibold text-lg shadow-lg hover:bg-white/35 active:scale-[0.98] transition-all duration-200 ease-out border border-white/30"
            >
              My Profile
            </Link>
          </li>

          <li className="w-full">
            <Link
              href="/protected/sessions"
          className="block w-full text-center p-3 rounded-xl text-gray-800 font-semibold text-lg shadow-lg hover:bg-white/35 active:scale-[0.98] transition-all duration-200 ease-out border border-white/30"
            >
              My Sessions
            </Link>
          </li>

          <li className="w-full">
            <Link
              href="/protected/advertisement"
     className="block w-full text-center p-3 rounded-xl text-gray-800 font-semibold text-lg shadow-lg hover:bg-white/35 active:scale-[0.98] transition-all duration-200 ease-out border border-white/30"
            >
              My Posts
            </Link>
          </li>

          <li className="w-full pt-3 border-t mt-2 border-white/30 flex justify-center">
            <LogoutButton
              className="w-54 py-3 rounded-xl bg-gray-800 text-white text-lg font-semibold shadow-lg hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-200 ease-out"
            />
          </li>
        </ul>
      )}
    </nav>
  )
}

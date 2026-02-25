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
         className="w-40 p-3 rounded-xl bg-white/25 backdrop-blur-md text-gray-800 font-semibold text-lg shadow-lg hover:bg-white/35 active:scale-[0.98] transition-all duration-200 ease-out border border-white/30"
        >
       <strong>Menü</strong>
        </button>
      </div>

      {/* Dropdown*/}
      {open && (
        <ul className="absolute left-1/2 top-full -translate-x-1/2
               w-56 rounded-xl shadow-xl
               flex flex-col items-center gap-1 p-2 z-50
               bg-white/25 backdrop-blur-md border border-white/30">
          <li>
            <Link href="/protected" className="block px-4 py-2 rounded">
              Startseite
            </Link>
          </li>

          <li>
            <Link href="/protected/profile" className="block px-4 py-2 rounded">
              My Profile
            </Link>
          </li>

          <li>
            <Link href="/protected/sessions" className="block px-4 py-2 rounded">
              My Sessions
            </Link>
          </li>

          <li>
            <Link href="/protected/advertisement" className="block px-4 py-2 rounded">
              My Posts
            </Link>
          </li>

          <li className="pt-3 border-brand-purple m-2 flex justify-center">
            <LogoutButton />
          </li>
        </ul>
      )}
    </nav>
  )
}

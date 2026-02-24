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
    <nav className="relative w-full" ref={navRef}>
      {/* Menü Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setOpen(!open)}
          className="w-full py-3 bg-brand-teal text-white
                     hover:bg-brand-teal/90
                     transition-all duration-200
                     font-semibold tracking-wide"
        >
       <strong>Menü</strong>
        </button>
      </div>

      {/* Dropdown*/}
      {open && (
        <ul className="absolute left-1/2 top-full -translate-x-1/2
                       w-56  rounded-lg shadow-lg
                       flex flex-col items-center gap-1 py-2 z-50
                       bg-gradient-to-t from-brand-magenta to-brand-teal">
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

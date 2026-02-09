'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LogoutButton } from '@/components/logout-button'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="relative w-full">
      {/* Menü Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setOpen(!open)}
          className="w-full py-2 border bg-white hover:bg-gray-100"
        >
          Menü
        </button>
      </div>

      {/* Dropdown*/}
      {open && (
        <ul className="absolute left-1/2 top-full -translate-x-1/2
                       w-56 bg-white border rounded-lg shadow-lg
                       flex flex-col items-center gap-1 py-2 z-50">
          <li>
            <Link href="/protected" className="block px-4 py-2 hover:bg-gray-100 rounded">
              Startseite
            </Link>
          </li>

          <li>
            <Link href="/protected/profile" className="block px-4 py-2 hover:bg-gray-100 rounded">
              Profil
            </Link>
          </li>

          <li>
            <Link href="/protected/sessions" className="block px-4 py-2 hover:bg-gray-100 rounded">
              Meine Sessions
            </Link>
          </li>

          <li>
            <Link href="/protected/advertisement" className="block px-4 py-2 hover:bg-gray-100 rounded">
              Meine Anzeigen
            </Link>
          </li>

          <li className="pt-2">
            <LogoutButton />
          </li>
        </ul>
      )}
    </nav>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LogoutButton } from '@/components/logout-button'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav>
      {/* Menü-Button */}
      <button onClick={() => setOpen(!open)}>
        Menü
      </button>

      {/* Dropdown */}
      {open && (
        <ul>
          <li>
            <Link href="/protected">Startseite</Link>
          </li>
          <li>
            <Link href="/protected/profile">Profil</Link>
          </li>
          <li>
            <Link href="/protected/sessions">Meine Sessions</Link>
          </li>
          <li>
            <Link href="/protected/advertisement">Meine Anzeigen</Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      )}
    </nav>
  )
}

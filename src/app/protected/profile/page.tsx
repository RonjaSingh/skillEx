

'use client'

import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()
  return (
    <div>
      <h1>Mein Profil</h1>

      <p>
        <strong>Name:</strong> Max Mustermann
      </p>

      <p>
        <strong>Skills:</strong> JavaScript, React
      </p>

      <p>
        <strong>Sprachen:</strong> Englisch
      </p>

      <button>Profil bearbeiten</button>

      <button onClick={() => router.push('/protected/sessions')}>
        Meine Sessions
      </button>
    </div>
  )
}

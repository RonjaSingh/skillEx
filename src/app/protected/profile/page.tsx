'use client'

import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const router = useRouter()

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 space-y-6">
    
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Profile:</h1>
        <button className="px-4 py-2 border rounded hover:bg-gray-100 transition">
          Edit Profile
        </button>
      </div>

      <div className="space-y-2">
        <p>
          <strong>Name:</strong> 
        </p>

        <p>
          <strong>Skills:</strong> 
        </p>

        <p>
          <strong>Language:</strong> 
        </p>

   
        <div className="flex justify-between items-center mt-2">
          <p>
            <strong>Attended Sessions:</strong>
          </p>
          <button
            onClick={() => router.push('/protected/sessions')}
            className="px-4 py-2 border rounded hover:bg-gray-100 transition"
          >
            My Sessions
          </button>
        </div>
      </div>
    </div>
  )
}

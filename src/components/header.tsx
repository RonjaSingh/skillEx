
import Image from 'next/image'
import Link from 'next/link'


type HeaderProps = {
  username: string
  avatarUrl?: string | null
}

export function Header({ username, avatarUrl }: HeaderProps) {
  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">

        {/* Left: Logo */}
        <div className="flex items-center gap-3 h-18 overflow-hidden">
          <Link href="/protected">
            <Image
              src="/skillexchange2.0.png"
              alt="Logo"
              width={1024}
              height={1024}
              className="h-42 w-80 object-cover cursor-pointer mt-2" />
          </Link>

        </div>

        {/* Right: User */}
        <Link
          href="/protected/profile"
          className="flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
        >
          <span className="text-md font-medium text-gray-800">
            <strong>{username}</strong>
          </span>

          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Avatar"
                width={36}
                height={36}
              />
            ) : (
              <span className="text-lg">👤</span>
            )}
          </div>
        </Link>

      </div>
    </header>
  )
}

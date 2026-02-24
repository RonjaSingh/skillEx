
import Image from 'next/image'
import Link from 'next/link'


type HeaderProps = {
  username: string
  avatarUrl?: string | null
}

export function Header({ username, avatarUrl }: HeaderProps) {
  return (
    <header className="w-full bg-gradient-to-r from-brand-magenta to-brand-teal">
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
          className="flex items-center gap-10 hover:bg-white/20 px-3 py-2 rounded-xl transition backdrop-blur-sm"
        >
          <span className="text-xl font-medium text-black">
            <strong>{username}</strong>
          </span>

          <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center shadow-md border border-white/30">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Avatar"
                width={64}
                height={64}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-2xl">👤</span>
            )}
          </div>
        </Link>

      </div>
    </header>
  )
}

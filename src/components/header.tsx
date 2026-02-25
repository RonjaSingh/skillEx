
import Image from 'next/image'
import Link from 'next/link'

import { Navbar } from './navbar'


type HeaderProps = {
  username: string
  avatarUrl?: string | null
}

export function Header({ username, avatarUrl }: HeaderProps) {
  return (
    <header className="w-full bg-gradient-to-r from-brand-magenta to-brand-teal">
      <div className="max-w-6xl mx-auto px-6 pt-6
                grid grid-cols-[auto_1fr_auto]
                items-center gap-x-12">

        {/* Left: Logo */}
        <div className="flex justify-start overflow-hidden">
          <Link href="/protected">
            <Image
              src="/skillexchange2.0.png"
              alt="Logo"
              width={600}
              height={600}
              className="h-20 w-72 object-cover cursor-pointer mt-2" />
          </Link>

        </div>


         <div className="flex justify-center">
        <Navbar />
      </div>

        {/* Right: User */}
        <div className='flex justify-end'>
        <Link
          href="/protected/profile"
          className="group relative flex items-center gap-4
               px-6 py-3 rounded-2xl
               bg-white/10
               hover:bg-white/20
               backdrop-blur-xl
               border border-white/20
               shadow-lg
               transition-all duration-300 hover:shadow-md hover:-translate-y-0.5   max-w-[220px] flex-shrink"
        >
          <span className="text-lg font-semibold text-gray-800 tracking-wide 
           truncate ">
            {username}
          </span>

          <div className="w-16 h-16 flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center shadow-md border border-white/30">
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
      </div>
    </header>
  )
}

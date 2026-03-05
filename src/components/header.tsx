
import Image from 'next/image'
import Link from 'next/link'

import { Navbar } from './navbar'


type HeaderProps = {
  username: string
  avatarUrl?: string | null
}

export function Header({ username, avatarUrl }: HeaderProps) {
  return (
    <header className="w-full h-22 bg-gradient-to-r from-brand-magenta to-brand-teal">
      <div className="mx-auto px-12 pt-6 grid grid-cols-[auto_1fr_auto] items-center gap-x-6">

        {/* Left: Logo */}
        <div className=" flex justify-start">
          <Link href="/protected">
            <Image
              src="/skillexchange2.0.png"
              alt="Logo"
              width={248}
              height={80}
              className="h-20 w-[160px] sm:w-[200px] lg:w-[248px] object-cover rounded-full cursor-pointer" />
          </Link>

        </div>


        <div className="flex justify-center items-center min-w-0">
          <Navbar />
        </div>

        {/* Right: User */}
        <div className='flex justify-end'>
          <Link
            href="/protected/profile"
            className="group flex items-center gap-3 px-4 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 transition-all duration-300"
          >
         <span className="hidden sm:flex text-md font-medium text-gray-800 max-w-[120px] truncate items-center">
              {username}
            </span>

            <div className="w-16 h-16 flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center shadow-md border border-white/30">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt="Avatar"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="flex items-center justify-center w-full h-full text-sm">👤</span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}

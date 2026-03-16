
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
  <div className="mx-auto px-6 lg:px-12 pt-6 grid grid-cols-2 lg:grid-cols-[auto_1fr_auto] grid-rows-[auto_auto] lg:grid-rows-1 items-center gap-x-4 gap-y-3">

        {/* Left: Logo */}
    <div className="col-span-2 lg:col-span-1 row-start-1 flex justify-center lg:justify-start">
          <Link href="/protected">
            <Image
              src="/skillexchange2.0.png"
              alt="Logo"
              width={248}
              height={80}
              className="h-20 w-[160px] sm:w-[200px] lg:w-[248px] object-cover rounded-full cursor-pointer" />
          </Link>

        </div>

<div className="row-start-2 lg:row-start-auto flex justify-center lg:justify-center items-center min-w-0">
          <Navbar />
        </div>

        {/* Right: User */}
     <div className="row-start-2 lg:row-start-auto flex justify-center lg:justify-end">
          <Link
            href="/protected/profile"
            className="group flex items-center gap-5 px-10 h-20 rounded-full  hover:bg-white/8 backdrop-blur-md  transition-all duration-300"
          >
         <span className=" sm:flex text-xl font-semibold font-medium text-gray-800 max-w-[120px] truncate items-center">
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

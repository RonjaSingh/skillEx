import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import Link from 'next/link'


export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card className="
  bg-white/20
  border-white/10
  text-gray-800
  placeholder:text-gray-500
  backdrop-blur-md
  focus:ring-1
  transition-all
  duration-200">
            <CardHeader>
              <CardTitle className="text-2xl">Thank you for signing up!</CardTitle>
              <CardDescription className='text-gray-800 mt-2' >Check your email to confirm</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-800 mb-5">
                You&apos;ve successfully signed up. Please check your email to confirm your account
                before signing in.
              </p>

              <Link
                href="/auth/login"
                className="w-full
    p-2
    rounded-xl
    bg-white/15
    backdrop-blur-md
    text-gray-800
    font-semibold
    text-md
    shadow-lg
    hover:bg-white/35
    "
              >
                Go to Login
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

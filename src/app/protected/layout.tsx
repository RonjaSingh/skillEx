import { Navbar } from '@/components/navbar'
import { Header } from '@/components/header'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header
        username=""
        avatarUrl={null} />
      <Navbar />

      <main>{children}</main>
    </>
  )
}

import { Navbar } from '@/components/navbar'
import { Header } from '@/components/header'

import SkillSearch from "@/components/skillsearch";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header
        username="Username"
        avatarUrl={null} />
      <Navbar />

      <div>
        <SkillSearch />
      </div>
      <main>{children}</main>
    </>
  )
}

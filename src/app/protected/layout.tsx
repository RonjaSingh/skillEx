

import { Navbar } from '@/components/navbar'
import { Header } from '@/components/header'
import { getCurrentUsername } from "@/lib/get-current-username";

import SkillSearch from "@/components/skillsearch";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const profile = await getCurrentUsername();

  return (
    <>
      <Header
        username={profile?.name ?? "Username"}
        avatarUrl={null} />
      <Navbar />

      <div>
        <SkillSearch />
      </div>
      <main>{children}</main>
    </>
  )
}

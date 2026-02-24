

import { Navbar } from '@/components/navbar'
import { Header } from '@/components/header'
import Footer from "@/components/footer";
import { getCurrentUsername } from "@/lib/get-current-username";
import { getCurrentImage } from '@/lib/get-current-image';

import SkillSearch from "@/components/skillsearch";


export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const profile = await getCurrentUsername();
  const avatarUrl = await getCurrentImage();

  return (
   <div className="min-h-screen flex flex-col ">

      <Header
        username={profile?.name ?? "Username"}
         avatarUrl={avatarUrl} />
      <Navbar />

      <div>
        <SkillSearch />
      </div>

      <main className="flex-1">{children}</main>

    <Footer />
    </div>
  )
}

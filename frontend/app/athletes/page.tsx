import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
// import { AthleteList } from "@/components/sections/athlete-list"

export default function AthletesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main>
        {/* <AthleteList /> */}
      </main>
      <Footer />
    </div>
  )
}


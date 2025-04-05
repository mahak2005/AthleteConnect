import MatchHero from "@/components/sections/match-hero"
import SportBrowser from "@/components/sections/sport-browser"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
// import { AthleteGrid } from "@/components/sections/athlete-grid"

export default function MatchWithAthletesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <MatchHero />
        {/* <AthleteGrid /> */}
        <SportBrowser />
      </main>
      <Footer />
    </div>
  )
}


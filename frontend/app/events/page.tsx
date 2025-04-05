import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { EventsGrid } from "@/components/sections/events-grid"
import { EventsHeader } from "@/components/sections/events-header"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-16">
        <EventsHeader />
        <EventsGrid />
      </main>
      <Footer />
    </div>
  )
}


import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CoachGrid } from "@/components/sections/coach-grid"
import { CoachCategories } from "@/components/sections/coach-categories"

export default function FindYourCoachPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-20 bg-gradient-to-b from-teal-500 to-teal-300 px-4">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl text-white font-bold text-center mb-8">Find Your Perfect Coach</h1>
          <CoachGrid />
          <CoachCategories />
        </div>
      </main>
      <Footer />
    </div>
  )
}


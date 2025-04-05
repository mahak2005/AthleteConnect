import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { AIMatchingResults } from "@/components/sections/ai-matching-results"

export default function AIMatchingResultsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <AIMatchingResults />
        </div>
      </main>
      <Footer />
    </div>
  )
}


import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { PricingSection } from "@/components/sections/pricing-section"
import { FaqSection } from "@/components/sections/faq-section"

export default function PlansPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20 ">
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}


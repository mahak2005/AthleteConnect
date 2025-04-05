import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { AIMatchingForm } from "@/components/sections/ai-matching-form"

export default function AIMatchingPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="pt-20">
                <div className="container mx-auto px-4 py-8">
                    <AIMatchingForm />
                </div>
            </main>
            <Footer />
        </div>
    )
}


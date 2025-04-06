"use client"

import { CoachGrid } from "@/components/sections/coach-grid"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function CoachesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <CoachGrid />
      </main>
      <Footer />
    </div>
  )
} 
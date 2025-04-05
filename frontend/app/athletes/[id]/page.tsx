"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { AthleteProfile } from "@/components/sections/athlete-profile"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

export default function AthletePage() {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchAthleteProfile(params.id as string)
    }
  }, [params.id])

  const fetchAthleteProfile = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5001/api/athlete/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch athlete profile')
      }
      const data = await response.json()
      // You can store this data in a state or context to pass to AthleteProfile
      setLoading(false)
    } catch (error) {
      console.error('Error fetching athlete profile:', error)
      setError('Failed to load athlete profile')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">Loading...</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-red-500">{error}</div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-16">
        <AthleteProfile id={params.id as string} />
      </main>
      <Footer />
    </div>
  )
}


"use client"

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { AthleteProfile } from '@/components/sections/athlete-profile'

interface AthleteData {
  _id: string;
  name: string;
  image: string;
  country: string;
  basicInfo: {
    fullName: string;
    age: number;
    gender: string;
    nationality: string;
    state: string;
    sport: string;
    category: string;
    currentRanking: string;
  };
  about: string;
  achievements: {
    medals: string[];
    records: string[];
    awards: string[];
  };
  sponsorship: {
    needs: string[];
    impact: string;
  };
  social: {
    instagram: string;
    twitter: string;
    facebook: string;
  };
  contact: {
    email: string;
    phone: string;
  };
}

export default function AthletePage() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [athleteData, setAthleteData] = useState<AthleteData | null>(null)

  const fetchAthleteProfile = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`http://localhost:5001/api/athlete/${id}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch athlete profile')
      }

      setAthleteData(data)
    } catch (error) {
      console.error('Error fetching athlete profile:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch athlete profile')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchAthleteProfile()
  }, [fetchAthleteProfile])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={fetchAthleteProfile}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <AthleteProfile id={id as string} />
      </main>
      <Footer />
    </div>
  )
}


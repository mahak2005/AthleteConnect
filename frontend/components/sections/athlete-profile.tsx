"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
// import { Button } from "@/components/ui/button"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Share2, Instagram, Twitter, Facebook, MapPin, Globe, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface AthleteProfileProps {
  id: string
}

interface AthleteData {
  _id: string
  name: string
  image: string
  country: string
  basicInfo: {
    fullName: string
    age: number
    gender: string
    nationality: string
    state: string
    sport: string
    category: string
    currentRanking: string
  }
  about: string
  achievements: {
    medals: string[]
    records: string[]
    awards: string[]
  }
  sponsorship: {
    needs: string[]
    impact: string
  }
  social: {
    instagram: string
    twitter: string
    facebook: string
  }
  contact: {
    email: string
    phone: string
  }
}

export function AthleteProfile({ id }: AthleteProfileProps) {
  const [athleteData, setAthleteData] = useState<AthleteData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAthleteData()
  }, [id])

  const fetchAthleteData = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/athlete/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch athlete data')
      }
      const data = await response.json()
      setAthleteData(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching athlete data:', error)
      setError('Failed to load athlete data')
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>
  }

  if (!athleteData) {
    return <div className="text-center py-8">No athlete data found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="about" className="w-full">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="sponsorship">Sponsorship</TabsTrigger>
            </TabsList>
            <TabsContent value="about" className="space-y-6">
              <section className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">
                  WHY YOU SHOULD SPONSOR ME FOR YOUR NEXT INFLUENCER CAMPAIGN?
                </h2>
                <p className="text-gray-600">{athleteData.about}</p>
              </section>
              <section className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(athleteData.basicInfo).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </section>
            </TabsContent>
            <TabsContent value="achievements" className="space-y-6">
              <section className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Medals & Titles</h2>
                <ul className="list-disc list-inside space-y-2">
                  {athleteData.achievements.medals.map((medal, index) => (
                    <li key={index} className="text-gray-600">
                      {medal}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Records</h2>
                <ul className="list-disc list-inside space-y-2">
                  {athleteData.achievements.records.map((record, index) => (
                    <li key={index} className="text-gray-600">
                      {record}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Awards & Recognition</h2>
                <ul className="list-disc list-inside space-y-2">
                  {athleteData.achievements.awards.map((award, index) => (
                    <li key={index} className="text-gray-600">
                      {award}
                    </li>
                  ))}
                </ul>
              </section>
            </TabsContent>
            <TabsContent value="sponsorship" className="space-y-6">
              <section className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Sponsorship Needs</h2>
                <ul className="list-disc list-inside space-y-2">
                  {athleteData.sponsorship.needs.map((need, index) => (
                    <li key={index} className="text-gray-600">
                      {need}
                    </li>
                  ))}
                </ul>
              </section>
              <section className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Impact</h2>
                <p className="text-gray-600">{athleteData.sponsorship.impact}</p>
              </section>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <section className="bg-white rounded-lg p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                <Image
                  src={athleteData.image}
                  alt={athleteData.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{athleteData.name}</h1>
                <p className="text-gray-600">{athleteData.basicInfo.sport}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span>{athleteData.basicInfo.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-gray-400" />
                <span>{athleteData.country}</span>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <span>{athleteData.contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <span>{athleteData.contact.phone}</span>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Social Media</h2>
            <div className="space-y-4">
              {athleteData.social.instagram && (
                <Link
                  href={`https://instagram.com/${athleteData.social.instagram}`}
                  className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded"
                >
                  <Instagram className="h-5 w-5 text-pink-500" />
                  <span>Instagram</span>
                </Link>
              )}
              {athleteData.social.twitter && (
                <Link
                  href={`https://twitter.com/${athleteData.social.twitter}`}
                  className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded"
                >
                  <Twitter className="h-5 w-5 text-blue-400" />
                  <span>Twitter</span>
                </Link>
              )}
              {athleteData.social.facebook && (
                <Link
                  href={`https://facebook.com/${athleteData.social.facebook}`}
                  className="flex items-center gap-2 hover:bg-gray-50 p-2 rounded"
                >
                  <Facebook className="h-5 w-5 text-blue-600" />
                  <span>Facebook</span>
                </Link>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}


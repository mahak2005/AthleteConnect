// eslint-disable-next-line @typescript-eslint/no-unused-vars
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
// import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import AthleteGrid from "@/components/sections/athlete-grid"
// import router from "next/router"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react"

// const sportsLeagues = ["MLB/BASEBALL", "NFL/FOOTBALL", "NBA/BASKETBALL", "NHL/HOCKEY", "COLLEGE"]

interface Athlete {
  _id: string
  name: string
  gender: string
  team: string
  sport: string
  location: string
  image: string
  status: string
  basicInfo: {
    gender: string
    state: string
    sport: string
    currentRanking: string
  }
}

export default function MatchHero() {
  const [selectedSport, setSelectedSport] = useState<string>("")
  const [selectedGender, setSelectedGender] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [showAthletes, setShowAthletes] = useState(false)
  const [athletes, setAthletes] = useState<Athlete[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchAthletes()
  }, [])

  const fetchAthletes = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/athlete/all')
      if (!response.ok) {
        throw new Error('Failed to fetch athletes')
      }
      const data = await response.json()
      // Transform the data to match the expected format
      const transformedAthletes: Athlete[] = data.map((athlete: Athlete) => ({
        _id: athlete._id,
        name: athlete.name,
        gender: athlete.basicInfo.gender || '',
        team: 'Independent', // Default value since it's not in the schema
        sport: athlete.basicInfo.sport || '',
        location: athlete.basicInfo.state || '',
        image: athlete.image || '/ath.jpg',
        status: athlete.basicInfo.currentRanking || '',
        basicInfo: athlete.basicInfo
      }))
      setAthletes(transformedAthletes)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching athletes:', error)
      setLoading(false)
    }
  }

  // Filter function to pass the values to AthleteGrid
  const filteredAthletes = athletes.filter((athlete) => {
    const sportMatch = selectedSport ? athlete.sport.toLowerCase() === selectedSport.toLowerCase() : true
    const genderMatch = selectedGender ? athlete.gender.toLowerCase() === selectedGender.toLowerCase() : true
    const locationMatch = location ? athlete.location.toLowerCase().includes(location.toLowerCase()) : true
    return sportMatch && genderMatch && locationMatch
  })

  return (
    <section className="pt-24 pb-12 bg-gradient-to-b from-teal-500 to-teal-400 px-4">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Browse our industry-leading sports sponsorship database
        </motion.h1>

        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-slate-600 mb-6">
            Search through our extensive database of athletes and teams, in over 50
            sports to find the right sports sponsorship for your campaign.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">SPORTS</label>
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tennis">Tennis</SelectItem>
                  <SelectItem value="Basketball">Basketball</SelectItem>
                  <SelectItem value="Hockey">Hockey</SelectItem>
                  <SelectItem value="Cricket">Cricket</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">GENDER</label>
              <Select value={selectedGender} onValueChange={setSelectedGender}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">LOCATION</label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Haryana">Haryana</SelectItem>
                  <SelectItem value="Punjab">Punjab</SelectItem>
                  <SelectItem value="Maharastra">Maharastra</SelectItem>
                </SelectContent>
              </Select>
            </div>


          </div>

          {/* <div className="flex justify-center"> */}
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-teal-700 hover:bg-teal-500"
              onClick={() => setShowAthletes(!showAthletes)}
            >
              {showAthletes ? "HIDE ATHLETES" : "VIEW ALL ATHLETES"}
            </Button>

            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 flex items-center gap-2"
              onClick={() => router.push("/match-with-athletes/ai-matching")}
            >
              <Sparkles className="h-5 w-5" />
              SMART MATCHING - FIND YOUR BEST FIT
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* <Button variant="outline" size="lg" className="bg-teal-600 hover:bg-teal-700 text-white">
            SPEAK TO A SPORTS MARKETING EXPERT
          </Button> */}
        </motion.div>
      </div>

      {showAthletes && <AthleteGrid athletes={filteredAthletes} />}
    </section>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
// import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AthleteGrid } from "@/components/sections/athlete-grid"
// import router from "next/router"
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react"

// const sportsLeagues = ["MLB/BASEBALL", "NFL/FOOTBALL", "NBA/BASKETBALL", "NHL/HOCKEY", "COLLEGE"]

interface Athlete {
  id: number
  name: string
  gender: string
  team: string
  sport: string
  location: string
  image: string
  status: string
}

const athletes: Athlete[] = [
  {
    id: 1,
    name: "Aakash Chopra",
    gender: "male",
    team: "Independent",
    sport: "Javelin Throw",
    location: "Haryana",
    image: "/jav.jpg",
    status: "National Icon",
  },
  {
    id: 2,
    name: "Priya Deshmukh",
    gender: "female",
    team: "Independent",
    sport: "Badminton",
    location: "Punjab",
    image: "/badmin.jpg",
    status: "National Player",
  },
  {
    id: 3,
    name: "Aarav Patel",
    gender: "male",
    team: "Hockey- Delhi",
    sport: "Hockey",
    location: "Delhi",
    image: "/hockey.jpg",
    status: "State Player",
  },
  {
    id: 4,
    name: "Rahul Mehra",
    gender: "male",
    team: "Independent",
    sport: "Tennis",
    location: "Punjab",
    image: "/ten.jpg",
    status: "Upcoming Athlete",
  },
  {
    id: 5,
    name: "Ishita Jha",
    gender: "female",
    team: "Play-India",
    sport: "Basketball",
    location: "Manipur",
    image: "/basket.jpg",
    status: "Legend",
  },
  {
    id: 6,
    name: "Rohan Bopanna",
    gender: "male",
    team: "Independent",
    sport: "Athletics",
    location: "Maharastra",
    image: "/ath.jpg",
    status: "National Player",
  },
  {
    id: 7,
    name: "Dipa Karmakar",
    gender: "female",
    team: "Independent",
    sport: "Gymnastics",
    location: "Haryana",
    image: "/badmin.jpg",
    status: "National Icon",
  },
  {
    id: 8,
    name: "Rahul Sachdeva",
    gender: "male",
    team: "RCB",
    sport: "Cricket",
    location: "Delhi",
    image: "/ten.jpg",
    status: "National Icon",
  },
  {
    id: 9,
    name: "Rishit Sharma",
    gender: "male",
    team: "Team ARB",
    sport: "Cricket",
    location: "Haryana",
    image: "/basket.jpg",
    status: "Upcoming Athlete",
  },
]

export default function MatchHero() {
  const [selectedSport, setSelectedSport] = useState<string>("")
  const [selectedGender, setSelectedGender] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const [showAthletes, setShowAthletes] = useState(false)
  const router = useRouter()

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

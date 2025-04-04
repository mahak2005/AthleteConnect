"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, TrendingUp } from "lucide-react"
import AthleteCard from "@/components/athlete-card"
import { athletes } from "@/data/athletes"

const sports = ["All Sports", "Track & Field", "Basketball", "Swimming", "Soccer", "Gymnastics", "Cricket"]
const countries = ["All Countries", "Mexico", "Ghana", "India", "Colombia", "Senegal", "Nepal"]

export default function AthletesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSport, setSelectedSport] = useState("All Sports")
  const [selectedCountry, setSelectedCountry] = useState("All Countries")

  const filteredAthletes = athletes.filter((athlete) => {
    const matchesSearch =
      athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      athlete.story.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSport = selectedSport === "All Sports" || athlete.sport === selectedSport
    const matchesCountry = selectedCountry === "All Countries" || athlete.country === selectedCountry

    return matchesSearch && matchesSport && matchesCountry
  })

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <Badge variant="outline" className="mb-4">
          Discover
        </Badge>
        <h1 className="text-4xl font-bold mb-4">
          Find and Support <span className="gradient-text">Rising Stars</span>
        </h1>
        <p className="text-muted-foreground">
          Browse through our database of talented athletes from around the world. Filter by sport, country, or search
          for specific athletes.
        </p>
      </motion.div>

      <div className="mb-8">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <TabsList>
              <TabsTrigger value="all">All Athletes</TabsTrigger>
              <TabsTrigger value="featured">
                <TrendingUp className="h-4 w-4 mr-2" />
                Featured
              </TabsTrigger>
              <TabsTrigger value="new">Newest</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search athletes..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <div className="w-full sm:w-auto">
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sport" />
                </SelectTrigger>
                <SelectContent>
                  {sports.map((sport) => (
                    <SelectItem key={sport} value={sport}>
                      {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-auto">
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="all" className="mt-0">
            {filteredAthletes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAthletes.map((athlete) => (
                  <AthleteCard key={athlete.id} athlete={athlete} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No athletes found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="featured" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {athletes
                .filter((athlete) => athlete.featured)
                .map((athlete) => (
                  <AthleteCard key={athlete.id} athlete={athlete} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* For demo purposes, showing all athletes as "new" */}
              {athletes.slice(0, 3).map((athlete) => (
                <AthleteCard key={athlete.id} athlete={athlete} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


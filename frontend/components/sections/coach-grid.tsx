"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star } from "lucide-react"
import Link from "next/link"
import { coaches, type Coach } from "@/data/coaches"
import { CoachFilters } from "./coach-filters"

export function CoachGrid() {
  const [filteredCoaches, setFilteredCoaches] = useState<Coach[]>(coaches)

  const handleFilterChange = (filters: {
    search: string
    specialty: string
    location: string
    priceRange: [number, number]
  }) => {
    const filtered = coaches.filter((coach) => {
      // Filter by search term
      if (
        filters.search &&
        !coach.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !coach.description.toLowerCase().includes(filters.search.toLowerCase()) &&
        !coach.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false
      }

      // Filter by specialty
      if (filters.specialty && coach.badge !== filters.specialty) {
        return false
      }

      // Filter by location
      if (filters.location && !coach.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }

      // Filter by price range
      if (coach.hourlyRate < filters.priceRange[0] || coach.hourlyRate > filters.priceRange[1]) {
        return false
      }

      return true
    })

    setFilteredCoaches(filtered)
  }

  return (
    <>
      <CoachFilters onFilterChange={handleFilterChange} />

      {filteredCoaches.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium mb-2">No coaches found</h3>
          <p className="text-gray-600">Try adjusting your filters to find more coaches</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCoaches.map((coach) => (
            <motion.div
              key={coach.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-48">
                <Image src={coach.image || "/placeholder.svg"} alt={coach.name} fill className="object-cover" />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white">
                    {coach.badge}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{coach.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{coach.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-blue-600 mb-1">{coach.title}</p>
                <p className="text-sm text-gray-600 mb-2">{coach.organization}</p>

                <div className="flex items-center gap-1 text-gray-500 mb-3">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{coach.location}</span>
                </div>

                <p className="text-sm text-gray-700 mb-4">{coach.description}</p>

                <div className="flex justify-between items-center">
                  <div className="text-teal-600 font-medium">Rs{coach.hourlyRate}/hour</div>
                  <Link href={`/coaches/${coach.id}`}>
                    <Button className="bg-teal-600 hover:bg-teal-700">View Profile</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  )
}


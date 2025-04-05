"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Share2 } from "lucide-react"

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

interface AthleteGridProps {
  athletes: Athlete[]
}

export default function AthleteGrid({ athletes }: AthleteGridProps) {
  if (athletes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No athletes found matching your criteria.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {athletes.map((athlete, index) => (
        <motion.div
          key={athlete._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={athlete.image}
                alt={athlete.name}
                fill
                className="object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-black/50 text-white">
                {athlete.status}
              </Badge>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{athlete.name}</h3>
                  <p className="text-sm text-gray-500">
                    {athlete.sport} • {athlete.team}
                  </p>
                </div>
                <Button size="icon" variant="ghost">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>{athlete.location}</span>
              </div>
              <Link href={`/athletes/${athlete._id}`}>
                <Button className="w-full">View Profile</Button>
              </Link>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}


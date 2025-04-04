// eslint-disable-next-line @typescript-eslint/no-unused-vars
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { EventCard } from "@/components/ui/event-card"

// Events related to Limitless Athlete
const allEvents = [
  {
    id: 1,
    title: "Limitless Virtual Training Camp",
    type: "Training",
    themes: ["FITNESS", "ATHLETE DEVELOPMENT"],
    status: {
      mode: "ONLINE",
      state: "OPEN",
      date: "STARTS 25/02/25",
    },
    participants: {
      count: "+300",
      avatars: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
    links: {
      website: "#",
      discord: "#",
    },
    sport: "Multi-Sport",
  },
  {
    id: 2,
    title: "Athlete Sponsorship Program",
    type: "Funding",
    themes: ["FINANCIAL AID", "MENTORSHIP"],
    status: {
      mode: "OFFLINE",
      state: "OPEN",
      date: "STARTS 10/03/25",
    },
    participants: {
      count: "+500",
      avatars: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
    links: {
      website: "#",
      instagram: "#",
    },
    sport: "Multi-Sport",
  },
  {
    id: 3,
    title: "Para Sports Championship",
    type: "Competition",
    themes: ["INCLUSION", "ADAPTIVE SPORTS"],
    status: {
      mode: "OFFLINE",
      state: "OPEN",
      date: "STARTS 18/04/25",
    },
    participants: {
      count: "+400",
      avatars: [
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
        "/placeholder.svg?height=32&width=32",
      ],
    },
    links: {
      website: "#",
      twitter: "#",
    },
    sport: "Adaptive Sports",
  },
]

export function EventsGrid() {
  // const [searchQuery, setSearchQuery] = useState("")
  const [searchQuery] = useState("")
  // const [selectedSports, setSelectedSports] = useState<string[]>([])
  const [selectedSports] = useState<string[]>([])
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Filter events based on search query, selected sports, and date
  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.type.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSport = selectedSports.length === 0 || selectedSports.includes(event.sport)

    return matchesSearch && matchesSport
  })

  return (
    <section className="py-12">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
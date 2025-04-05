"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Star, Share2, Download, Filter } from "lucide-react"

// Mock data for matched athletes
const matchedAthletes = [
    {
        id: 1,
        name: "LeBron James",
        match: 98,
        sport: "Basketball",
        team: "Los Angeles Lakers",
        location: "Los Angeles, CA",
        image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-17%20at%209.08.12%E2%80%AFPM-RuxyYJhl2Nuql7yO4LB75Zm5jvtftB.png",
        highlights: ["Global reach", "High engagement", "Brand ambassador experience"],
    },
    {
        id: 2,
        name: "Serena Williams",
        match: 95,
        sport: "Tennis",
        team: "Independent",
        location: "Palm Beach, FL",
        image: "/placeholder.svg?height=400&width=400",
        highlights: ["Female audience", "Inspirational figure", "Multiple endorsements"],
    },
    {
        id: 3,
        name: "Cristiano Ronaldo",
        match: 92,
        sport: "Soccer",
        team: "Al Nassr FC",
        location: "Riyadh, Saudi Arabia",
        image: "/placeholder.svg?height=400&width=400",
        highlights: ["Massive social following", "Global icon", "Fitness focused"],
    },
    {
        id: 4,
        name: "Simone Biles",
        match: 89,
        sport: "Gymnastics",
        team: "USA Gymnastics",
        location: "Spring, TX",
        image: "/placeholder.svg?height=400&width=400",
        highlights: ["Youth appeal", "Overcoming challenges", "Olympic gold medalist"],
    },
    {
        id: 5,
        name: "Stephen Curry",
        match: 87,
        sport: "Basketball",
        team: "Golden State Warriors",
        location: "San Francisco, CA",
        image: "/placeholder.svg?height=400&width=400",
        highlights: ["Family friendly", "Tech savvy", "Community focused"],
    },
]

export function AIMatchingResults() {
    return (
        <div className="max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8 text-center"
            >
                <div className="inline-flex items-center justify-center p-2 bg-teal-100 rounded-full mb-4">
                    <Sparkles className="h-6 w-6 text-teal-600" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Your AI-Matched Athletes</h1>
                <p className="text-gray-600 mb-4">
                    Based on your requirements, we have found these perfect matches for your sponsorship campaign
                </p>
                <div className="flex justify-center gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Filter Results
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                        Export to PDF
                    </Button>
                </div>
            </motion.div>

            <div className="space-y-6">
                {matchedAthletes.map((athlete, index) => (
                    <motion.div
                        key={athlete.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card className="overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                                <div className="relative w-full md:w-1/4 h-48 md:h-auto">
                                    <Image src={athlete.image || "/placeholder.svg"} alt={athlete.name} fill className="object-cover" />
                                    <div className="absolute top-2 right-2">
                                        <Badge className="bg-teal-600">
                                            <Sparkles className="h-3 w-3 mr-1" />
                                            {athlete.match}% Match
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex-1 p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-2xl font-bold mb-1">{athlete.name}</h2>
                                            <p className="text-gray-600 mb-2">
                                                {athlete.sport} • {athlete.team} • {athlete.location}
                                            </p>
                                        </div>
                                        <Button size="icon" variant="ghost">
                                            <Share2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="font-semibold mb-2">Why this is a great match:</h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                            {athlete.highlights.map((highlight, i) => (
                                                <li key={i} className="flex items-center gap-2">
                                                    <Star className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                                                    <span className="text-sm">{highlight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <Link href={`/athletes/${athlete.id}`}>
                                            <Button>View Full Profile</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 text-center"
            >
                <p className="text-gray-600 mb-4">Not seeing what you are looking for?</p>
                <div className="flex justify-center gap-4">
                    <Button variant="outline">Refine Search</Button>
                    <Button>Contact a Sponsorship Expert</Button>
                </div>
            </motion.div>
        </div>
    )
}


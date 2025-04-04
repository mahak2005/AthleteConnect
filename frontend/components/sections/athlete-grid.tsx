"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Add `athletes` prop to the component
interface Athlete {
  id: number
  name: string
  team: string
  sport: string
  location: string
  image: string
  status: string
}

interface AthleteGridProps {
  athletes: Athlete[] // Define the prop to accept athletes
}

export function AthleteGrid({ athletes }: AthleteGridProps) {
  return (
    <section className="py-12 bg-slate-50">
      <div className="container mx-auto px-4 ">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {athletes.map((athlete) => (
              <motion.div
                key={athlete.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative bg-gradient-to-b from-blue-500 to-lightblue-400 p-6 pb-24">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-semibold text-white">
                     {athlete.name}
                      <span className="ml-2">({athlete.location})</span>
                    </h3>
                  </div>
                  {/* <div className="flex items-center gap-2 mt-2">
                    <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm">Athlete</span>
                  </div> */}
                  <p className="text-white/90 mt-2">
                    {athlete.sport} - Team: {athlete.team}
                  </p>
                </div>
                <div className="relative px-6 pb-6">
                  <div className="absolute -top-20 left-6 w-32 h-32 rounded-full border-4 border-white overflow-hidden">
                    <Image
                      src={athlete.image || "/placeholder.svg"}
                      alt={athlete.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="pt-16 flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">{athlete.status}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Link href={`/athletes/${athlete.id}`}>
                        <Button className="bg-blue-500 hover:bg-blue-600">WORK WITH ME</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


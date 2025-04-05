"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Dumbbell,
  Brain,
  Apple,
  Activity,
  Heart,
  Trophy,
  MonitorIcon as Running,
  FishIcon as Swimming,
  ClubIcon as Football,
  TurtleIcon as Tennis,
} from "lucide-react"

const categories = [
  {
    id: 1,
    name: "Performance Training",
    icon: Dumbbell,
    color: "bg-red-100",
    textColor: "text-red-600",
  },
  {
    id: 2,
    name: "Mental Coaching",
    icon: Brain,
    color: "bg-purple-100",
    textColor: "text-purple-600",
  },
  {
    id: 3,
    name: "Sports Nutrition",
    icon: Apple,
    color: "bg-green-100",
    textColor: "text-green-600",
  },
  {
    id: 4,
    name: "Physiotherapy",
    icon: Activity,
    color: "bg-teal-100",
    textColor: "text-teal-600",
  },
  {
    id: 5,
    name: "Recovery & Wellness",
    icon: Heart,
    color: "bg-pink-100",
    textColor: "text-pink-600",
  },
  {
    id: 6,
    name: "Competition Prep",
    icon: Trophy,
    color: "bg-yellow-100",
    textColor: "text-yellow-600",
  },
]

const sports = [
  {
    id: 7,
    name: "Running",
    icon: Running,
    color: "bg-orange-100",
    textColor: "text-orange-600",
  },
  {
    id: 8,
    name: "Swimming",
    icon: Swimming,
    color: "bg-cyan-100",
    textColor: "text-cyan-600",
  },
  {
    id: 9,
    name: "Football",
    icon: Football,
    color: "bg-emerald-100",
    textColor: "text-emerald-600",
  },
  {
    id: 10,
    name: "Tennis",
    icon: Tennis,
    color: "bg-violet-100",
    textColor: "text-violet-600",
  },
]

export function CoachCategories() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <motion.div key={category.id} whileHover={{ y: -5 }} className="group">
              <Link href={`/find-your-coach/category/${category.id}`}>
                <div className={`${category.color} rounded-lg p-6 text-center transition-shadow hover:shadow-md`}>
                  <category.icon className={`mx-auto h-8 w-8 mb-3 ${category.textColor}`} />
                  <h3 className="font-medium text-sm">{category.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6">Browse by Sport</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {sports.map((sport) => (
            <motion.div key={sport.id} whileHover={{ y: -5 }} className="group">
              <Link href={`/find-your-coach/sport/${sport.id}`}>
                <div className={`${sport.color} rounded-lg p-6 text-center transition-shadow hover:shadow-md`}>
                  <sport.icon className={`mx-auto h-8 w-8 mb-3 ${sport.textColor}`} />
                  <h3 className="font-medium text-sm">{sport.name}</h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


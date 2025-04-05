"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Coach {
  id: number
  name: string
  title: string
  organization: string
  description: string
  image: string
  badge: string
}

const coaches: Coach[] = [
  {
    id: 1,
    name: "Rahul Negi",
    title: "Head Performance Coach",
    organization: "Elite Sports Academy",
    description: "Former Olympic athlete specializing in sprint training and athletic performance",
    image: "/c1.jpg",
    badge: "Performance",
  },
  {
    id: 2,
    name: "Dr. Sarah Khan",
    title: "Sports Nutritionist",
    organization: "Peak Nutrition",
    description: "Certified nutritionist with expertise in athlete diet planning and performance nutrition",
    image: "/c3.jpg",
    badge: "Nutrition",
  },
  {
    id: 3,
    name: "Dr. Pankaj Singh",
    title: "Head Physiotherapist",
    organization: "Sports Medicine Center",
    description: "Specialist in sports injury rehabilitation and prevention",
    image: "/c2.jpg",
    badge: "Physiotherapy",
  },
  // {
  //   id: 4,
  //   name: "Dr. Maya Patel",
  //   title: "Mental Performance Coach",
  //   organization: "Mind Athletes",
  //   description: "Sports psychologist helping athletes achieve peak mental performance",
  //   image: "/c3.jpg",
  //   badge: "Mental Training",
  // },
  // {
  //   id: 5,
  //   name: "Vikash Kumar",
  //   title: "Strength & Conditioning",
  //   organization: "Power Performance",
  //   description: "Expert in developing customized strength training programs for athletes",
  //   image: "/c1.jpg",
  //   badge: "Training",
  // },
  // {
  //   id: 6,
  //   name: "Mira Sharma",
  //   title: "Recovery Specialist",
  //   organization: "Athletic Recovery Center",
  //   description: "Specialized in athlete recovery techniques and injury prevention",
  //   image: "/placeholder.svg?height=400&width=400",
  //   badge: "Recovery",
  // },
]

export function CoachGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
      {coaches.map((coach) => (
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
            <h3 className="text-xl font-semibold mb-1">{coach.name}</h3>
            <p className="text-sm text-teal-600 mb-2">{coach.title}</p>
            <p className="text-sm text-gray-600 mb-4">{coach.organization}</p>
            <p className="text-sm text-gray-700 mb-4">{coach.description}</p>
            <Link href={`/coaches/${coach.id}`}>
              <Button className="w-full bg-teal-700 hover:bg-teal-500">View Profile</Button>
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  )
}


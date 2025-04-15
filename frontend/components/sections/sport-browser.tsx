"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const sports = [

  {
    title: "Sponsor Football",
    profiles: "43 matching profiles",
    image: "/football.jpg",
    href: "/match-with-athletes/football",
  },
  {
    title: "Sponsor Basketball ",
    profiles: "21 matching profiles",
    image: "/basketball.jpg",
    href: "/match-with-athletes/basketball",
  },

  {
    title: "Sponsor Tennis",
    profiles: "42 matching profiles",
    image: "/tennis.jpg",
    href: "/match-with-athletes/tennis",
  },
  {
    title: "Sponsor Running",
    profiles: "41 matching profiles",
    image: "/athletics.jpg",
    href: "/match-with-athletes/running",
  },

  {
    title: "Sponsor Hockey",
    profiles: "42 matching profiles",
    image: "/hockey.jpg",
    href: "/match-with-athletes/hockey",
  },
]

export default function SportBrowser() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Browse by sport
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sports.map((sport, index) => (
            <motion.div
              key={sport.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={sport.href} className="group block relative overflow-hidden rounded-lg aspect-[4/3]">
                <Image
                  src={sport.image || "/placeholder.svg"}
                  alt={sport.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-2">{sport.title}</h3>
                  <p className="text-white/80 text-sm">{sport.profiles}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const brands = [
  { name: "Walmart", logo: "/placeholder.svg?height=50&width=150" },
  { name: "Vitamin Shoppe", logo: "/placeholder.svg?height=50&width=150" },
  { name: "Travelodge", logo: "/placeholder.svg?height=50&width=150" },
  { name: "Texas", logo: "/placeholder.svg?height=50&width=150" },
  { name: "Stitch Fix", logo: "/placeholder.svg?height=50&width=150" },
  { name: "FanDuel", logo: "/placeholder.svg?height=50&width=150" },
  { name: "Draft Kings", logo: "/placeholder.svg?height=50&width=150" },
]

export function TrustedBy() {
  return (
    <section className="py-12 bg-gradient-to-r from-teal-50 via-white to-teal-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-xl font-semibold text-slate-600 mb-8">TRUSTED BY</h2>
        <div className="relative overflow-hidden">
          <motion.div
            className="flex space-x-12 whitespace-nowrap"
            animate={{
              x: [0, -1920],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
            }}
          >
            {[...brands, ...brands].map((brand, index) => (
              <div key={`${brand.name}-${index}`} className="inline-flex items-center justify-center w-48">
                <Image
                  src={brand.logo || "/placeholder.svg"}
                  alt={brand.name}
                  width={150}
                  height={50}
                  className="h-12 w-auto grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}


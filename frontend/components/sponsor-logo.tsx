"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface Sponsor {
  id: string
  name: string
  logo: string
}

interface SponsorLogoProps {
  sponsor: Sponsor
}

export default function SponsorLogo({ sponsor }: SponsorLogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex items-center justify-center p-4"
    >
      <div className="relative h-12 w-full">
        <Image
          src={sponsor.logo || "/placeholder-logo.svg"}
          alt={sponsor.name}
          fill
          className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
        />
      </div>
    </motion.div>
  )
}


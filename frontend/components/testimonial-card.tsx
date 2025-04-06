"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  role: string
  image: string
  quote: string
  rating: number
  type: "athlete" | "sponsor" | "coach"
}

interface TestimonialCardProps {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex-1">
            <div className="flex mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <p className="italic text-muted-foreground mb-6">{testimonial.quote}</p>
          </div>

          <div className="flex items-center gap-4 mt-4">
            <div className="relative h-12 w-12 rounded-full overflow-hidden">
              <Image
                src={testimonial.image || "/placeholder.svg?height=48&width=48"}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium">{testimonial.name}</h4>
              <p className="text-xs text-muted-foreground">{testimonial.role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}


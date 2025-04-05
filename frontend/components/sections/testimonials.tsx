"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    logo: "/placeholder.svg?height=100&width=200",
    image: "/placeholder.svg?height=300&width=200",
    stat: "2.4%",
    name: "SteadyMD",
    description: "Increase in website traffic",
  },
  {
    logo: "/placeholder.svg?height=100&width=200",
    image: "/placeholder.svg?height=300&width=200",
    stat: "100k+",
    name: "Walmart",
    description: "Store impressions with NIL deals",
  },
  {
    logo: "/placeholder.svg?height=100&width=200",
    image: "/placeholder.svg?height=300&width=200",
    stat: "Over 20%",
    name: "Athleta",
    description: "Engagement rate on Instagram",
  },
]

export function Testimonials() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-teal-50">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          See how our customers drive growth with athletes.
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5 }}
            >
              <Image
                src={testimonial.image || "/placeholder.svg"}
                alt={`${testimonial.name} showcase`}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <Image
                  src={testimonial.logo || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={100}
                  height={50}
                  className="h-8 w-auto mb-4"
                />
                <div className="text-2xl font-bold text-teal-600 mb-2">{testimonial.stat}</div>
                <p className="text-slate-600">{testimonial.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


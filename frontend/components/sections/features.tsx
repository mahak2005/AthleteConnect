"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const features = [
  {
    title: "Find Athletes",
    description:
      "Discover your perfect athlete to collaborate with and elevate your brand. Whether you need a brand ambassador, or a competitive athlete to represent your campaign, connect with athletes who embody your brand's values and message. ",
    image: "/hp1.jpeg",
  },
  {
    title: "Organize Sport Events",
    description: "Host and manage your own sports events with our platform. From registration to promotion, streamline every aspect of your event organization and attract top athletes and sponsors. ",
    image: "/hp2.jpg",
  },
  {
    title: "Collaborate and Grow",
    description:
      "Take your athletic career to new heights by leveraging sponsorships and partnerships. Connect with brands that align with your values and build long-lasting relationships. Grow your influence and expand your network with the right collaborations.",
    image: "/hp3.jpg",
  },
]

export function Features() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white rounded-xl shadow-lg p-6 hover:bg-blue shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="mb-4">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  width={200}
                  height={200}
                  className="w-full h-auto"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


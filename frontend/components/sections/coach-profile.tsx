"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, MapPin, Medal, Star, Users, Video, MessageSquare, Trophy, Heart } from "lucide-react"
import { coaches } from "@/data/coaches"
import { BookingModal } from "@/components/booking/booking-modal"

export function CoachProfile({ id }: { id: string }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)

  // Find the coach by ID
  const coachData = coaches.find((coach) => coach.id.toString() === id) || coaches[0]

  const packages = [
    {
      id: "initial",
      title: "Initial Consultation",
      duration: "30 mins",
      type: "Video Meeting",
      price: 75,
      description: "Discuss your goals and create a preliminary training plan",
    },
    {
      id: "training",
      title: "1:1 Training Session",
      duration: "60 mins",
      type: "In-Person",
      price: 150,
      description: "Personalized training session with technique analysis and feedback",
    },
    {
      id: "monthly",
      title: "Monthly Program",
      duration: "4 weeks",
      type: "Hybrid",
      price: 499,
      description: "Weekly sessions, custom training plan, and ongoing support",
    },
  ]

  const popularServices = [
    {
      id: "assessment",
      title: "Performance Assessment",
      description: "Complete physical assessment and performance benchmarking",
      price: 199,
    },
    {
      id: "competition",
      title: "Competition Prep",
      description: "8-week intensive training program for upcoming competitions",
      price: 899,
    },
  ]

  const handleBookNow = (packageId: string) => {
    setSelectedPackage(packageId)
    setIsBookingModalOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-24"
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative h-64">
                <Image src={coachData.image || "/placeholder.svg"} alt={coachData.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    <Star className="w-4 h-4 mr-1" />
                    {coachData.rating}
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <Users className="w-4 h-4 mr-1" />
                    250+ sessions
                  </Badge>
                </div>
                <h1 className="text-2xl font-bold mb-2">{coachData.name}</h1>
                <p className="text-blue-600 mb-1">{coachData.title}</p>
                <p className="text-gray-600 mb-2">{coachData.organization}</p>

                <div className="flex items-center gap-1 text-gray-500 mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{coachData.location}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {coachData.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Achievements</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Medal className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">Former Olympic Gold Medalist</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Medal className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">USATF Certified Coach</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Medal className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">NSCA Strength & Conditioning Specialist</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Packages & Booking */}
        <div className="lg:col-span-2 space-y-8">
          {/* Value Proposition */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-lg font-medium">
                      Dedicated to helping athletes reach their peak performance through personalized training programs
                    </p>
                  </div>
                  <div className="w-24 h-24 flex-shrink-0">
                    <Trophy className="w-full h-full text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Training Packages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold mb-4">Training Packages</h2>
            <div className="grid gap-4">
              {packages.map((pkg) => (
                <Card key={pkg.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{pkg.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <Clock className="w-4 h-4" />
                          {pkg.duration}
                          <span className="mx-2">•</span>
                          <Video className="w-4 h-4" />
                          {pkg.type}
                        </CardDescription>
                      </div>
                      <Button onClick={() => handleBookNow(pkg.id)} className="bg-teal-600 hover:bg-teal-700">
                        Rs{pkg.price} - Book Now
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{pkg.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Popular Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl font-bold">Popular Services</h2>
            </div>
            <div className="grid gap-4">
              {popularServices.map((service) => (
                <Card key={service.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription className="mt-1">{service.description}</CardDescription>
                      </div>
                      <Button onClick={() => handleBookNow(service.id)} className="bg-teal-600 hover:bg-teal-700">
                        Rs{service.price} - Book Now
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Quick Chat Option */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Quick Question
                    </CardTitle>
                    <CardDescription>Get a quick response about training or programs</CardDescription>
                  </div>
                  <Button variant="outline">Send Message</Button>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        coach={coachData}
        selectedPackage={
          packages.find((p) => p.id === selectedPackage) || popularServices.find((p) => p.id === selectedPackage)
        }
      />
    </div>
  )
}


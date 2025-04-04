"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Medal, Star, Users, Video, MessageSquare, Trophy, Heart } from "lucide-react"

// This would come from your API/database
const coachData = {
    id: "1",
    name: "Rahul Negi",
    title: "Head Performance Coach",
    organization: "Elite Sports Academy",
    image: "/c1.jpg",
    rating: 4.9,
    sessions: 250,
    experience: "15+ years",
    specialties: ["Sprint Training", "Athletic Performance", "Strength & Conditioning"],
    achievements: ["Former Olympic Gold Medalist", "USATF Certified Coach", "NSCA Strength & Conditioning Specialist"],
    commitment: "Dedicated to helping athletes reach their peak performance through personalized training programs",
    packages: [
        {
            title: "Initial Consultation",
            duration: "30 mins",
            type: "Video Meeting",
            price: 200,
            description: "Discuss your goals and create a preliminary training plan",
        },
        {
            title: "1:1 Training Session",
            duration: "60 mins",
            type: "In-Person",
            price: 500,
            description: "Personalized training session with technique analysis and feedback",
        },
        {
            title: "Monthly Program",
            duration: "4 weeks",
            type: "Hybrid",
            price: 1000,
            description: "Weekly sessions, custom training plan, and ongoing support",
        },
    ],
    popularServices: [
        {
            title: "Performance Assessment",
            description: "Complete physical assessment and performance benchmarking",
            price: 2000,
        },
        {
            title: "Competition Prep",
            description: "8-week intensive training program for upcoming competitions",
            price: 5000,
        },
    ],
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function CoachProfile({ id }: { id: string }) {
    return (
        <div className=" mx-auto py-8 bg-gradient-to-b from-blue-500 to-lightblue-400 px-8">
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
                                        {coachData.sessions}+ sessions
                                    </Badge>
                                </div>
                                <h1 className="text-2xl font-bold mb-2">{coachData.name}</h1>
                                <p className="text-blue-600 mb-1">{coachData.title}</p>
                                <p className="text-gray-600 mb-4">{coachData.organization}</p>
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
                                            {coachData.achievements.map((achievement) => (
                                                <li key={achievement} className="flex items-center gap-2">
                                                    <Medal className="w-4 h-4 text-yellow-500" />
                                                    <span className="text-sm">{achievement}</span>
                                                </li>
                                            ))}
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
                                        <p className="text-lg font-medium">{coachData.commitment}</p>
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
                            {coachData.packages.map((pkg, index) => (
                                <Card key={index}>
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
                                            <Button className="bg-blue-700 hover:bg-blue-500">Rs. {pkg.price} - Book Now</Button>
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
                            {coachData.popularServices.map((service, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <CardTitle>{service.title}</CardTitle>
                                                <CardDescription className="mt-1">{service.description}</CardDescription>
                                            </div>
                                            <Button className="bg-blue-700 hover:bg-blue-500">Rs.{service.price} - Book Now</Button>
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
        </div>
    )
}


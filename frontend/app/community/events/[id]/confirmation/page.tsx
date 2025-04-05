"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, CheckCircle, CalendarPlus, Share2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { Event } from "@/types/community"

// Mock data for the event details page
const events: Event[] = [
  {
    id: "1",
    title: "Virtual Training Camp: Sprint Techniques",
    date: "June 15-18, 2023",
    time: "10:00 AM - 2:00 PM (Daily)",
    location: "Online",
    organizer: "Coach Maria Johnson",
    attendees: 45,
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Join us for an intensive 4-day virtual training camp focused on sprint techniques. Learn from Olympic-level coaches and improve your performance.",
    prizeMoney: "$1,000 in training scholarships",
    registrationDeadline: "June 10, 2023",
    requirements: [
      "Track & Field athletes",
      "All experience levels welcome",
      "Stable internet connection",
      "Camera for technique feedback",
    ],
    categories: ["Junior (13-18)", "Senior (19+)"],
    maxParticipants: 50,
    remainingSpots: 5,
    isVirtual: true,
    price: 75,
  },
  {
    id: "2",
    title: "Athlete Networking Mixer",
    date: "July 8, 2023",
    time: "7:00 PM - 9:00 PM",
    location: "Online",
    organizer: "AthleteConnect Team",
    attendees: 78,
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Connect with fellow athletes, coaches, and sponsors in this virtual networking event. Build relationships that can help advance your athletic career.",
    registrationDeadline: "July 7, 2023",
    maxParticipants: 100,
    remainingSpots: 22,
    isVirtual: true,
    isFree: true,
  },
  {
    id: "3",
    title: "Q&A with Olympic Athletes",
    date: "July 22, 2023",
    time: "11:00 AM - 1:00 PM",
    location: "Online",
    organizer: "AthleteConnect Team",
    attendees: 120,
    image: "/placeholder.svg?height=200&width=300",
    description:
      "Get insights and advice directly from Olympic athletes. Learn about their journey, training routines, and mental preparation strategies.",
    registrationDeadline: "July 20, 2023",
    maxParticipants: 200,
    remainingSpots: 80,
    isVirtual: true,
    price: 25,
  },
]

export default function RegistrationConfirmationPage() {
  const params = useParams()
  const eventId = params.id as string
  const event = events.find((e) => e.id === eventId) || events[0]

  const handleAddToCalendar = () => {
    toast({
      title: "Added to calendar",
      description: "This event has been added to your calendar.",
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`https://athleteconnect.com/community/events/${eventId}`)

    toast({
      title: "Link copied!",
      description: "Event link has been copied to your clipboard.",
    })
  }

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="border-primary">
          <CardHeader className="bg-primary/10 border-b border-primary/20">
            <div className="flex items-center justify-center mb-4">
              <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">Registration Successful!</CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="text-center">
              <p className="text-muted-foreground">You have successfully registered for:</p>
              <h2 className="text-xl font-bold mt-2">{event.title}</h2>
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-md">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Date</div>
                  <div className="text-sm">{event.date}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-md">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Time</div>
                  <div className="text-sm">{event.time}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-md">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Location</div>
                  <div className="text-sm">{event.location}</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">What's Next?</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>A confirmation email has been sent to your registered email address with all the details.</span>
                </li>
                {event.isVirtual && (
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>You will receive the virtual access link 24 hours before the event starts.</span>
                  </li>
                )}
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Add this event to your calendar to make sure you don't miss it.</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>If you have any questions, please contact the event organizer.</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" onClick={handleAddToCalendar}>
                <CalendarPlus className="h-4 w-4 mr-2" />
                Add to Calendar
              </Button>
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share Event
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center border-t p-6">
            <Button asChild>
              <Link href="/community/events">Browse More Events</Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}


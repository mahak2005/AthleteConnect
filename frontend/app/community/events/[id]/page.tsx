"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  ChevronLeft,
  Share2,
  CalendarPlus,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import type { Event } from "@/types/community"
// import { Nav } from "react-day-picker"
import { Navbar } from "@/components/layout/navbar"

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

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string
  const event = events.find((e) => e.id === eventId) || events[0]
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isRegistering, setIsRegistering] = useState(false)

  const handleRegister = () => {
    router.push(`/community/events/${eventId}/register`)
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`https://athleteconnect.com/community/events/${eventId}`)

    toast({
      title: "Link copied!",
      description: "Event link has been copied to your clipboard.",
    })
  }

  const handleAddToCalendar = () => {
    toast({
      title: "Added to calendar",
      description: "This event has been added to your calendar.",
    })
  }

  return (
    <section className="pt-24 pb-12 bg-gradient-to-b from-teal-500 to-teal-400">
    <Navbar/>
    <div className="container py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/community/events">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <div className="relative aspect-video w-full">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                {event.isVirtual && <Badge className="absolute top-4 right-4 bg-primary">Virtual Event</Badge>}
              </div>

              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl font-bold">{event.title}</h1>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                      <span>Organized by {event.organizer}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleAddToCalendar}>
                      <CalendarPlus className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-3">About This Event</h2>
                      <p className="text-muted-foreground">{event.description}</p>
                    </div>

                    {event.requirements && (
                      <div>
                        <h3 className="font-semibold mb-2">Requirements</h3>
                        <ul className="space-y-1">
                          {event.requirements.map((req, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {event.prizeMoney && (
                      <div>
                        <h3 className="font-semibold mb-2">Prize Money</h3>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <span>{event.prizeMoney}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    <div className="bg-muted p-4 rounded-lg space-y-4">
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

                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">Attendees</div>
                          <div className="text-sm">{event.attendees} attending</div>
                        </div>
                      </div>

                      {event.price !== undefined && (
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-md">
                            <DollarSign className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Price</div>
                            <div className="text-sm">{event.isFree ? "Free" : `$${event.price}`}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {event.categories && (
                      <div>
                        <h3 className="font-semibold mb-2">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                          {event.categories.map((category, index) => (
                            <Badge key={index} variant="secondary">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {event.registrationDeadline && (
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                        <span>Registration closes on {event.registrationDeadline}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button className="w-full" onClick={handleRegister}>
                  Register Now
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <Card>
            <CardHeader>
              <CardTitle>Attendees ({event.attendees})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="Attendee" />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <span className="text-xs">Athlete {i + 1}</span>
                  </div>
                ))}
                {event.attendees > 8 && (
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-muted text-sm">
                    +{event.attendees - 8}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Organizer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt={event.organizer} />
                  <AvatarFallback>{event.organizer.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{event.organizer}</h3>
                  <p className="text-sm text-muted-foreground">Event Organizer</p>
                  <Button variant="link" className="p-0 h-auto mt-1" asChild>
                    <Link href="#">View Profile</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Registration Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium">Price</div>
                <div className="text-2xl font-bold">{event.isFree ? "Free" : `$${event.price}`}</div>
              </div>

              <Separator />

              <div>
                <div className="text-sm font-medium">Spots Remaining</div>
                <div className="text-2xl font-bold">
                  {event.remainingSpots} of {event.maxParticipants}
                </div>
                <div className="h-2 bg-muted rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{
                      width: `${((event.maxParticipants - event.remainingSpots) / event.maxParticipants) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <Separator />

              <div>
                <div className="text-sm font-medium">Registration Deadline</div>
                <div className="font-medium">{event.registrationDeadline}</div>
              </div>

              <Button className="w-full" onClick={handleRegister}>
                Register Now
              </Button>

              <div className="text-xs text-muted-foreground text-center">
                By registering, you agree to our event terms and conditions.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events
                .filter((e) => e.id !== eventId)
                .slice(0, 2)
                .map((similarEvent) => (
                  <div key={similarEvent.id} className="flex gap-3">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={similarEvent.image || "/placeholder.svg"}
                        alt={similarEvent.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <Link href={`/community/events/${similarEvent.id}`} className="font-medium hover:text-primary">
                        {similarEvent.title}
                      </Link>
                      <div className="text-xs text-muted-foreground">{similarEvent.date}</div>
                      <div className="text-xs text-muted-foreground">{similarEvent.attendees} attending</div>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </section>
  )
}


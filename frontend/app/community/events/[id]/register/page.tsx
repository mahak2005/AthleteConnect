"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { ChevronLeft, Calendar, Clock, MapPin, DollarSign, CheckCircle } from "lucide-react"
import type { Event } from "@/types/community"
import { sendRegistrationEmail } from "@/app/actions"

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

export default function EventRegistrationPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string
  const event = events.find((e) => e.id === eventId) || events[0]

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    sport: "",
    experience: "",
    category: event.categories ? event.categories[0] : "",
    specialRequirements: "",
    agreeToTerms: false,
    paymentMethod: "credit-card",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to register for the event
      // For now, we'll simulate a successful registration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Send confirmation email
      if (formData.email) {
        await sendRegistrationEmail({
          email: formData.email,
          name: `${formData.firstName} ${formData.lastName}`,
          eventTitle: event.title,
          eventDate: event.date,
          eventTime: event.time,
        })
      }

      toast({
        title: "Registration successful!",
        description:
          "You have successfully registered for this event. A confirmation email has been sent to your email address.",
      })

      // Redirect to confirmation page
      router.push(`/community/events/${eventId}/confirmation`)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error processing your registration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href={`/community/events/${eventId}`}>
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Event
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card>
              <CardHeader>
                <CardTitle>Register for {event.title}</CardTitle>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Athletic Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sport">Sport *</Label>
                        <Select
                          value={formData.sport}
                          onValueChange={(value) => handleSelectChange("sport", value)}
                          required
                        >
                          <SelectTrigger id="sport">
                            <SelectValue placeholder="Select your sport" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="track-field">Track & Field</SelectItem>
                            <SelectItem value="basketball">Basketball</SelectItem>
                            <SelectItem value="swimming">Swimming</SelectItem>
                            <SelectItem value="soccer">Soccer</SelectItem>
                            <SelectItem value="gymnastics">Gymnastics</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience">Experience Level *</Label>
                        <Select
                          value={formData.experience}
                          onValueChange={(value) => handleSelectChange("experience", value)}
                          required
                        >
                          <SelectTrigger id="experience">
                            <SelectValue placeholder="Select your experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {event.categories && (
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="category">Category *</Label>
                          <RadioGroup
                            value={formData.category}
                            onValueChange={(value) => handleSelectChange("category", value)}
                            className="flex flex-col space-y-1"
                          >
                            {event.categories.map((category) => (
                              <div key={category} className="flex items-center space-x-2">
                                <RadioGroupItem value={category} id={`category-${category}`} />
                                <Label htmlFor={`category-${category}`}>{category}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      )}

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="specialRequirements">Special Requirements or Questions</Label>
                        <Textarea
                          id="specialRequirements"
                          name="specialRequirements"
                          value={formData.specialRequirements}
                          onChange={handleChange}
                          placeholder="Let us know if you have any special requirements or questions"
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>

                  {!event.isFree && (
                    <>
                      <Separator />

                      <div>
                        <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                        <div className="space-y-4">
                          <RadioGroup
                            value={formData.paymentMethod}
                            onValueChange={(value) => handleSelectChange("paymentMethod", value)}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="credit-card" id="payment-credit-card" />
                              <Label htmlFor="payment-credit-card">Credit Card</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="paypal" id="payment-paypal" />
                              <Label htmlFor="payment-paypal">PayPal</Label>
                            </div>
                          </RadioGroup>

                          <div className="bg-muted p-4 rounded-lg">
                            <p className="text-sm text-muted-foreground">
                              Payment details will be collected on the next step after form submission.
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleCheckboxChange("agreeToTerms", checked as boolean)}
                        required
                      />
                      <Label htmlFor="agreeToTerms" className="text-sm">
                        I agree to the event terms and conditions, including the privacy policy and code of conduct.
                      </Label>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button variant="outline" type="button" asChild>
                    <Link href={`/community/events/${eventId}`}>Cancel</Link>
                  </Button>
                  <Button type="submit" disabled={isSubmitting || !formData.agreeToTerms}>
                    {isSubmitting ? "Processing..." : "Complete Registration"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </motion.div>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Event Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative h-40 w-full rounded-md overflow-hidden">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
              </div>

              <h3 className="font-semibold text-lg">{event.title}</h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{event.location}</span>
                </div>
                {!event.isFree && (
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>${event.price}</span>
                  </div>
                )}
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">What is Included:</h4>
                <ul className="space-y-1">
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Full access to the event</span>
                  </li>
                  {event.isVirtual && (
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Virtual access link</span>
                    </li>
                  )}
                  <li className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>Event materials and resources</span>
                  </li>
                  {event.prizeMoney && (
                    <li className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Opportunity to win prizes</span>
                    </li>
                  )}
                </ul>
              </div>

              <Separator />

              <div className="text-sm text-muted-foreground">
                <p>
                  Only {event.remainingSpots} spots remaining out of {event.maxParticipants}.
                </p>
                <p className="mt-1">Registration closes on {event.registrationDeadline}.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, MapPin, Users, Link2 } from "lucide-react"
import Image from "next/image"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface EventDetailsProps {
  eventId: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function EventDetails({ eventId }: EventDetailsProps) {
  // In a real application, you would fetch the event details using the eventId
  const event = {
    title: "Limitless Athlete Championship",
    subtitle: "Empowering Underprivileged Athletes",
    organizer: "Limitless Athlete Foundation",
    description:
      "The Limitless Athlete Championship is an initiative to support talented underprivileged athletes by providing them a platform to compete, gain recognition, and receive financial backing.",
    date: "March 15 - 16, 2025",
    location: "New Delhi, India",
    applicationDeadline: "5d:12h:30m",
    tracks: [
      {
        name: "Track and Field",
        description: "Athletes compete in running, jumping, and throwing events.",
      },
      {
        name: "Para-Athletics",
        description: "Dedicated events for specially-abled athletes to showcase their talent.",
      },
    ],
    prizes: [
      {
        position: "1st Prize",
        amount: "₹1,00,000",
        benefits: ["Cash Prize", "Sponsorship Opportunities", "Training Support"],
      },
      {
        position: "2nd Prize",
        amount: "₹50,000",
        benefits: ["Cash Prize", "Mentorship Program"],
      },
      {
        position: "3rd Prize",
        amount: "₹25,000",
        benefits: ["Cash Prize"],
      },
    ],
    sponsors: [
      {
        name: "ChampionGear",
        logo: "/placeholder.svg?height=60&width=120",
        type: "Title Sponsor",
      },
      {
        name: "AthleteX",
        logo: "/placeholder.svg?height=60&width=120",
        type: "Gold Sponsor",
      },
      {
        name: "HealthBoost",
        logo: "/placeholder.svg?height=60&width=120",
        type: "Silver Sponsor",
      },
    ],
    faqs: [
      {
        question: "Who can participate?",
        answer:
          "Any aspiring athlete from an underprivileged background can apply. Participants must submit proof of eligibility.",
      },
      {
        question: "What facilities are provided?",
        answer:
          "Athletes will receive accommodation, meals, training support, and medical assistance during the event.",
      },
      {
        question: "Is there a registration fee?",
        answer:
          "No, participation is completely free! Our aim is to provide equal opportunities to all deserving athletes.",
      },
      {
        question: "How are winners selected?",
        answer:
          "Participants will be judged based on their performance metrics, sportsmanship, and potential for future growth.",
      },
    ],
  }

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
            <p className="text-xl text-slate-300">{event.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-teal-400" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-teal-400" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-400" />
                <span>Individual and team participation allowed</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center p-4 bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-400 mb-1">APPLICATIONS CLOSE IN</p>
                <p className="text-2xl font-bold">{event.applicationDeadline}</p>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-teal-600 text-white hover:bg-teal-700" size="lg">
                  Apply now
                </Button>
                <Button variant="outline" size="lg" className="bg-white-600 hover:bg-teal-700 flex-1">
                  <Link2 className="h-4 w-4 mr-2" />
                  Website
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {event.prizes.map((prize) => (
              <motion.div
                key={prize.position}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-800 p-6 rounded-lg"
              >
                <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                <h3 className="font-semibold mb-1">{prize.position}</h3>
                <p className="text-2xl font-bold text-green-400 mb-2">{prize.amount}</p>
                <ul className="text-sm text-slate-400">
                  {prize.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="space-y-8"></div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Event Tracks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.tracks.map((track) => (
                <div key={track.name} className="bg-slate-800 p-6 rounded-lg">
                  <h3 className="font-semibold mb-2">{track.name}</h3>
                  <p className="text-slate-400">{track.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Sponsors</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {event.sponsors.map((sponsor) => (
                <div key={sponsor.name} className="bg-slate-800 p-4 rounded-lg text-center">
                  <Image
                    src={sponsor.logo || "/placeholder.svg"}
                    alt={sponsor.name}
                    width={120}
                    height={60}
                    className="mx-auto mb-2"
                  />
                  <h3 className="font-medium">{sponsor.name}</h3>
                  <p className="text-sm text-slate-400">{sponsor.type}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Event Tracks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.tracks.map((track) => (
                  <div key={track.name} className="bg-slate-800 p-6 rounded-lg">
                    <h3 className="font-semibold mb-2">{track.name}</h3>
                    <p className="text-slate-400">{track.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {event.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
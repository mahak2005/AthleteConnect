"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {  Menu } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const features = [
    {
      title: "Find Athletes",
      description:
        "Discover your perfect athlete to collaborate with and elevate your brand. Whether you need a brand ambassador, a spokesperson, or a competitive athlete to represent your campaign, connect with talented athletes who embody your brand's values and message. ",
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
        "Take your athletic career to new heights by leveraging sponsorships and partnerships. Connect with brands that align with your values and build long-lasting relationships. Grow your influence, expand your network, and take control of your future with the right collaborations.",
      image: "/hp3.jpg",
    },
  ]

  // const testimonials = [
  //   {
  //     logo: "/placeholder.svg?height=100&width=200",
  //     image: "/placeholder.svg?height=300&width=200",
  //     stat: "2.4%",
  //     name: "SteadyMD",
  //     description: "Increase in website traffic",
  //   },
  //   {
  //     logo: "/placeholder.svg?height=100&width=200",
  //     image: "/placeholder.svg?height=300&width=200",
  //     stat: "100k+",
  //     name: "Walmart",
  //     description: "Store impressions with NIL deals",
  //   },
  //   {
  //     logo: "/placeholder.svg?height=100&width=200",
  //     image: "/placeholder.svg?height=300&width=200",
  //     stat: "Over 20%",
  //     name: "Athleta",
  //     description: "Engagement rate on Instagram",
  //   },
  // ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-teal-600 rounded-full" />
              <span className="text-xl font-semibold">LimitlessAthlete</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-slate-600 hover:text-slate-900">
                Home
              </Link>
              <Link href="/athletes" className="text-slate-600 hover:text-slate-900">
                Match With Athletes
              </Link>
              {/* <Link href="/events" className="text-slate-600 hover:text-slate-900">
                Events
              </Link> */}
              <Link href="/plans" className="text-slate-600 hover:text-slate-900">
                Plans
              </Link>
              <Button variant="default" size="sm">
                Sign up
              </Button>
            </div>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                <Link href="/" className="text-slate-600 hover:text-slate-900">
                  Home
                </Link>
                <Link href="/athletes" className="text-slate-600 hover:text-slate-900">
                  Match With Athletes
                </Link>
                <Link href="/events" className="text-slate-600 hover:text-slate-900">
                  Events
                </Link>
                <Link href="/plans" className="text-slate-600 hover:text-slate-900">
                  Plans
                </Link>
                <Button variant="default" size="sm" className="w-full">
                  Sign up
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Your Sports Marketing Campaigns,
            <br />
            <span className="text-teal-600">All in one place!</span>
          </motion.h1>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
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

     

      {/* Why Choose Us */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why choose our Sports Sponsorship platform?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Platform showcase"
                width={600}
                height={400}
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Influencer Reach</h3>
              <p className="text-slate-600">
                Build athlete networks and reach NIL athletes audiences we chose intentionally when traditional
                influencers usually only reach a single target demographic.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Personal Profiles */}
      <section className="py-12 md:py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Personal Profiles</h2>
              <p className="text-slate-600">
                Our athletes and teams complete their own profiles, sharing exclusive information regarding personal
                interests, stats, and other details.
              </p>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Image
                src="/placeholder.svg?height=600&width=400"
                alt="Personal profiles showcase"
                width={400}
                height={600}
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">PRODUCTS</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Analytics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">RESOURCES</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Knowledge Base
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">LEGAL</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">FOLLOW US</h3>
              <div className="flex space-x-4">
                <Link href="#" className="hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link href="#" className="hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} LimitlessAthlete. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}


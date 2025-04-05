"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Share2, Instagram, Twitter, Facebook, MapPin, Globe, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dummy data - replace with real data fetching
const athleteData = {
  id: "1",
  name: "Aarav Patel",
  image:
    "/ath.jpg",
  location: "India",
  basicInfo: {
    fullName: "Aarav Patel",
    age: 21,
    gender: "Male",
    nationality: "Indian",
    state: "Haryana",
    sport: "Athletics",
    category: "Sprinter",
    currentRanking: "State-Player",
  },
  about: `I am a dedicated and hardworking athlete from Haryana, specializing in the 100m sprint. Born and raised in a small town, I developed a passion for athletics at a young age and has since become one of the top sprinters in my state. My journey into athletics began in school.`,
  achievements: {
    medals: [
      "3× NBA champion (2017, 2018, 2019, 2020)",
      "4× NBA Finals MVP (2012, 2013, 2016, 2020)",
      "4× NBA Most Valuable Player (2009, 2010, 2012, 2013)",

    ],
    records: [
      "NBA all-time scoring leader",
      "Only player in NBA history with 30,000 points, 10,000 rebounds, and 10,000 assists",
      "Most All-NBA Team selections (19)",
    ],
    awards: [
      "2× Associated Press Athlete of the Year (2013, 2016)",
      "2012 Sports Illustrated Sportsperson of the Year",
      "2020 Time Athlete of the Year",
    ],
  },
  sponsorship: {
    needs: ["Brand Partnerships", "Endorsements", "Social Media Collaborations", "Event Appearances"],
    impact: `Sponsorship opportunities with Aarav Patel provide unparalleled reach and influence in the global sports market. Partners benefit from association with one of the most recognized athletes in the world.`,
    goals: [
      "Continue breaking NBA records",
      "Win additional NBA championships",
      "Expand philanthropic efforts through the LeBron James Family Foundation",
    ],
  },
  social: {
    instagram: "kingjames",
    twitter: "kingjames",
    facebook: "lebronjames",
    followers: {
      instagram: "154M",
      twitter: "52.7M",
      facebook: "23M",
    },
  },
  contact: {
    manager: "Rich Paul",
    agency: "Klutch Sports Group",
    email: "contact@klutchsports.com",
    phone: "+1 (XXX) XXX-XXXX",
  },
  deals: [
    {
      title: "Social Media Deal",
      description: "1 post & 1 story with LeBron James promoting your product.",
    },
    {
      title: "Appearance Deal",
      description: "Have LeBron James make a live appearance at your next event",
    },
  ],
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AthleteProfile({ id }: { id: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-500 to-teal-300 px-4">
      {/* Header */}
      <div className="">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Image
                src={athleteData.image || "/placeholder.svg"}
                alt={athleteData.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <h1 className="text-2xl font-bold text-white">
                Sponsor {athleteData.name}
                <span className="ml-2">{athleteData.location}</span>
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost" className="text-white">
                <Share2 className="h-5 w-5" />
              </Button>
              <Button className="bg-teal-500 hover:bg-teal-600">WORK WITH ME</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="about" className="w-full">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="sponsorship">Sponsorship</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="space-y-6">
                <section className="bg-white rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    WHY YOU SHOULD SPONSOR ME FOR YOUR NEXT INFLUENCER CAMPAIGN?
                  </h2>
                  <p className="text-gray-600">{athleteData.about}</p>
                </section>
                <section className="bg-white rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(athleteData.basicInfo).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </TabsContent>
              <TabsContent value="achievements" className="space-y-6">
                <section className="bg-white rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Medals & Titles</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {athleteData.achievements.medals.map((medal, index) => (
                      <li key={index} className="text-gray-600">
                        {medal}
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="bg-white rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Records</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {athleteData.achievements.records.map((record, index) => (
                      <li key={index} className="text-gray-600">
                        {record}
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="bg-white rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Awards & Recognition</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {athleteData.achievements.awards.map((award, index) => (
                      <li key={index} className="text-gray-600">
                        {award}
                      </li>
                    ))}
                  </ul>
                </section>
              </TabsContent>
              <TabsContent value="sponsorship" className="space-y-6">
                <section className="bg-white rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Sponsorship Needs</h2>
                  <ul className="list-disc list-inside space-y-2">
                    {athleteData.sponsorship.needs.map((need, index) => (
                      <li key={index} className="text-gray-600">
                        {need}
                      </li>
                    ))}
                  </ul>
                </section>
                <section className="bg-white rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Impact of Sponsorship</h2>
                  <p className="text-gray-600 mb-4">{athleteData.sponsorship.impact}</p>
                  <h3 className="font-semibold mb-2">Goals:</h3>
                  <ul className="list-disc list-inside space-y-2">
                    {athleteData.sponsorship.goals.map((goal, index) => (
                      <li key={index} className="text-gray-600">
                        {goal}
                      </li>
                    ))}
                  </ul>
                </section>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <section className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span>Haryana</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-gray-400" />
                  <span>English</span>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Social Media</h2>
              <div className="space-y-4">
                <Link
                  href={`https://instagram.com/${athleteData.social.instagram}`}
                  className="flex items-center justify-between hover:bg-gray-50 p-2 rounded"
                >
                  <div className="flex items-center gap-2">
                    <Instagram className="h-5 w-5 text-pink-500" />
                    <span>Instagram</span>
                  </div>
                  <span className="text-gray-600">{athleteData.social.followers.instagram}</span>
                </Link>
                <Link
                  href={`https://twitter.com/${athleteData.social.twitter}`}
                  className="flex items-center justify-between hover:bg-gray-50 p-2 rounded"
                >
                  <div className="flex items-center gap-2">
                    <Twitter className="h-5 w-5 text-blue-400" />
                    <span>Twitter</span>
                  </div>
                  <span className="text-gray-600">{athleteData.social.followers.twitter}</span>
                </Link>
                <Link
                  href={`https://facebook.com/${athleteData.social.facebook}`}
                  className="flex items-center justify-between hover:bg-gray-50 p-2 rounded"
                >
                  <div className="flex items-center gap-2">
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <span>Facebook</span>
                  </div>
                  <span className="text-gray-600">{athleteData.social.followers.facebook}</span>
                </Link>
              </div>
            </section>

            <section className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span>{athleteData.contact.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <span>{athleteData.contact.phone}</span>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Pre-packaged Projects</h2>
              <div className="space-y-4">
                {athleteData.deals.map((deal, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">{deal.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{deal.description}</p>
                    <Button className="w-full bg-teal-500 hover:bg-teal-600">LOG IN TO SEE PRICING</Button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}


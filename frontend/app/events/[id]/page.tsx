import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { EventDetails } from "@/components/sections/event-details"
import { EventDiscussion } from "@/components/sections/event-discussion"
import { EventTeams } from "@/components/sections/event-teams"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EventPage() {
  const eventId = "1"  // Hardcoded event ID for now

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-16">
        <EventDetails eventId={eventId} />
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="teams">Find Teams</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <div className="prose max-w-none">
                <h2 className="text-3xl font-semibold">Event Details</h2>
                <p className="mt-4 text-lg">
                  Join us for an inspiring event that brings together underprivileged athletes from across India to showcase their talents, secure financial backing, and gain exposure for future opportunities. This event is aimed at creating pathways for athletes to gain the recognition and resources they deserve.
                </p>

                <h3 className="text-2xl font-semibold mt-8">Opportunities</h3>
                <ul className="list-inside list-disc mt-4 space-y-2 text-lg">
                  <li className="flex items-center space-x-2">
                    <span className="text-lg">💰 Financial Backing: Monetary support to help athletes achieve their goals</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-lg">🤝 Sponsorships: Connect with brands and companies who want to support talent</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-lg">🎤 Showcase Your Talent: A platform to exhibit your skills and attract attention</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-lg">🌐 Networking: Build relationships with industry professionals and fellow athletes</span>
                  </li>
                </ul>

                <h3 className="text-2xl font-semibold mt-8">Timeline</h3>
                <ul className="list-inside list-decimal mt-4 space-y-2 text-lg">
                  <li> Registration Opens: February 1, 2025</li>
                  <li> Registration Closes: February 20, 2025</li>
                  <li> Event Start: February 21, 2025</li>
                  <li> Event End: February 22, 2025</li>
                  <li> Results Announcement: February 23, 2025</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-8">Eligibility</h3>
                <ul className="list-inside list-disc mt-4 space-y-2 text-lg">
                  <li> Open to all underprivileged athletes in India</li>
                  <li> Team size: 1-5 athletes (Solo athletes are also encouraged to participate)</li>
                  <li> Multiple entries from the same region are allowed</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-8">Judging Criteria</h3>
                <ul className="list-inside list-decimal mt-4 space-y-2 text-lg">
                  <li> Talent and Skill Level (30%)</li>
                  <li> Innovation in Approach (25%)</li>
                  <li> Impact on the Community (25%)</li>
                  <li> Presentation and Showcase (20%)</li>
                </ul>

                <h3 className="text-2xl font-semibold mt-8">Sponsors</h3>
                <p className="text-lg mt-4">
                  Proudly sponsored by organizations dedicated to supporting athletes and fostering community growth.
                </p>

                <h3 className="text-2xl font-semibold mt-8">Venue</h3>
                <p className="text-lg mt-4">Virtual Event (Accessible across India)</p>

                <h3 className="text-2xl font-semibold mt-8">Contact</h3>
                <p className="text-lg mt-4">
                  For any queries, please reach out to:
                  <br />
                  Email: support@limitlessathletes.com
                  <br />
                  Phone: +91 XXXXXXXXXX
                </p>
              </div>
            </TabsContent>
            <TabsContent value="discussion" className="mt-6">
              <EventDiscussion />
            </TabsContent>
            <TabsContent value="teams" className="mt-6">
              <EventTeams />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

"use client"
// import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Link2, Twitter, DiscIcon as Discord, Instagram } from "lucide-react"
import { useRouter } from "next/navigation"

interface EventProps {
  event: {
    id: number
    title: string
    type: string
    themes: string[]
    status: {
      mode: string
      state: string
      date?: string
      isLive?: boolean
    }
    participants: {
      count: string
      avatars: string[]
    }
    links: {
      website: string
      twitter?: string
      discord?: string
      instagram?: string
    }
  }
}

export function EventCard({ event }: EventProps) {
  const router = useRouter()

  return (
    <div className="bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow ">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
          <p className="text-muted-foreground">{event.type}</p>
        </div>
        <div className="flex gap-2">
          <a
            href={event.links.website}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Link2 className="h-5 w-5 text-teal-600" />
          </a>
          {event.links.discord && (
            <a
              href={event.links.discord}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Discord className="h-5 w-5 text-teal-600" />
            </a>
          )}
          {event.links.twitter && (
            <a
              href={event.links.twitter}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5 text-teal-600" />
            </a>
          )}
          {event.links.instagram && (
            <a
              href={event.links.instagram}
              className="p-2 rounded-full hover:bg-slate-100 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="h-5 w-5 text-teal-600" />
            </a>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {event.themes.map((theme) => (
            <span key={theme} className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full font-medium">
              {theme}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {/* {event.participants.avatars.map((avatar, index) => (
              <Image
                key={index}
                src={avatar || "/placeholder.svg"}
                alt="Participant"
                width={32}
                height={32}
                className="rounded-full border-2 border-white"
              />
            ))} */}
          </div>
          <span className="text-sm text-teal-600 font-medium">{event.participants.count} participating</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full">{event.status.mode}</span>
            <span className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full">{event.status.state}</span>
            {event.status.isLive && (
              <span className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-full flex items-center gap-1">
                <span className="h-2 w-2 bg-red-600 rounded-full animate-pulse" />
                LIVE
              </span>
            )}
            {event.status.date && (
              <span className="px-3 py-1 text-sm bg-slate-100 text-slate-700 rounded-full">{event.status.date}</span>
            )}
          </div>
          <Button className="bg-teal-700 hover:bg-teal-500"
            onClick={() => router.push(`/events/${event.id}`)}>Apply now</Button>
        </div>
      </div>
    </div>
  )
}


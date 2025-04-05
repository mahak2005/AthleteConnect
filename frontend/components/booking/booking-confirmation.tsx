"use client"

import { Button } from "@/components/ui/button"
import { Check, Copy, Calendar, Clock, Video } from "lucide-react"
import { useState } from "react"

interface BookingConfirmationProps {
  bookingDetails: {
    name: string
    email: string
    coach: string
    package: string
    price: number
    date: string
    time: string
    meetingLink: string
  }
  onClose: () => void
}

export function BookingConfirmation({ bookingDetails, onClose }: BookingConfirmationProps) {
  const [linkCopied, setLinkCopied] = useState(false)

  const copyMeetingLink = () => {
    navigator.clipboard.writeText(bookingDetails.meetingLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  return (
    <div className="py-4 space-y-6">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-green-600" />
        </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-lg font-medium mb-2">Your session has been booked!</h3>
        <p className="text-gray-600">
          We've sent a confirmation email to <span className="font-medium">{bookingDetails.email}</span> with all the
          details.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Coach:</span>
          <span className="font-medium">{bookingDetails.coach}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Package:</span>
          <span className="font-medium">{bookingDetails.package}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Price:</span>
          <span className="font-medium">${bookingDetails.price}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600">Date:</span>
          </div>
          <span className="font-medium">{bookingDetails.date}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="text-gray-600">Time:</span>
          </div>
          <span className="font-medium">{bookingDetails.time}</span>
        </div>
      </div>

      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Video className="w-5 h-5 text-blue-600" />
          <h4 className="font-medium">Meeting Link</h4>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={bookingDetails.meetingLink}
            readOnly
            className="flex-1 p-2 text-sm bg-white border rounded"
          />
          <Button size="sm" variant="outline" onClick={copyMeetingLink} className="flex items-center gap-1">
            {linkCopied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-blue-600 mt-2">This link has been sent to both you and your coach.</p>
      </div>

      <div className="flex justify-center pt-4">
        <Button onClick={onClose} className="bg-teal-600 hover:bg-teal-700">
          Done
        </Button>
      </div>
    </div>
  )
}


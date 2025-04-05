"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Coach } from "@/data/coaches"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: Date | undefined;
  time: string;
  goals: string;
  experience: string;
  package: string;
  coach: string;
}

interface BookingFormProps {
  coach: Coach
  packageDetails: {
    id: string
    title: string
    price: number
    duration?: string
    type?: string
  }
  onSubmit: (formData: BookingFormData) => void
}

type DayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | -1;

export function BookingForm({ coach, packageDetails, onSubmit }: BookingFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState("")
  const [goals, setGoals] = useState("")
  const [experience, setExperience] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate available time slots based on coach availability
  const getAvailableTimeSlots = () => {
    const today = new Date().getDay() as DayNumber
    const availableDays = coach.availability.map((day): DayNumber => {
      switch (day) {
        case "Mon":
          return 1
        case "Tue":
          return 2
        case "Wed":
          return 3
        case "Thu":
          return 4
        case "Fri":
          return 5
        case "Sat":
          return 6
        case "Sun":
          return 0
        default:
          return -1
      }
    })

    // If selected date is available, show time slots
    if (date && availableDays.includes(date.getDay() as DayNumber)) {
      return ["09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"]
    }

    return []
  }

  const timeSlots = getAvailableTimeSlots()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      onSubmit({
        name,
        email,
        phone,
        date,
        time,
        goals,
        experience,
        package: packageDetails.title,
        coach: coach.name,
      })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Select Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal mt-1">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) => {
                  const day = date.getDay() as DayNumber
                  const availableDays = coach.availability.map((day): DayNumber => {
                    switch (day) {
                      case "Mon":
                        return 1
                      case "Tue":
                        return 2
                      case "Wed":
                        return 3
                      case "Thu":
                        return 4
                      case "Fri":
                        return 5
                      case "Sat":
                        return 6
                      case "Sun":
                        return 0
                      default:
                        return -1
                    }
                  })
                  return !availableDays.includes(day) || date < new Date()
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <Label htmlFor="time">Select Time</Label>
          <select
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border rounded-md mt-1"
            required
            disabled={!date || timeSlots.length === 0}
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
          {date && timeSlots.length === 0 && (
            <p className="text-sm text-red-500 mt-1">No available time slots on this date</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="goals">What are your training goals?</Label>
        <Textarea
          id="goals"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          placeholder="Briefly describe what you hope to achieve"
          className="mt-1"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="experience">Experience Level</Label>
        <select
          id="experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full p-2 border rounded-md mt-1"
          required
        >
          <option value="">Select your experience level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="professional">Professional</option>
        </select>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button type="submit" disabled={isSubmitting} className="bg-teal-600 hover:bg-teal-700">
          {isSubmitting ? "Processing..." : "Book Session"}
        </Button>
      </div>
    </form>
  )
}


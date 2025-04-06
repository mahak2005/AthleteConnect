"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface SmartMatchProps {
  onMatch: (filters: { type: string; sport: string; experience: number }) => void
  onClose: () => void
}

const coachTypes = [
  { value: "performance", label: "Performance Coach" },
  { value: "nutritionist", label: "Nutritionist" },
  { value: "physio", label: "Physiotherapist" }
]

const sports = [
  { value: "Football", label: "Football" },
  { value: "Basketball", label: "Basketball" },
  { value: "Tennis", label: "Tennis" },
  { value: "Cricket", label: "Cricket" },
  { value: "Swimming", label: "Swimming" }
]

const experienceRanges = [
  { value: 1, label: "1+ years" },
  { value: 3, label: "3+ years" },
  { value: 5, label: "5+ years" },
  { value: 8, label: "8+ years" },
  { value: 10, label: "10+ years" }
]

export function SmartMatch({ onMatch, onClose }: SmartMatchProps) {
  const [type, setType] = useState("")
  const [sport, setSport] = useState("")
  const [experience, setExperience] = useState(1)

  const handleSubmit = () => {
    if (type && sport) {
      onMatch({ type, sport, experience })
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Smart Match with Coaches</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Type of Coach</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select coach type" />
              </SelectTrigger>
              <SelectContent>
                {coachTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sport">Sport</Label>
            <Select value={sport} onValueChange={setSport}>
              <SelectTrigger>
                <SelectValue placeholder="Select sport" />
              </SelectTrigger>
              <SelectContent>
                {sports.map((sport) => (
                  <SelectItem key={sport.value} value={sport.value}>
                    {sport.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="experience">Minimum Experience</Label>
            <Select value={experience.toString()} onValueChange={(value) => setExperience(Number(value))}>
              <SelectTrigger>
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent>
                {experienceRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value.toString()}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!type || !sport}
            className="bg-teal-500 hover:bg-teal-600"
          >
            Find Matches
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
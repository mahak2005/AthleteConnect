"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Search, Filter, X } from "lucide-react"

interface CoachFiltersProps {
  onFilterChange: (filters: {
    search: string
    specialty: string
    location: string
    priceRange: [number, number]
  }) => void
}

export function CoachFilters({ onFilterChange }: CoachFiltersProps) {
  const [search, setSearch] = useState("")
  const [specialty, setSpecialty] = useState("")
  const [location, setLocation] = useState("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onFilterChange({
        search,
        specialty,
        location,
        priceRange,
      })
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [search, specialty, location, priceRange, onFilterChange])

  const handleReset = () => {
    setSearch("")
    setSpecialty("")
    setLocation("")
    setPriceRange([0, 200])
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search coaches by name or expertise..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="relative w-full md:w-48">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </div>

      {isFiltersOpen && (
        <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="specialty" className="block mb-2 text-sm">
              Specialty
            </Label>
            <select
              id="specialty"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">All Specialties</option>
              <option value="Performance">Performance Training</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Mental">Mental Training</option>
              <option value="Physiotherapy">Physiotherapy</option>
              <option value="Recovery">Recovery</option>
              <option value="Strength">Strength & Conditioning</option>
            </select>
          </div>

          <div>
            <Label htmlFor="price-range" className="block mb-2 text-sm">
              Price Range (Rs/hour)
            </Label>
            <div className="flex items-center gap-4">
              <span className="text-sm">Rs{priceRange[0]}</span>
              <input
                type="range"
                min="0"
                max="200"
                step="5"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                className="flex-1"
              />
              <span className="text-sm">to</span>
              <input
                type="range"
                min="0"
                max="200"
                step="5"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                className="flex-1"
              />
              <span className="text-sm">Rs{priceRange[1]}</span>
            </div>
          </div>

          <div className="flex items-end">
            <Button variant="ghost" onClick={handleReset} className="flex items-center gap-2">
              <X className="h-4 w-4" />
              <span>Reset Filters</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}


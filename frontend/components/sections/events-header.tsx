// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Search, Filter } from "lucide-react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Calendar } from "@/components/ui/calendar"

// const sports = ["Football", "Basketball", "Cricket", "Tennis", "Swimming", "Athletics", "Volleyball", "Baseball"]

// export function EventsHeader() {
//   const [date, setDate] = useState<Date | undefined>(new Date())
//   const [selectedSports, setSelectedSports] = useState<string[]>([])

//   const toggleSport = (sport: string) => {
//     setSelectedSports((prev) => (prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport]))
//   }

//   return (
//     <section className="py-12 bg-blue-600 border-b">
//       <div className="container px-4 mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="max-w-2xl mx-auto"
//         >
//           <h1 className="text-4xl font-bold tracking-tight mb-4 text-center text-white">
//   Discover Sports Events
// </h1>
// <p className="text-lg text-white mb-8 text-center">
//   Find and participate in sports events, tournaments, and competitions around the world
// </p>

// <div className="flex gap-4 mb-6 text-white">
//   <div className="relative flex-1">
//     <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
//     <Input className="pl-10 text-white placeholder-white bg-transparent border-white" placeholder="Search events..." />
//   </div>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button variant="outline">
//                   <Filter className="h-4 w-4 mr-2" />
//                   Filters
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent className="w-80">
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label>Date Range</Label>
//                     <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Sports</Label>
//                     <div className="grid grid-cols-2 gap-2">
//                       {sports.map((sport) => (
//                         <Button
//                           key={sport}
//                           variant={selectedSports.includes(sport) ? "default" : "outline"}
//                           size="sm"
//                           onClick={() => toggleSport(sport)}
//                           className="justify-start"
//                         >
//                           {sport}
//                         </Button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// const sports = ["Football", "Basketball", "Cricket", "Tennis", "Swimming", "Athletics", "Volleyball", "Baseball"]

export function EventsHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      alert("Please enter a search term.")
      return
    }
    console.log("Searching for:", searchQuery)
    // You can replace this console.log with an API call or filter logic.
  }

  return (
    <section className="py-12 bg-gradient-to-b from-blue-500 to-lightblue-400 px-4 border-b">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-center text-white">
            Discover Sports Events
          </h1>
          <p className="text-lg text-white mb-8 text-center">
            Find and participate in sports events, tournaments, and competitions around the world
          </p>

          <div className="flex gap-4 mb-6 text-white">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
              <Input
                className="pl-10 text-white placeholder-white bg-transparent border-white"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              className="bg-white text-blue-600 hover:bg-blue-500 hover:text-white"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>

        </motion.div>
      </div>
    </section>
  )
}

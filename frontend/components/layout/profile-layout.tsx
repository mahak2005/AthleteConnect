"use client"

// import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
// import { Button } from "@/components/ui/button"
// import { Menu } from "lucide-react"

export function ProfileLayout({ children }: { children: React.ReactNode }) {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="pt-16">
        {/* <div className="fixed lg:hidden top-20 left-4 z-30">
          <Button variant="outline" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="h-4 w-4" />
          </Button>
        </div> */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {children}
        </motion.div>
      </div>
    </div>
  )
}

// "use client"

// import { useState } from "react"
// import { motion } from "framer-motion"
// import { Navbar } from "@/components/layout/navbar"
// import { Button } from "@/components/ui/button"
// import { Menu } from "lucide-react"

// export function ProfileLayout({ children }: { children: React.ReactNode }) {
//   // const [isSidebarOpen, setIsSidebarOpen] = useState(false)

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Navbar />
//       <div className="pt-16">
//         {/* <div className="fixed lg:hidden top-20 left-4 z-30">
//           <Button variant="outline" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//             <Menu className="h-4 w-4" />
//           </Button>
//         </div> */}
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
//           {children}
//         </motion.div>
//       </div>
//     </div>
//   )

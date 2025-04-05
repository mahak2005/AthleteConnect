// import { Navbar } from "@/components/layout/navbar"
// import { Footer } from "@/components/layout/footer"
// import { CoachProfile } from "@/components/sections/coach-profile"

// export default function CoachProfilePage({ params }: { params: { id: string } }) {
//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Navbar />
//       <main className="pt-16">
//         <CoachProfile id={params.id} />
//       </main>
//       <Footer />
//     </div>
//   )
// }

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { CoachProfile } from "@/components/sections/coach-profile"

export default function CoachProfilePage() {
  const coachId = "1"

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="pt-16">
        <CoachProfile id={coachId} />
      </main>
      <Footer />
    </div>
  )
}

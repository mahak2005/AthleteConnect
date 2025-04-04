// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from "@/components/ui/sheet"
// import { Activity, Users, DollarSign, BookOpen, MessageSquare, ShoppingBag, Menu } from 'lucide-react'

// export function MobileNav() {
//   const [open, setOpen] = useState(false)
//   const pathname = usePathname()

//   const routes = [
//     {
//       href: "/discover",
//       label: "Discover Athletes",
//       icon: <Users className="mr-2 h-4 w-4" />,
//       active: pathname === "/discover",
//     },
//     {
//       href: "/sponsorship",
//       label: "Sponsorship",
//       icon: <DollarSign className="mr-2 h-4 w-4" />,
//       active: pathname === "/sponsorship",
//     },
//     {
//       href: "/training",
//       label: "Training",
//       icon: <Activity className="mr-2 h-4 w-4" />,
//       active: pathname === "/training",
//     },
//     {
//       href: "/community",
//       label: "Community",
//       icon: <MessageSquare className="mr-2 h-4 w-4" />,
//       active: pathname === "/community",
//     },
//     {
//       href: "/marketplace",
//       label: "Marketplace",
//       icon: <ShoppingBag className="mr-2 h-4 w-4" />,
//       active: pathname === "/marketplace",
//     },
//   ]

//   return (
//     <div className="md:hidden flex w-full items-center justify-between">
//       <Link href="/" className="flex items-center space-x-2">
//         <Activity className="h-6 w-6 text-primary" />
//         <span className="font-bold">AthleteConnect</span>
//       </Link>
//       <Sheet open={open} onOpenChange={setOpen}>
//         <SheetTrigger asChild>
//           <Button variant="ghost" size="icon">
//             <Menu className="h-6 w-6" />
//             <span className="sr-only">Toggle menu</span>
//           </Button>
//         </SheetTrigger>
//         <SheetContent side="left">
//           <div className="px-2 py-6">
//             <Link href="/" className="flex items-center space-x-2 mb-6" onClick={() => setOpen(false)}>
//               <Activity className="h-6 w-6 text-primary" />
//               <span className="font-bold">AthleteConnect</span>
//             </Link>
//             <nav className="flex flex-col space-y-4">
//               {routes.map((route) => (
//                 <Link
//                   key={route.href}
//                   href={route.href}
//                   onClick={() => setOpen(false)}
//                   className={cn(
//                     "flex items-center rounded-md px-3 py-2 text-sm font-medium",
//                     route.active ? "bg-accent" : "hover:bg-accent"
//                   )}
//                 >
//                   {route.icon}
//                   {route.label}
//                 </Link>
//               ))}
//             </nav>
//             <div className="mt-6 space-y-2">
//               <Button variant="outline" className="w-full" asChild>
//                 <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
//               </Button>
//               <Button className="w-full" asChild>
//                 <Link href="/signup" onClick={() => setOpen(false)}>Sign Up</Link>
//               </Button>
//             </div>
//           </div>
//         </SheetContent>
//       </Sheet>
//     </div>
//   )
// }

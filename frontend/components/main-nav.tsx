// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Activity, Users, DollarSign, BookOpen, MessageSquare, ShoppingBag } from 'lucide-react'

// export function MainNav() {
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
//     <div className="mr-4 hidden md:flex">
//       <Link href="/" className="mr-6 flex items-center space-x-2">
//         <Activity className="h-6 w-6 text-primary" />
//         <span className="hidden font-bold sm:inline-block">
//           AthleteConnect
//         </span>
//       </Link>
//       <nav className="flex items-center space-x-6 text-sm font-medium">
//         {routes.map((route) => (
//           <Link
//             key={route.href}
//             href={route.href}
//             className={cn(
//               "flex items-center transition-colors hover:text-foreground/80",
//               route.active ? "text-foreground" : "text-foreground/60"
//             )}
//           >
//             {route.icon}
//             {route.label}
//           </Link>
//         ))}
//       </nav>
//       <div className="ml-auto flex items-center space-x-4">
//         <Button variant="outline" size="sm" asChild>
//           <Link href="/login">Login</Link>
//         </Button>
//         <Button size="sm" asChild>
//           <Link href="/signup">Sign Up</Link>
//         </Button>
//       </div>
//     </div>
//   )
// }

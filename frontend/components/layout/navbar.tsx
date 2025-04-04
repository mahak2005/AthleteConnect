'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, LogOut, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

const navItems = [
  { name: "Home", path: "/" },
  { name: "Match With Athletes", path: "/match-with-athletes" },
  { name: "Find Your Coach", path: "/find-your-coach" },
  { name: "Events", path: "/events" },
  { name: "Plans", path: "/plans" },
  { name: "Profile", path: "/user" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  return (
    <motion.nav
      className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="h-24 w-24 relative"
            >
              <Image
                src="/Limitless.png"
                alt="Logo"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </motion.div>
            <span className="text-xl font-semibold">LimitlessAthlete</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href={item.path}
                  className={`text-sm font-medium transition-colors ${user && item.path === user.role === "athlete" ? "text-blue-600" : user && item.path === user.role === "coach" ? "text-green-600" : "text-slate-600 hover:text-slate-900"
                    }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            {user ? (
              <>
                <Link href={user.role === "athlete" ? "/user" : "/coach"}>
                  <Button variant="ghost" className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    {user.name}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/auth">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`text-sm font-medium transition-colors ${user && item.path === user.role === "athlete" ? "text-blue-600" : user && item.path === user.role === "coach" ? "text-green-600" : "text-slate-600 hover:text-slate-900"
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2">
                  {user ? (
                    <>
                      <Link href={user.role === "athlete" ? "/user" : "/coach"}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsOpen(false)}
                        >
                          <User className="h-5 w-5 mr-2" />
                          {user.name}
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsOpen(false)}
                        >
                          Login
                        </Button>
                      </Link>
                      <Link href="/auth">
                        <Button
                          size="sm"
                          onClick={() => setIsOpen(false)}
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "./auth-context"; 
import Image from "next/image";
import { useRouter } from "next/navigation";

const userTypes = [
  { id: "athlete", label: "ATHLETE", icon: "/placeholder.svg?height=60&width=60" },
 
  { id: "team", label: "TEAM", icon: "/placeholder.svg?height=60&width=60" },
  
];

export function SignupModal() {
  const { login } = useAuth();
  const router = useRouter();

  // State for form inputs
  const [name, setName] = useState(""); // ✅ Added name field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"brand" | "athlete">("athlete");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false); 

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    try {
      const response = await fetch("http://localhost:5001/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, userType, selectedRole }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, data.userId);
        setOpen(false);
        router.push("/profile"); // ✅ Redirects on successful signup
      } else {
        setErrorMessage(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Error connecting to server.");
      console.error("Signup error:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <div className="absolute right-4 top-4">
          <button
            onClick={() => setOpen(false)}
            className="rounded-sm opacity-70 hover:opacity-100 focus:ring-2 focus:ring-ring"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <form onSubmit={handleSignup} className="flex flex-col space-y-6">
            <div className="flex flex-col text-center">
              <h1 className="text-2xl font-semibold">Sign Up</h1>
              <p className="text-sm text-muted-foreground">Join the largest sports marketplace</p>
            </div>

            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

            <div className="grid gap-4">
              {/* Name Field */}
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm text-gray-500">NAME <span className="text-red-500">*</span></label>
                <Input
                  id="name"
                  placeholder="Full Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email Field */}
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm text-gray-500">EMAIL <span className="text-red-500">*</span></label>
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm text-gray-500">PASSWORD <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                  </button>
                </div>
              </div>

              {/* User Type Selection */}
              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => setUserType("brand")}
                  className={`px-4 py-2 rounded-full ${userType === "brand" ? "bg-teal-50 text-teal-600" : "text-gray-500"}`}
                >
                  I am a Brand
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("athlete")}
                  className={`px-4 py-2 rounded-full ${userType === "athlete" ? "bg-teal-50 text-teal-600" : "text-gray-500"}`}
                >
                  I am an Athlete or...
                </button>
              </div>

              {/* Role Selection */}
              {userType === "athlete" && (
                <div className="grid grid-cols-5 gap-4">
                  {userTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedRole(type.id)}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className={`relative w-12 h-12 rounded-full border-2 ${selectedRole === type.id ? "border-teal-600" : "border-transparent"}`}>
                        <Image src={type.icon} alt={type.label} fill className="object-cover" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">{type.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                SIGN UP
              </Button>
            </div>

            {/* Redirect to Login */}
            <div className="text-center text-sm">
              Already a member? <button onClick={() => setOpen(false)} className="text-teal-600 hover:underline">Login</button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

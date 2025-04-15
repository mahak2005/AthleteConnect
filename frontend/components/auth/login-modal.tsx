
// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Eye, EyeOff, X } from "lucide-react";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useAuth } from "./auth-context";
// import { useRouter } from "next/navigation";

// export function LoginModal() {
//   const { login, closeModal, modalType } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     // Validate email and password
//     if (!email || !password) {
//       setError("Email and password are required");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5001/api/auth/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         login(data.token, data._id); // ✅ Store only token
//         closeModal();
//         router.push("/profile");
//       } else {
//         setError(data.message || "Invalid email or password"); // ✅ Show API error
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       setError("Something went wrong. Please try again.");
//     }
//   };

//   interface LoginModalProps {
//     onClose: () => void;
//   }


//   return (
//     <Dialog open={modalType === "login"} onOpenChange={closeModal}>
//       <DialogContent className="sm:max-w-md">
//         <div className="absolute right-4 top-4">
//           <button onClick={closeModal} className="rounded-sm opacity-70 transition-opacity hover:opacity-100">
//             <X className="h-4 w-4" />
//             <span className="sr-only">Close</span>
//           </button>
//         </div>

//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
//           <form onSubmit={handleLogin} className="flex flex-col space-y-6">
//             <div className="flex flex-col space-y-2 text-center">
//               <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
//             </div>

//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//             <div className="grid gap-4">
//               <div className="grid gap-2">
//                 <label htmlFor="email" className="text-sm text-gray-500">
//                   EMAIL <span className="text-red-500">*</span>
//                 </label>
//                 <Input
//                   id="email"
//                   placeholder="Email"
//                   type="email"
//                   autoCapitalize="none"
//                   autoComplete="email"
//                   autoCorrect="off"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="grid gap-2">
//                 <label htmlFor="password" className="text-sm text-gray-500">
//                   PASSWORD <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     placeholder="Password"
//                     type={showPassword ? "text" : "password"}
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2"
//                   >
//                     {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
//                   </button>
//                 </div>
//               </div>

//               <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
//                 LOGIN
//               </Button>
//             </div>
//           </form>
//         </motion.div>
//       </DialogContent>
//     </Dialog>
//   );
// }


"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "./auth-context";
import { useRouter } from "next/navigation";

export function LoginModal() {
  const { login, closeModal, modalType } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Hardcoded login success
    login("fake-token", "fake-id"); // ✅ Simulate login
    closeModal();
    router.push("/user"); // ✅ Redirect to user/page.tsx
  };


  // interface LoginModalProps {
  //   onClose: () => void;
  // }


  return (
    <Dialog open={modalType === "login"} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-md">
        <div className="absolute right-4 top-4">
          <button onClick={closeModal} className="rounded-sm opacity-70 transition-opacity hover:opacity-100">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <form onSubmit={handleLogin} className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm text-gray-500">
                  EMAIL <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  placeholder="Email"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm text-gray-500">
                  PASSWORD <span className="text-red-500">*</span>
                </label>
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

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                LOGIN
              </Button>
            </div>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}


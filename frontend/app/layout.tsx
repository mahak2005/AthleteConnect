<<<<<<< HEAD
import type React from "react"
import { Inter } from "next/font/google"
// import { ThemeProvider } from "@/components/theme-provider"
// import { Toaster } from "@/components/ui/toaster"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import "./globals.css"
=======
import { AuthProvider } from "@/components/auth/auth-context";
import { LoginModal } from "@/components/auth/login-modal";
import { SignupModal } from "@/components/auth/signup-modal";
import "@/app/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (

    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <LoginModal />
          <SignupModal />
        </AuthProvider>
      </body>
    </html>
  );
}
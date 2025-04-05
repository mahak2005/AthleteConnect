import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // For demo purposes, allow all access to profile
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/profile/:path*",
}


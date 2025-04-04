import Link from "next/link"
import { Activity } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col md:flex-row py-10 md:py-12">
        <div className="mb-8 md:mb-0 md:w-1/3">
          <div className="flex items-center space-x-2 mb-4">
            <Activity className="h-6 w-6 text-primary" />
            <span className="font-bold">AthleteConnect</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            A digital platform supporting underprivileged athletes with financial aid, sponsorships, training, and community.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 md:w-2/3">
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/discover" className="text-muted-foreground hover:text-foreground">Discover Athletes</Link></li>
              <li><Link href="/sponsorship" className="text-muted-foreground hover:text-foreground">Sponsorship</Link></li>
              <li><Link href="/training" className="text-muted-foreground hover:text-foreground">Training</Link></li>
              <li><Link href="/community" className="text-muted-foreground hover:text-foreground">Community</Link></li>
              <li><Link href="/marketplace" className="text-muted-foreground hover:text-foreground">Marketplace</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link href="/press" className="text-muted-foreground hover:text-foreground">Press</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container border-t py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} AthleteConnect. All rights reserved.</p>
      </div>
    </footer>
  )
}

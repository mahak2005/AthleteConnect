"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Athlete {
  id: string
  name: string
  sport: string
  country: string
  age: number
  image: string
  achievements: string[]
  fundingGoal: number
  fundingRaised: number
  endorsements: number
  story: string
  featured?: boolean
}

interface FundingProgressProps {
  athlete: Athlete
}

export default function FundingProgress({ athlete }: FundingProgressProps) {
  const fundingPercentage = Math.round((athlete.fundingRaised / athlete.fundingGoal) * 100)
  const remainingAmount = athlete.fundingGoal - athlete.fundingRaised

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative h-16 w-16 flex-shrink-0">
            <Image
              src={athlete.image || "/placeholder.svg?height=64&width=64"}
              alt={athlete.name}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium truncate">{athlete.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {athlete.sport}, {athlete.country}
                </p>
              </div>
              <Badge variant="outline" className="text-xs">
                {fundingPercentage}%
              </Badge>
            </div>

            <div className="mt-2 space-y-2">
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${fundingPercentage}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full bg-primary rounded-full"
                />
              </div>

              <div className="flex justify-between text-xs">
                <span>${athlete.fundingRaised.toLocaleString()} raised</span>
                <span>${remainingAmount.toLocaleString()} to go</span>
              </div>

              <Button size="sm" className="w-full" asChild>
                <Link href={`/athletes/${athlete.id}`}>Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


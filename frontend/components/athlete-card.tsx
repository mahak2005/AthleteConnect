"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Share2, MessageCircle, TrendingUp, Award } from "lucide-react"

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

interface AthleteCardProps {
  athlete: Athlete
}

export default function AthleteCard({ athlete }: AthleteCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const fundingPercentage = Math.round((athlete.fundingRaised / athlete.fundingGoal) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="relative">
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src={athlete.image || "/placeholder.svg?height=300&width=400"}
              alt={athlete.name}
              fill
              className="object-cover transition-transform hover:scale-105 duration-500"
            />
          </div>
          {athlete.featured && <Badge className="absolute top-3 right-3 bg-primary">Featured</Badge>}
        </div>

        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold">{athlete.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{athlete.sport}</span>
                <span>•</span>
                <span>{athlete.country}</span>
                <span>•</span>
                <span>{athlete.age} years</span>
              </div>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Rising Star
            </Badge>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-2">{athlete.story}</p>

            <div className="flex flex-wrap gap-2">
              {athlete.achievements.slice(0, 2).map((achievement, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  {achievement}
                </Badge>
              ))}
              {athlete.achievements.length > 2 && (
                <Badge variant="outline">+{athlete.achievements.length - 2} more</Badge>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Funding Progress</span>
                <span className="font-medium">
                  ${athlete.fundingRaised.toLocaleString()} of ${athlete.fundingGoal.toLocaleString()}
                </span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${fundingPercentage}%` }} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{fundingPercentage}% Funded</span>
                <span>{athlete.endorsements} Endorsements</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between">
          <div className="flex gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "text-red-500" : ""}
            >
              <Heart className="h-5 w-5" />
              <span className="sr-only">Like</span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-5 w-5" />
              <span className="sr-only">Comment</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
          <Button asChild>
            <Link href={`/athletes/${athlete.id}`}>Support</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}


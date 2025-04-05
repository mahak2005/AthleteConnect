export interface Comment {
    id: string
    userId: string
    userName: string
    userImage: string
    content: string
    date: string
  }
  
  export interface Event {
    id: string
    title: string
    date: string
    time: string
    location: string
    organizer: string
    attendees: number
    image: string
    description?: string
    prizeMoney?: string
    registrationDeadline?: string
    requirements?: string[]
    categories?: string[]
    maxParticipants?: number
    remainingSpots?: number
    isVirtual?: boolean
    price?: number
    isFree?: boolean
  }
  
  export interface SuccessStory {
    id: string
    title: string
    athlete: string
    sport: string
    image: string
    excerpt: string
    content?: string
  }
  
  export interface Discussion {
    id: string
    title: string
    author: string
    replies: number
    views: number
    lastActivity: string
    category: string
  }
  
  
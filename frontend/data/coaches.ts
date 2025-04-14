export interface Coach {
    id: number
    name: string
    title: string
    organization: string
    description: string
    image: string
    badge: string
    location: string
    specialties: string[]
    rating: number
    hourlyRate: number
    availability: string[]
}

export const coaches: Coach[] = [
    {
        id: 1,
        name: "Michael Johnson",
        title: "Head Performance Coach",
        organization: "Elite Sports Academy",
        description: "Former Olympic athlete specializing in sprint training and athletic performance",
        image: "/c2.jpg?height=400&width=400",
        badge: "Performance",
        location: "Gurgaon, Haryana",
        specialties: ["Sprint Training", "Strength & Conditioning", "Olympic Preparation"],
        rating: 4.9,
        hourlyRate: 120,
        availability: ["Mon", "Wed", "Fri"],
    },
    {
        id: 2,
        name: "Sarah Chen",
        title: "Sports Nutritionist",
        organization: "Peak Nutrition",
        description: "Certified nutritionist with expertise in athlete diet planning and performance nutrition",
        image: "/c3.jpg?height=400&width=400",
        badge: "Nutrition",
        location: "Dwarka, Delhi",
        specialties: ["Diet Planning", "Supplement Guidance", "Recovery Nutrition"],
        rating: 4.8,
        hourlyRate: 95,
        availability: ["Tue", "Thu", "Sat"],
    },
    {
        id: 3,
        name: "Dr. James Wilson",
        title: "Head Physiotherapist",
        organization: "Sports Medicine Center",
        description: "Specialist in sports injury rehabilitation and prevention",
        image: "/ath.jpg?height=400&width=400",
        badge: "Physiotherapy",
        location: "Lucknow, UP",
        specialties: ["Injury Rehabilitation", "Preventative Care", "Sports Massage"],
        rating: 4.7,
        hourlyRate: 110,
        availability: ["Mon", "Tue", "Thu", "Fri"],
    },
    {
        id: 4,
        name: "Emma Rodriguez",
        title: "Mental Performance Coach",
        organization: "Mind Athletes",
        description: "Sports psychologist helping athletes achieve peak mental performance",
        image: "/placeholder.svg?height=400&width=400",
        badge: "Mental Training",
        location: "Pune, Maharashtra",
        specialties: ["Stress Management", "Competition Preparation", "Focus Training"],
        rating: 4.9,
        hourlyRate: 105,
        availability: ["Wed", "Thu", "Sat", "Sun"],
    },
    {
        id: 5,
        name: "David Park",
        title: "Strength & Conditioning",
        organization: "Power Performance",
        description: "Expert in developing customized strength training programs for athletes",
        image: "/placeholder.svg?height=400&width=400",
        badge: "Training",
        location: "Bhopal, MP",
        specialties: ["Strength Training", "Power Development", "Athletic Performance"],
        rating: 4.6,
        hourlyRate: 90,
        availability: ["Mon", "Wed", "Fri", "Sat"],
    },
    {
        id: 6,
        name: "Lisa Thompson",
        title: "Recovery Specialist",
        organization: "Athletic Recovery Center",
        description: "Specialized in athlete recovery techniques and injury prevention",
        image: "/placeholder.svg?height=400&width=400",
        badge: "Recovery",
        location: "Chennai, TN",
        specialties: ["Recovery Protocols", "Injury Prevention", "Mobility Work"],
        rating: 4.8,
        hourlyRate: 85,
        availability: ["Tue", "Thu", "Sun"],
    },
]


"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/layout/navbar"
import {
    Heart,
    MessageCircle,
    Share2,
    Users,
    Calendar,
    MapPin,
    Search,
    Filter,
    ArrowRight,
    Award,
    ThumbsUp,
    Clock,
} from "lucide-react"

export default function CommunityPage() {
    const [activeTab, setActiveTab] = useState("feed")

    const posts = [
        {
            id: "1",
            user: {
                name: "Maria Rodriguez",
                image: "/placeholder.svg?height=100&width=100",
                sport: "Track & Field",
                country: "Mexico",
            },
            content:
                "Just finished an amazing training session! Feeling stronger every day. Thanks to my coach @coachpedro for pushing me to my limits. #TrackAndField #RoadToSuccess",
            image: "/placeholder.svg?height=400&width=600",
            likes: 245,
            comments: 32,
            date: "2 days ago",
        },
        {
            id: "2",
            user: {
                name: "Kwame Osei",
                image: "/placeholder.svg?height=100&width=100",
                sport: "Basketball",
                country: "Ghana",
            },
            content:
                "So grateful for the support from AthleteConnect and all my sponsors. Your belief in me makes all the difference! #Grateful #ChaseYourDreams",
            image: "/placeholder.svg?height=400&width=600",
            likes: 189,
            comments: 24,
            date: "1 week ago",
        },
        {
            id: "3",
            user: {
                name: "Aisha Patel",
                image: "/placeholder.svg?height=100&width=100",
                sport: "Swimming",
                country: "India",
            },
            content:
                "New personal best today! 🏊‍♀️ All the hard work is paying off. Thank you to everyone who has supported me on this journey. Special thanks to my sponsors who make it possible for me to compete at this level.",
            image: "/placeholder.svg?height=400&width=600",
            likes: 312,
            comments: 47,
            date: "3 days ago",
        },
    ]

    const discussions = [
        {
            id: "1",
            title: "Tips for maintaining motivation during off-season",
            author: "Maria Rodriguez",
            replies: 24,
            views: 156,
            lastActivity: "2 hours ago",
            category: "Training",
        },
        {
            id: "2",
            title: "How to approach potential sponsors?",
            author: "Kwame Osei",
            replies: 18,
            views: 132,
            lastActivity: "1 day ago",
            category: "Sponsorship",
        },
        {
            id: "3",
            title: "Balancing school and training schedule",
            author: "Aisha Patel",
            replies: 32,
            views: 210,
            lastActivity: "3 days ago",
            category: "Lifestyle",
        },
        {
            id: "4",
            title: "Nutrition tips for competition day",
            author: "Carlos Mendoza",
            replies: 27,
            views: 185,
            lastActivity: "5 days ago",
            category: "Nutrition",
        },
        {
            id: "5",
            title: "Dealing with performance anxiety",
            author: "Leila Ndiaye",
            replies: 41,
            views: 278,
            lastActivity: "1 week ago",
            category: "Mental Health",
        },
    ]

    const events = [
        {
            id: "1",
            title: "Virtual Training Camp: Sprint Techniques",
            date: "June 15-18, 2023",
            time: "10:00 AM - 2:00 PM (Daily)",
            location: "Online",
            organizer: "Coach Maria Johnson",
            attendees: 45,
            image: "/placeholder.svg?height=200&width=300",
        },
        {
            id: "2",
            title: "Athlete Networking Mixer",
            date: "July 8, 2023",
            time: "7:00 PM - 9:00 PM",
            location: "Online",
            organizer: "AthleteConnect Team",
            attendees: 78,
            image: "/placeholder.svg?height=200&width=300",
        },
        {
            id: "3",
            title: "Q&A with Olympic Athletes",
            date: "July 22, 2023",
            time: "11:00 AM - 1:00 PM",
            location: "Online",
            organizer: "AthleteConnect Team",
            attendees: 120,
            image: "/placeholder.svg?height=200&width=300",
        },
    ]

    const successStories = [
        {
            id: "1",
            title: "From Local Competitions to National Team",
            athlete: "Maria Rodriguez",
            sport: "Track & Field",
            image: "/placeholder.svg?height=300&width=400",
            excerpt:
                "How support from AthleteConnect helped Maria secure funding and training to qualify for the national team.",
        },
        {
            id: "2",
            title: "Overcoming Obstacles to Achieve Dreams",
            athlete: "Kwame Osei",
            sport: "Basketball",
            image: "/placeholder.svg?height=300&width=400",
            excerpt:
                "Kwame's journey from playing on makeshift courts to receiving a college scholarship through AthleteConnect's support.",
        },
        {
            id: "3",
            title: "Breaking Barriers in Women's Sports",
            athlete: "Aisha Patel",
            sport: "Swimming",
            image: "/placeholder.svg?height=300&width=400",
            excerpt:
                "How Aisha overcame cultural and financial barriers to become a champion swimmer with help from the AthleteConnect community.",
        },
    ]

    return (
        <section className="pt-24 pb-16 bg-gradient-to-br from-teal-50 to-white">
            <Navbar />
            <div className="container py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl mx-auto text-center mb-12"
                >
                    <Badge variant="outline" className="mb-4">
                        Community
                    </Badge>
                    <h1 className="text-4xl font-bold mb-4">
                        Connect with the <span className="gradient-text">AthleteConnect</span> Community
                    </h1>
                    <p className="text-muted-foreground">
                        Share your journey, learn from others, and build meaningful connections with athletes, coaches, and sponsors
                        from around the world.
                    </p>
                </motion.div>

                <Tabs defaultValue="feed" onValueChange={setActiveTab} className="mb-12">
                    <div className="flex justify-center mb-8">
                        <TabsList>
                            <TabsTrigger value="feed">Social Feed</TabsTrigger>
                            <TabsTrigger value="discussions">Discussions</TabsTrigger>
                            <TabsTrigger value="events">Events</TabsTrigger>
                            <TabsTrigger value="success">Success Stories</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="feed">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex gap-4">
                                            <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                                <Image
                                                    src="/placeholder.svg?height=40&width=40"
                                                    alt="Your profile"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <Textarea
                                                    placeholder="Share your thoughts, achievements, or questions..."
                                                    className="resize-none"
                                                />
                                                <div className="flex justify-between items-center mt-4">
                                                    <div className="flex gap-2">
                                                        <Button variant="outline" size="sm">
                                                            Add Photo
                                                        </Button>
                                                        <Button variant="outline" size="sm">
                                                            Add Video
                                                        </Button>
                                                    </div>
                                                    <Button size="sm">Post</Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {posts.map((post) => (
                                    <motion.div
                                        key={post.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Card>
                                            <CardContent className="p-6">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                                        <Image
                                                            src={post.user.image || "/placeholder.svg"}
                                                            alt={post.user.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{post.user.name}</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {post.user.sport}, {post.user.country} • {post.date}
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="mb-4">{post.content}</p>

                                                <div className="relative h-[300px] w-full mb-4 rounded-lg overflow-hidden">
                                                    <Image src={post.image || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
                                                </div>

                                                <div className="flex justify-between items-center">
                                                    <div className="flex gap-6">
                                                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                                            <Heart className="h-4 w-4" />
                                                            <span>{post.likes}</span>
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="flex items-center gap-1">
                                                            <MessageCircle className="h-4 w-4" />
                                                            <span>{post.comments}</span>
                                                        </Button>
                                                    </div>
                                                    <Button variant="ghost" size="sm">
                                                        <Share2 className="h-4 w-4 mr-2" />
                                                        Share
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}

                                <div className="text-center">
                                    <Button variant="outline">Load More</Button>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-4">Trending Topics</h3>
                                        <div className="space-y-3">
                                            {["#OlympicDreams", "#TrainingTips", "#AthleteLife", "#SponsorshipGoals", "#CompetitionSeason"].map(
                                                (topic, index) => (
                                                    <div key={index} className="flex justify-between items-center">
                                                        <Link href="#" className="text-sm hover:text-primary">
                                                            {topic}
                                                        </Link>
                                                        <Badge variant="outline" className="text-xs">
                                                            {Math.floor(Math.random() * 100) + 10} posts
                                                        </Badge>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-4">Suggested Connections</h3>
                                        <div className="space-y-4">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                                        <Image
                                                            src={`/placeholder.svg?height=40&width=40`}
                                                            alt="Profile"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-medium truncate">Athlete Name</div>
                                                        <div className="text-xs text-muted-foreground">Sport, Country</div>
                                                    </div>
                                                    <Button variant="outline" size="sm">
                                                        Connect
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-4">Upcoming Events</h3>
                                        <div className="space-y-4">
                                            {events.slice(0, 2).map((event) => (
                                                <div key={event.id} className="flex gap-3 items-start">
                                                    <div className="bg-primary/10 p-2 rounded-md">
                                                        <Calendar className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-sm">{event.title}</div>
                                                        <div className="text-xs text-muted-foreground">{event.date}</div>
                                                        <Link href={`/community/events/${event.id}`} className="text-xs text-primary">
                                                            View Details
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                            <Button variant="outline" size="sm" className="w-full" asChild>
                                                <Link href="/community/events">View All Events</Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="discussions">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                    <h2 className="text-2xl font-bold">Forum Discussions</h2>
                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                        <div className="relative flex-1 sm:flex-initial">
                                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input placeholder="Search discussions..." className="pl-9" />
                                        </div>
                                        <Button variant="outline" size="icon">
                                            <Filter className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <Card>
                                    <CardContent className="p-0">
                                        <div className="divide-y">
                                            {discussions.map((discussion) => (
                                                <div key={discussion.id} className="p-4 hover:bg-muted/50 transition-colors">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <Link
                                                            href={`/community/discussions/${discussion.id}`}
                                                            className="font-medium hover:text-primary"
                                                        >
                                                            {discussion.title}
                                                        </Link>
                                                        <Badge variant="outline">{discussion.category}</Badge>
                                                    </div>
                                                    <div className="flex items-center text-sm text-muted-foreground">
                                                        <span>By {discussion.author}</span>
                                                        <span className="mx-2">•</span>
                                                        <span>{discussion.replies} replies</span>
                                                        <span className="mx-2">•</span>
                                                        <span>{discussion.views} views</span>
                                                        <span className="mx-2">•</span>
                                                        <span>Last activity {discussion.lastActivity}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-4 border-t">
                                        <Button className="w-full" asChild>
                                            <Link href="/community/discussions/new">Start a New Discussion</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </div>

                            <div className="space-y-6">
                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-4">Popular Categories</h3>
                                        <div className="space-y-3">
                                            {[
                                                "Training",
                                                "Sponsorship",
                                                "Nutrition",
                                                "Mental Health",
                                                "Competition",
                                                "Equipment",
                                                "Recovery",
                                            ].map((category, index) => (
                                                <div key={index} className="flex justify-between items-center">
                                                    <Link href="#" className="text-sm hover:text-primary">
                                                        {category}
                                                    </Link>
                                                    <Badge variant="outline" className="text-xs">
                                                        {Math.floor(Math.random() * 50) + 10} topics
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-4">Top Contributors</h3>
                                        <div className="space-y-4">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                                        <Image
                                                            src={`/placeholder.svg?height=40&width=40`}
                                                            alt="Profile"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="font-medium truncate">Contributor Name</div>
                                                        <div className="text-xs text-muted-foreground">
                                                            {Math.floor(Math.random() * 100) + 50} posts
                                                        </div>
                                                    </div>
                                                    <Badge variant="outline" className="flex items-center gap-1">
                                                        <Award className="h-3 w-3" />
                                                        <span>Top</span>
                                                    </Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-6">
                                        <h3 className="font-semibold mb-4">Community Guidelines</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li className="flex items-start gap-2">
                                                <ThumbsUp className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                                <span>Be respectful and supportive of all community members</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <ThumbsUp className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                                <span>Share constructive feedback and advice</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <ThumbsUp className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                                <span>Keep discussions relevant to athletics and sports</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <ThumbsUp className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                                <span>Respect privacy and confidentiality</span>
                                            </li>
                                        </ul>
                                        <Button variant="link" className="p-0 h-auto mt-2" asChild>
                                            <Link href="/community/guidelines">Read Full Guidelines</Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="events">
                        <div className="mb-8">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <h2 className="text-2xl font-bold">Upcoming Events</h2>
                                <Button asChild>
                                    <Link href="/community/events/calendar">View Calendar</Link>
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {events.map((event) => (
                                    <motion.div
                                        key={event.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Card className="h-full overflow-hidden">
                                            <div className="relative aspect-video">
                                                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                                                <Badge className="absolute top-3 right-3">{event.location}</Badge>
                                            </div>

                                            <CardContent className="p-6">
                                                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                                <p className="text-sm text-muted-foreground mb-4">Organized by {event.organizer}</p>

                                                <div className="space-y-2 mb-4">
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                                        <span>{event.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                                        <span>{event.time}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                                        <span>{event.location}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Users className="h-4 w-4 text-muted-foreground" />
                                                        <span>{event.attendees} attending</span>
                                                    </div>
                                                </div>

                                                <Button className="w-full" asChild>
                                                    <Link href={`/community/events/${event.id}`}>Register</Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="success">
                        <div className="mb-8">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                                <h2 className="text-2xl font-bold">Success Stories</h2>
                                <Button variant="outline" asChild>
                                    <Link href="/community/success-stories">
                                        View All Stories
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {successStories.map((story) => (
                                    <motion.div
                                        key={story.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Card className="h-full overflow-hidden">
                                            <div className="relative aspect-video">
                                                <Image src={story.image || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
                                            </div>

                                            <CardContent className="p-6">
                                                <Badge variant="outline" className="mb-2">
                                                    {story.sport}
                                                </Badge>
                                                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                                                <p className="text-sm text-muted-foreground mb-4">{story.athlete}'s Journey</p>

                                                <p className="text-sm mb-4">{story.excerpt}</p>

                                                <Button variant="outline" className="w-full" asChild>
                                                    <Link href={`/community/success-stories/${story.id}`}>Read Full Story</Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-muted rounded-xl p-8">
                            <div className="text-center max-w-2xl mx-auto">
                                <h3 className="text-2xl font-bold mb-4">Share Your Success Story</h3>
                                <p className="text-muted-foreground mb-6">
                                    Has AthleteConnect made a difference in your athletic journey? Share your story to inspire others and
                                    show the impact of our community.
                                </p>
                                <Button asChild>
                                    <Link href="/community/success-stories/submit">Submit Your Story</Link>
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    )
}


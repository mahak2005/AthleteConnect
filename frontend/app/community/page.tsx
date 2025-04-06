"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Calendar, MapPin, Search, Filter, ArrowRight, Award, ThumbsUp, Clock } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import PostCard, { type Post } from "@/components/post-card"
import type { Event, Discussion, SuccessStory } from "@/types/community"
import { Navbar } from "@/components/layout/navbar"
import { createPost, getPosts, likePost, addComment } from "@/services/postService"

export default function CommunityPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState("feed")
  const [newPostContent, setNewPostContent] = useState("")
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getPosts()
      setPosts(fetchedPosts)
    } catch (error) {
      console.error('Error fetching posts:', error)
      toast({
        title: "Error",
        description: "Failed to load posts. Please try again later.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const discussions: Discussion[] = [
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

  const events: Event[] = [
    {
      id: "1",
      title: "Virtual Training Camp: Sprint Techniques",
      date: "June 15-18, 2023",
      time: "10:00 AM - 2:00 PM (Daily)",
      location: "Online",
      organizer: "Coach Maria Johnson",
      attendees: 45,
      image: "/placeholder.svg?height=200&width=300",
      description:
        "Join us for an intensive 4-day virtual training camp focused on sprint techniques. Learn from Olympic-level coaches and improve your performance.",
      prizeMoney: "$1,000 in training scholarships",
      registrationDeadline: "June 10, 2023",
      requirements: [
        "Track & Field athletes",
        "All experience levels welcome",
        "Stable internet connection",
        "Camera for technique feedback",
      ],
      categories: ["Junior (13-18)", "Senior (19+)"],
      maxParticipants: 50,
      remainingSpots: 5,
      isVirtual: true,
      price: 75,
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
      description:
        "Connect with fellow athletes, coaches, and sponsors in this virtual networking event. Build relationships that can help advance your athletic career.",
      registrationDeadline: "July 7, 2023",
      maxParticipants: 100,
      remainingSpots: 22,
      isVirtual: true,
      isFree: true,
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
      description:
        "Get insights and advice directly from Olympic athletes. Learn about their journey, training routines, and mental preparation strategies.",
      registrationDeadline: "July 20, 2023",
      maxParticipants: 200,
      remainingSpots: 80,
      isVirtual: true,
      price: 25,
    },
  ]

  const successStories: SuccessStory[] = [
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

  const handleCreatePost = async () => {
    if (newPostContent.trim()) {
      try {
        const newPost = await createPost(newPostContent)
        setPosts([newPost, ...posts])
        setNewPostContent("")
        toast({
          title: "Post created!",
          description: "Your post has been published to the community feed.",
        })
      } catch (error) {
        console.error('Error creating post:', error)
        toast({
          title: "Error",
          description: "Failed to create post. Please try again later.",
          variant: "destructive"
        })
      }
    }
  }

  const handleLikePost = async (postId: string) => {
    try {
      const updatedLikes = await likePost(postId)
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likes: updatedLikes } 
          : post
      ))
    } catch (error) {
      console.error('Error liking post:', error)
      toast({
        title: "Error",
        description: "Failed to like post. Please try again later.",
        variant: "destructive"
      })
    }
  }

  const handleCommentPost = async (postId: string, comment: string) => {
    try {
      const updatedComments = await addComment(postId, comment)
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, comments: updatedComments } 
          : post
      ))
    } catch (error) {
      console.error('Error adding comment:', error)
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again later.",
        variant: "destructive"
      })
    }
  }

  const handleSharePost = (postId: string) => {
    // In a real app, this would open a share dialog or copy link
    navigator.clipboard.writeText(`https://athleteconnect.com/community/posts/${postId}`)

    toast({
      title: "Link copied!",
      description: "Post link has been copied to your clipboard.",
    })
  }

  return (
    <section className="pt-24 pb-12 bg-gradient-to-b from-teal-500 to-teal-400">
    <Navbar/>
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
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Your profile" />
                      <AvatarFallback>Y</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        placeholder="Share your thoughts, achievements, or questions..."
                        className="resize-none"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
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
                        <Button 
                          size="sm" 
                          onClick={handleCreatePost} 
                          disabled={!newPostContent.trim() || isLoading}
                        >
                          {isLoading ? "Posting..." : "Post"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {isLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : (
                posts.map((post) => (
                  <PostCard
                    key={post._id}
                    post={post}
                    onLike={handleLikePost}
                    onComment={handleCommentPost}
                    onShare={handleSharePost}
                  />
                ))
              )}

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
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="Profile" />
                          <AvatarFallback>A</AvatarFallback>
                        </Avatar>
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
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="Profile" />
                          <AvatarFallback>A</AvatarFallback>
                        </Avatar>
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
                      <p className="text-sm text-muted-foreground mb-4">{story.athlete}s Journey</p>

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


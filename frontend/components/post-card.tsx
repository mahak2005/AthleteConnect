"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Send, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Comment } from "@/types/community"

export interface Post {
  id: string
  user: {
    id: string
    name: string
    image: string
    sport: string
    country: string
  }
  content: string
  image?: string
  likes: number
  comments: Comment[]
  date: string
  isLiked?: boolean
}

interface PostCardProps {
  post: Post
  onLike: (postId: string) => void
  onComment: (postId: string, comment: string) => void
  onShare: (postId: string) => void
}

export default function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false)
  const [likesCount, setLikesCount] = useState(post.likes)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>(post.comments || [])

  const handleLike = () => {
    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    setLikesCount((prevCount) => (newLikedState ? prevCount + 1 : prevCount - 1))
    onLike(post.id)
  }

  const handleComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        userId: "current-user", // This would come from auth in a real app
        userName: "You",
        userImage: "/placeholder.svg?height=40&width=40",
        content: newComment,
        date: "Just now",
      }

      setComments([...comments, comment])
      onComment(post.id, newComment)
      setNewComment("")
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Link href={`/profile/${post.user.id}`} className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={post.user.image} alt={post.user.name} />
                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{post.user.name}</div>
                <div className="text-xs text-muted-foreground">
                  {post.user.sport}, {post.user.country} • {post.date}
                </div>
              </div>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Save Post</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
                <DropdownMenuItem>Copy Link</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link href={`/community/posts/${post.id}`}>
            <p className="mb-4">{post.content}</p>

            {post.image && (
              <div className="relative h-[300px] w-full mb-4 rounded-lg overflow-hidden">
                <Image src={post.image || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
              </div>
            )}
          </Link>

          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1 ${isLiked ? "text-red-500" : ""}`}
                onClick={handleLike}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500" : ""}`} />
                <span>{likesCount}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageCircle className="h-4 w-4" />
                <span>{comments.length}</span>
              </Button>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onShare(post.id)}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </CardContent>

        {showComments && (
          <CardFooter className="flex flex-col p-6 pt-0 border-t">
            <div className="w-full space-y-4 mt-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.userImage} alt={comment.userName} />
                    <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="font-medium text-sm">{comment.userName}</div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    <div className="flex gap-4 mt-1">
                      <button className="text-xs text-muted-foreground hover:text-primary">Like</button>
                      <button className="text-xs text-muted-foreground hover:text-primary">Reply</button>
                      <span className="text-xs text-muted-foreground">{comment.date}</span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 mt-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Your profile" />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Textarea
                    placeholder="Write a comment..."
                    className="min-h-[40px] resize-none"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleComment()
                      }
                    }}
                  />
                  <Button size="icon" onClick={handleComment} disabled={!newComment.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardFooter>
        )}
      </Card>
    </motion.div>
  )
}


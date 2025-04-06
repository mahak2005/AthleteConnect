"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, Send, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from 'date-fns'

export interface Post {
  _id: string
  user: {
    _id: string
    name: string
    image: string
    sport: string
    country: string
  }
  content: string
  image?: string
  likes: string[]
  comments: {
    _id: string
    user: {
      _id: string
      name: string
      image: string
    }
    content: string
    createdAt: string
  }[]
  createdAt: string
}

interface PostCardProps {
  post: Post
  onLike: (postId: string) => void
  onComment: (postId: string, comment: string) => void
  onShare: (postId: string) => void
}

export default function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [comment, setComment] = useState("")
  const [isCommenting, setIsCommenting] = useState(false)

  // Get current user ID from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('userData')
    if (userData) {
      const { _id } = JSON.parse(userData)
      setIsLiked(post.likes.includes(_id))
    }
  }, [post.likes])

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike(post._id)
  }

  const handleComment = () => {
    if (comment.trim()) {
      onComment(post._id, comment)
      setComment("")
      setIsCommenting(false)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Link href={`/profile/${post.user._id}`} className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={post.user.image} alt={post.user.name} />
                <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{post.user.name}</div>
                <div className="text-xs text-muted-foreground">
                  {post.user.sport}, {post.user.country} • {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
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
                <DropdownMenuItem onClick={() => onShare(post._id)}>Copy Link</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link href={`/community/posts/${post._id}`}>
            <p className="mb-4">{post.content}</p>

            {post.image && (
              <div className="relative h-[300px] w-full mb-4 rounded-lg overflow-hidden">
                <Image src={post.image} alt="Post image" fill className="object-cover" />
              </div>
            )}
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-2 ${isLiked ? 'text-red-500' : ''}`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{post.likes.length}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setIsCommenting(!isCommenting)}
            >
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments.length}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
              onClick={() => onShare(post._id)}
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>

          {isCommenting && (
            <div className="flex gap-2 mb-4">
              <Textarea
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" onClick={handleComment} disabled={!comment.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          )}

          {post.comments.length > 0 && (
            <div className="space-y-4">
              {post.comments.map((comment) => (
                <div key={comment._id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.image} alt={comment.user.name} />
                    <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-sm">{comment.user.name}</div>
                    <p className="text-sm">{comment.content}</p>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}


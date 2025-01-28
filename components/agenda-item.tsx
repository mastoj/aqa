"use client"

import { ThumbsUp } from "lucide-react"
import type { AgendaItem as AgendaItemType } from "../types/qa"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface AgendaItemProps {
  item: AgendaItemType
  userId: string
}

export function AgendaItem({ item, userId }: AgendaItemProps) {
  const [likes, setLikes] = useState(item.likes)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  const isAuthor = item.author.id === userId

  return (
    <div className="flex items-start gap-4 p-4 border-b">
      <Avatar className="w-10 h-10">
        <AvatarImage src={item.author.avatar} alt={item.author.name} />
        <AvatarFallback>{item.author.name[0]}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-base">{item.author.name}</h3>
          {isAuthor && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">You</span>}
          <span className="text-sm text-muted-foreground">{item.timestamp}</span>
        </div>

        <div className="mt-1">
          <span className="text-muted-foreground">{item.type === "goal" ? "Meeting Goal: " : "Agenda Item: "}</span>
          <span className="text-primary font-medium">{item.content}</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className={`gap-1 ${isLiked ? "text-primary" : ""}`} onClick={handleLike}>
          <ThumbsUp className="w-4 h-4" />
          <span>{likes}</span>
        </Button>

        {isAuthor && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <span className="sr-only">Open menu</span>
                <div className="flex flex-col gap-0.5">
                  <div className="w-1 h-1 rounded-full bg-current" />
                  <div className="w-1 h-1 rounded-full bg-current" />
                  <div className="w-1 h-1 rounded-full bg-current" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  )
}


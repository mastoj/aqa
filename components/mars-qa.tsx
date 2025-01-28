"use client"

import { useState } from "react"
import { ParticipantAvatars } from "./participant-avatars"
import { AgendaItem } from "./agenda-item"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import type { AgendaItem as AgendaItemType, Participant } from "../types/qa"
import { v4 as uuidv4 } from "uuid"

interface MarsQAProps {
  userId: string
}

const initialParticipants: Participant[] = [
  {
    id: "1",
    name: "Anonymous Red Panda",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XXhP9SnSmTiXRrMOi7pGi0UrEemEbg.png",
  },
  {
    id: "2",
    name: "Susie Lee",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XXhP9SnSmTiXRrMOi7pGi0UrEemEbg.png",
  },
  {
    id: "3",
    name: "Peter Pan",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XXhP9SnSmTiXRrMOi7pGi0UrEemEbg.png",
  },
  {
    id: "4",
    name: "Andrew Ross",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XXhP9SnSmTiXRrMOi7pGi0UrEemEbg.png",
  },
  {
    id: "5",
    name: "Team Member 5",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XXhP9SnSmTiXRrMOi7pGi0UrEemEbg.png",
  },
  {
    id: "6",
    name: "Team Member 6",
    avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XXhP9SnSmTiXRrMOi7pGi0UrEemEbg.png",
  },
]

const initialItems: AgendaItemType[] = [
  {
    id: "1",
    author: initialParticipants[0],
    content: "Discuss and Finalize team bonding activities.",
    timestamp: "Yesterday 9:00am PDT",
    likes: 14,
    type: "goal",
  },
  {
    id: "2",
    author: initialParticipants[1],
    content: "Simulated bonfire singalong with Elon",
    timestamp: "today 2:30pm PDT",
    likes: 12,
    type: "agenda",
  },
  {
    id: "3",
    author: initialParticipants[2],
    content: "Half day exploring Happy Face Crater",
    timestamp: "today 2:36pm PDT",
    likes: 10,
    type: "agenda",
  },
  {
    id: "4",
    author: initialParticipants[3],
    content: "Hike to summit of Olympus Mons",
    timestamp: "today 2:56pm PDT",
    likes: 9,
    type: "agenda",
  },
]

export function MarsQA({ userId }: MarsQAProps) {
  const [items, setItems] = useState(initialItems)
  const [newItem, setNewItem] = useState("")
  const [title, setTitle] = useState("Mars offsite Planning")

  const handleAddItem = () => {
    if (!newItem.trim()) return

    const newAgendaItem: AgendaItemType = {
      id: uuidv4(),
      author: {
        id: userId,
        name: "Anonymous User",
        avatar: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XXhP9SnSmTiXRrMOi7pGi0UrEemEbg.png",
      },
      content: newItem,
      timestamp: new Date().toLocaleString(),
      likes: 0,
      type: "agenda",
    }

    setItems([...items, newAgendaItem])
    setNewItem("")
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <h1
              className="text-xl font-semibold px-2 -mx-2 rounded hover:bg-accent/50 focus:bg-accent/50 focus:outline-none"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => setTitle(e.currentTarget.textContent || "Mars offsite Planning")}
              role="textbox"
              aria-label="Edit title"
            >
              {title}
            </h1>
          </div>
          <ParticipantAvatars participants={initialParticipants} />
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Add new agenda item..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
          />
          <Button onClick={handleAddItem}>Add</Button>
        </div>
      </div>

      <div className="divide-y">
        {items.map((item) => (
          <AgendaItem key={item.id} item={item} userId={userId} />
        ))}
      </div>
    </Card>
  )
}


import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Participant } from "../types/qa"

interface ParticipantAvatarsProps {
  participants: Participant[]
  maxVisible?: number
}

export function ParticipantAvatars({ participants, maxVisible = 5 }: ParticipantAvatarsProps) {
  const visibleParticipants = participants.slice(0, maxVisible)
  const remaining = participants.length - maxVisible

  return (
    <div className="flex items-center -space-x-2">
      {visibleParticipants.map((participant) => (
        <Avatar key={participant.id} className="border-2 border-background w-8 h-8">
          <AvatarImage src={participant.avatar} alt={participant.name} />
          <AvatarFallback>{participant.name[0]}</AvatarFallback>
        </Avatar>
      ))}
      {remaining > 0 && (
        <div className="ml-2 text-sm text-muted-foreground">
          and <span className="text-primary underline">+{remaining} more</span>
        </div>
      )}
    </div>
  )
}


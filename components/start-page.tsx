"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { v4 as uuidv4 } from "uuid"
import type { UserInfo } from "@/types/qa"
import { createSessionAction } from "@/app/actions"

interface StartPageProps {
  userInfo: UserInfo | null
}

export function StartPage({ userInfo }: StartPageProps) {
  const [sessionTitle, setSessionTitle] = useState("")
  const router = useRouter()

  const handleStartSession = async () => {
    if (!sessionTitle.trim()) return
    const sessionId = uuidv4()
    await createSessionAction(sessionId, sessionTitle)
    router.push(`/session/${sessionId}`)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Start a New Q&A Session</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {userInfo && <p className="text-sm text-muted-foreground">Welcome, {userInfo.userName}!</p>}
          <div className="space-y-2">
            <label htmlFor="session-title" className="text-sm font-medium">
              Session Title
            </label>
            <Input
              id="session-title"
              placeholder="Enter session title..."
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
            />
          </div>
          <Button onClick={handleStartSession} className="w-full">
            Start Session
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


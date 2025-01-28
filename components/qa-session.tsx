"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { Question, UserInfo, Session } from "../types/qa"
import { v4 as uuidv4 } from "uuid"
import { QuestionItem } from "./question-item"
import { addQuestionAction, updateQuestionLikesAction } from "@/app/actions"

interface QASessionProps {
  userInfo: UserInfo
  initialSession: Session
}

export function QASession({ userInfo, initialSession }: QASessionProps) {
  const [session, setSession] = useState<Session>(initialSession)
  const [newQuestion, setNewQuestion] = useState("")

  const handleAddQuestion = async () => {
    if (!newQuestion.trim()) return

    const newQuestionItem: Question = {
      id: uuidv4(),
      author: {
        userId: userInfo.userId,
        userName: userInfo.userName,
      },
      content: newQuestion,
      timestamp: new Date().toLocaleString(),
      likes: [], // Initialize as an empty array
    }

    const updatedSession = await addQuestionAction(session.id, newQuestionItem)
    setSession(updatedSession)
    setNewQuestion("")
  }

  const handleUpdateLikes = async (questionId: string, likes: string[]) => {
    const updatedSession = await updateQuestionLikesAction(session.id, questionId, likes)
    setSession(updatedSession)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{session.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask a question..."
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddQuestion()}
            />
            <Button onClick={handleAddQuestion}>Ask</Button>
          </div>

          <div className="space-y-4">
            {session.questions.map((question) => (
              <QuestionItem
                key={question.id}
                question={question}
                userInfo={userInfo}
                onUpdateLikes={handleUpdateLikes}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


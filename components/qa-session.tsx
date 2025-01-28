"use client";

import { addQuestionAction, updateQuestionLikesAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import useSWR from "swr";
import { v4 as uuidv4 } from "uuid";
import type { Question, Session, UserInfo } from "../types/qa";
import { QuestionItem } from "./question-item";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface QASessionProps {
  userInfo: UserInfo;
  sessionId: string;
  initialSession: Session;
}

export function QASession({
  userInfo,
  sessionId,
  initialSession,
}: QASessionProps) {
  const [newQuestion, setNewQuestion] = useState("");

  const { data: session, mutate } = useSWR<Session>(
    `/api/session/${sessionId}`,
    fetcher,
    {
      fallbackData: initialSession,
      refreshInterval: 4000, // Poll every 10 seconds
    }
  );

  const handleAddQuestion = async () => {
    if (!newQuestion.trim()) return;

    const newQuestionItem: Question = {
      id: uuidv4(),
      author: {
        userId: userInfo.userId,
        userName: userInfo.userName,
      },
      content: newQuestion,
      timestamp: new Date().toLocaleString(),
      likes: [],
    };

    await addQuestionAction(sessionId, newQuestionItem);
    setNewQuestion("");
    mutate(); // Trigger a revalidation
  };

  const handleUpdateLikes = async (questionId: string, likes: string[]) => {
    await updateQuestionLikesAction(sessionId, questionId, likes);
    mutate(); // Trigger a revalidation
  };

  if (!session) {
    return <div>Loading...</div>;
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
            {session.questions?.map((question) => (
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
  );
}

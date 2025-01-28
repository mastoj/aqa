"use client";

import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { useMemo } from "react";
import type { Question, UserInfo } from "../types/qa";

interface QuestionItemProps {
  question: Question;
  userInfo: UserInfo;
  onUpdateLikes: (questionId: string, likes: string[]) => void;
}

function getInitials(name: string): string {
  const [color, animal] = name.split(/(?=[A-Z])/);
  return `${color[0]}${animal[0]}`;
}

function getSubtleColor(name: string): string {
  const hue =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;
  return `hsl(${hue}, 30%, 90%)`;
}

export function QuestionItem({
  question,
  userInfo,
  onUpdateLikes,
}: QuestionItemProps) {
  const isLiked = question.likes.includes(userInfo.userId);

  const handleLike = () => {
    let newLikes: string[];
    if (isLiked) {
      newLikes = question.likes.filter((id) => id !== userInfo.userId);
    } else {
      newLikes = [...question.likes, userInfo.userId];
    }
    onUpdateLikes(question.id, newLikes);
  };

  const isAuthor = question.author.userId === userInfo.userId;
  const initials = useMemo(
    () => getInitials(question.author.userName),
    [question.author.userName]
  );
  const backgroundColor = useMemo(
    () => getSubtleColor(question.author.userName),
    [question.author.userName]
  );

  return (
    <div className="flex items-start gap-4 p-4 border rounded-lg">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
        style={{ backgroundColor }}
        title={question.author.userName}
      >
        {initials}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-base">
            {question.author.userName}
          </h3>
          {isAuthor && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              You
            </span>
          )}
          <span className="text-sm text-muted-foreground">
            {question.timestamp}
          </span>
        </div>

        <p className="mt-1 text-sm">{question.content}</p>
      </div>

      <Button
        variant="ghost"
        size="sm"
        className={`gap-1 ${
          isLiked ? "bg-primary/10 text-primary hover:bg-primary/20" : ""
        }`}
        onClick={handleLike}
      >
        <ThumbsUp className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
        <span>{question.likes.length}</span>
      </Button>
    </div>
  );
}

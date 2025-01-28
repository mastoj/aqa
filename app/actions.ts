"use server"

import { createSession, addQuestion, updateQuestionLikes } from "@/lib/session-store"
import type { Question } from "@/types/qa"

export async function createSessionAction(id: string, title: string) {
  return createSession(id, title)
}

export async function addQuestionAction(sessionId: string, question: Question) {
  return addQuestion(sessionId, question)
}

export async function updateQuestionLikesAction(sessionId: string, questionId: string, likes: string[]) {
  return updateQuestionLikes(sessionId, questionId, likes)
}


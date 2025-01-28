"use server"

import { createSession, addQuestion, updateQuestionLikes } from "@/lib/session-store"
import type { Question } from "@/types/qa"
import { revalidatePath } from "next/cache"

export async function createSessionAction(id: string, title: string) {
  const session = await createSession(id, title)
  revalidatePath(`/session/${id}`)
  return session
}

export async function addQuestionAction(sessionId: string, question: Question) {
  const session = await addQuestion(sessionId, question)
  revalidatePath(`/session/${sessionId}`)
  return session
}

export async function updateQuestionLikesAction(sessionId: string, questionId: string, likes: string[]) {
  const session = await updateQuestionLikes(sessionId, questionId, likes)
  revalidatePath(`/session/${sessionId}`)
  return session
}


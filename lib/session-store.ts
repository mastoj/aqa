import type { Session, Question } from "@/types/qa"

// In-memory database
const sessions: Record<string, Session> = {}

export async function createSession(id: string, title: string): Promise<Session> {
  const newSession: Session = {
    id,
    title,
    questions: [],
  }
  sessions[id] = newSession
  return newSession
}

export async function getSession(id: string): Promise<Session | null> {
  return sessions[id] || null
}

export async function addQuestion(sessionId: string, question: Question): Promise<Session> {
  const session = sessions[sessionId]
  if (!session) {
    throw new Error("Session not found")
  }
  session.questions.push(question)
  return session
}

export async function updateQuestionLikes(sessionId: string, questionId: string, likes: string[]): Promise<Session> {
  const session = sessions[sessionId]
  if (!session) {
    throw new Error("Session not found")
  }
  const question = session.questions.find((q) => q.id === questionId)
  if (!question) {
    throw new Error("Question not found")
  }
  question.likes = likes
  return session
}


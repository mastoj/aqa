import type { Question, Session } from "@/types/qa";
import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL as string,
  authToken: process.env.TURSO_AUTH_TOKEN as string,
});

export async function createSession(
  id: string,
  title: string
): Promise<Session> {
  await client.execute({
    sql: "INSERT INTO sessions (id, title) VALUES (?, ?)",
    args: [id, title],
  });

  return { id, title, questions: [] };
}

export async function getSession(id: string): Promise<Session | null> {
  const sessionResult = await client.execute({
    sql: "SELECT * FROM sessions WHERE id = ?",
    args: [id],
  });

  if (sessionResult.rows.length === 0) {
    return null;
  }

  const session = sessionResult.rows[0] as unknown as Session;

  const questionsResult = await client.execute({
    sql: `SELECT q.*, GROUP_CONCAT(l.user_id) as likes
          FROM questions q
          LEFT JOIN likes l ON q.id = l.question_id
          WHERE q.session_id = ?
          GROUP BY q.id`,
    args: [id],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session.questions = questionsResult.rows.map((row: any) => ({
    id: row.id,
    author: {
      userId: row.author_id,
      userName: row.author_name,
    },
    content: row.content,
    timestamp: row.timestamp,
    likes: row.likes ? row.likes.split(",") : [],
  }));

  return session;
}

export async function addQuestion(
  sessionId: string,
  question: Question
): Promise<Session> {
  await client.execute({
    sql: "INSERT INTO questions (id, session_id, author_id, author_name, content) VALUES (?, ?, ?, ?, ?)",
    args: [
      question.id,
      sessionId,
      question.author.userId,
      question.author.userName,
      question.content,
    ],
  });

  return getSession(sessionId) as Promise<Session>;
}

export async function updateQuestionLikes(
  sessionId: string,
  questionId: string,
  likes: string[]
): Promise<Session> {
  // First, remove all existing likes for this question
  await client.execute({
    sql: "DELETE FROM likes WHERE question_id = ?",
    args: [questionId],
  });

  // Then, insert the new likes
  for (const userId of likes) {
    await client.execute({
      sql: "INSERT INTO likes (question_id, user_id) VALUES (?, ?)",
      args: [questionId, userId],
    });
  }

  return getSession(sessionId) as Promise<Session>;
}

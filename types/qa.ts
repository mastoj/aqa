export interface UserInfo {
  userId: string
  userName: string
}

export interface Participant {
  userId: string
  userName: string
}

export interface Question {
  id: string
  author: Participant
  content: string
  timestamp: string
  likes: string[] // Changed from number to string[]
}

export interface Session {
  id: string
  title: string
  questions: Question[]
}


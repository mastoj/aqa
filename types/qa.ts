export type UserInfo = {
  userId: string;
  userName: string;
};

export type Participant = {
  userId: string;
  userName: string;
};

export type Question = {
  id: string;
  author: Participant;
  content: string;
  timestamp: string;
  likes: string[]; // Changed from number to string[]
};

export type Session = {
  id: string;
  title: string;
  questions: Question[];
};

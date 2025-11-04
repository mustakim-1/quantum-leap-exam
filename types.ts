
export interface User {
  id: string;
  name: string;
  email: string;
  password_insecure: string; // This is insecure, for demo purposes only.
  role: 'student' | 'admin';
  avatar: string;
  school: string;
  grade: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface Exam {
  id: string;
  title: string;
  duration: number; // in seconds
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
}

export interface ExamResult {
  examId: string;
  userId: string;
  score: number;
  timeTaken: number; // in seconds
  totalQuestions: number;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  score: number;
  timeTaken: number;
}
// Quiz Foundation Models
// Architecture for topic quizzes, module tests, level exams, and mixed reviews

// Quiz types
export type QuizType = 'topic_quiz' | 'module_test' | 'level_exam' | 'mixed_review' | 'daily_practice' | 'mistake_review';

// Quiz session tracking
export interface QuizSession {
  quizId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  accuracy: number;
  xpEarned: number;
  streak: number;
  status: 'in_progress' | 'completed' | 'abandoned';
}

// User quiz result
export interface UserQuizResult {
  quizId: string;
  userId: string;
  score: number; // 0-100
  xp: number;
  accuracy: number; // percentage
  streak: number;
  completionTime: number; // seconds
  wrongAnswers: QuizWrongAnswer[];
  completedAt: string; // ISO date
}

// Wrong answer tracking
export interface QuizWrongAnswer {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  exerciseType: string;
}

// Quiz configuration
export interface QuizConfig {
  type: QuizType;
  level?: string; // For level_exam
  topicId?: string; // For topic_quiz
  questionCount: number;
  timeLimit?: number; // in seconds, optional
  xpReward: number;
  passingScore?: number; // minimum score to pass
}

// Quiz question (wrapper around exercise)
export interface QuizQuestion {
  id: string;
  exerciseId: string;
  order: number;
  points: number; // points for correct answer
}

// Quiz attempt
export interface QuizAttempt {
  quizId: string;
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  answeredAt: string;
}

// Daily Grammar Practice configuration
export interface DailyPracticeConfig {
  date: string;
  questionCount: number; // typically 5-10
  topics: string[]; // topic IDs to include
  includeMistakes: boolean;
  lastCompleted?: string;
}

// Mistake Review configuration
export interface MistakeReviewConfig {
  userId: string;
  fromDate?: string; // optional - only mistakes after this date
  toDate?: string; // optional - only mistakes before this date
  limit?: number; // max number of mistakes to review
}

// Quiz statistics
export interface QuizStats {
  quizId: string;
  attemptsCount: number;
  bestScore: number;
  averageScore: number;
  averageTime: number;
  completionRate: number;
}

// Level Exam specific
export interface LevelExam extends QuizConfig {
  type: 'level_exam';
  level: string; // CEFR level: A1, A2, B1, B2, C1, C2
  topicsIncluded: string[]; // all topic IDs for this level
  requirements: {
    minScore: number;
    minAccuracy: number;
    requiredStreak?: number;
  };
}

// Topic Quiz specific
export interface TopicQuiz extends QuizConfig {
  type: 'topic_quiz' | 'module_test' | 'mixed_review' | 'daily_practice' | 'mistake_review';
  topicId: string;
}
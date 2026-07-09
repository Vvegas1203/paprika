// Grammar CEFR Levels
export type GrammarLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

// Grammar exercise types for future implementation
export type ExerciseType = 
  | 'multiple_choice'
  | 'fill_blank'
  | 'sentence_ordering'
  | 'drag_drop'
  | 'matching'
  | 'translation'
  | 'choose_article'
  | 'choose_verb_form'
  | 'choose_preposition'
  | 'error_correction'
  | 'listening'
  | 'image_selection'
  | 'typing_answer'
  | 'true_false';

// Grammar Example
export interface GrammarExample {
  german: string;
  english: string;
}

// Grammar Rule
export interface GrammarRule {
  id: string;
  lessonId: string;
  text: string;
  examples: GrammarExample[];
}

// Grammar Lesson - main content unit
export interface GrammarLesson {
  id: string;
  topicId: string;
  title: string;
  explanation: string;
  rules: GrammarRule[];
  examples: GrammarExample[];
  exceptions: GrammarExample[];
  importantNotes?: string[];
  commonMistakes?: GrammarExample[];
  order: number;
}

// Grammar Topic (for JSON data with lessons)
export interface GrammarTopicData {
  id: string;
  level: GrammarLevel;
  title: string;
  icon: string;
  order: number;
  description?: string;
  lessons: GrammarLesson[];
}

// Grammar Topic (without lessons - for UI display)
export interface GrammarTopic {
  id: string;
  level: GrammarLevel;
  title: string;
  icon: string;
  order: number;
  description?: string;
  lessonsCount: number;
}

// Exercise for future implementation
export interface GrammarExercise {
  id: string;
  topicId: string;
  type: ExerciseType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  order: number;
}

// User Grammar Progress
export interface UserGrammarProgress {
  lessonId: string;
  completed: boolean;
  mastery: number; // 0-100
  mistakes: number;
  lastReview?: string; // YYYY-MM-DD
  completedAt?: string; // YYYY-MM-DD
}

// Grammar Progress by topic
export interface TopicGrammarProgress {
  topicId: string;
  completion: number; // 0-100
  mastery: number; // 0-100
  stars: number; // 0-3
  xpEarned: number;
  mistakesCount: number;
  lastReview?: string;
}

// Quiz/Test result for future implementation
export interface GrammarQuizResult {
  quizId: string;
  score: number;
  xp: number;
  accuracy: number;
  streak: number;
  completionTime: number; // seconds
  wrongAnswers: number[];
  completedAt: string;
}
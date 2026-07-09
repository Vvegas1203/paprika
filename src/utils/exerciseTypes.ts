// Exercise Foundation Models
// This provides a flexible architecture for multiple exercise types

// Exercise types
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

// Base exercise interface
export interface Exercise {
  id: string;
  type: ExerciseType;
  topicId: string; // Reference to grammar topic instead of screen
  lessonId?: string; // Optional reference to specific lesson
  order?: number; // For ordering exercises within a lesson
  xp?: number; // XP reward for completing
}

// Multiple Choice Exercise
export interface MultipleChoiceExercise extends Exercise {
  type: 'multiple_choice';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

// Fill in the Blank Exercise
export interface FillBlankExercise extends Exercise {
  type: 'fill_blank';
  sentence: string; // e.g., "Ich ___ Deutsch."
  blankPosition: number; // index of blank in sentence
  options?: string[]; // optional - if empty, free text input
  correctAnswer: string;
  explanation?: string;
}

// Sentence Ordering Exercise
export interface SentenceOrderingExercise extends Exercise {
  type: 'sentence_ordering';
  words: string[]; // Words to arrange
  correctOrder: number[]; // Indices of correct order
  translation: string;
}

// Drag & Drop Exercise
export interface DragDropExercise extends Exercise {
  type: 'drag_drop';
  instruction: string;
  items: Array<{ id: string; text: string }>;
  targets: Array<{ id: string; text: string }>;
  correctMapping: Record<string, string>; // item id -> target id
}

// Matching Exercise
export interface MatchingExercise extends Exercise {
  type: 'matching';
  leftItems: Array<{ id: string; text: string }>;
  rightItems: Array<{ id: string; text: string }>;
  correctPairs: Array<{ leftId: string; rightId: string }>;
}

// Translation Exercise
export interface TranslationExercise extends Exercise {
  type: 'translation';
  german: string;
  english: string;
  hints?: string[];
}

// Choose Correct Article Exercise
export interface ChooseArticleExercise extends Exercise {
  type: 'choose_article';
  noun: string;
  options: Array<'der' | 'die' | 'das' | 'den' | 'dem' | 'des'>;
  correctAnswer: 'der' | 'die' | 'das' | 'den' | 'dem' | 'des';
  case?: 'nominative' | 'accusative' | 'dative' | 'genitive';
}

// Choose Verb Form Exercise
export interface ChooseVerbFormExercise extends Exercise {
  type: 'choose_verb_form';
  verb: string;
  person: 'ich' | 'du' | 'er/sie/es' | 'wir' | 'ihr' | 'sie/Sie';
  options: string[];
  correctAnswer: string;
  tense: 'present' | 'past' | 'future';
}

// Choose Preposition Exercise
export interface ChoosePrepositionExercise extends Exercise {
  type: 'choose_preposition';
  sentence: string;
  options: string[];
  correctAnswer: string;
  case: 'accusative' | 'dative' | 'both';
}

// Error Correction Exercise
export interface ErrorCorrectionExercise extends Exercise {
  type: 'error_correction';
  incorrectSentence: string;
  correctSentence: string;
  errorPosition?: number;
}

// Listening Exercise
export interface ListeningExercise extends Exercise {
  type: 'listening';
  audioUrl?: string; // URL to audio file
  transcript: string;
  question?: string;
  options?: string[];
  correctAnswer?: string;
}

// Image Selection Exercise
export interface ImageSelectionExercise extends Exercise {
  type: 'image_selection';
  question: string;
  imageOptions: Array<{ url: string; label: string }>;
  correctAnswer: string;
}

// Typing Answer Exercise
export interface TypingAnswerExercise extends Exercise {
  type: 'typing_answer';
  prompt: string;
  correctAnswer: string;
  caseSensitive?: boolean;
  acceptVariants?: string[];
}

// True/False Exercise
export interface TrueFalseExercise extends Exercise {
  type: 'true_false';
  statement: string;
  isTrue: boolean;
  explanation?: string;
}

// Union type for all exercises
export type GrammarExercise = 
  | MultipleChoiceExercise
  | FillBlankExercise
  | SentenceOrderingExercise
  | DragDropExercise
  | MatchingExercise
  | TranslationExercise
  | ChooseArticleExercise
  | ChooseVerbFormExercise
  | ChoosePrepositionExercise
  | ErrorCorrectionExercise
  | ListeningExercise
  | ImageSelectionExercise
  | TypingAnswerExercise
  | TrueFalseExercise;

// Exercise result for tracking
export interface UserExerciseResult {
  exerciseId: string;
  userId: string;
  completed: boolean;
  attempts: number;
  correct: boolean;
  timeSpent: number; // in seconds
  answeredAt: string; // ISO date
}
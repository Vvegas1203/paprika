export interface Word {
  id: number;
  module: string;
  topic: string;
  word: string;
  translation: string;
  image: string;
}

export type CardStatus = 'known' | 'learning' | null;

export type Screen = 'main' | 'modules' | 'topics' | 'cards' | 'topic-result' | 'blitz' | 'blitz-result' | 'grammar-levels' | 'grammar-topics' | 'grammar-lesson' | 'grammar-practice';

export interface BlitzCard {
  word: Word;
  userAnswer: string;
  status: 'pending' | 'correct' | 'incorrect';
}

// Topic test progress - tracks which words were correctly answered in topic tests
export interface TopicTestProgress {
  [wordId: number]: {
    correct: boolean;
    lastAttempt: string; // date of last attempt
  };
}

export interface DayStats {
  date: string; // YYYY-MM-DD format
  wordsLearned: number;
  cardsViewed: number;
  cardsKnown: number;
  blitzCompleted: number;
}

export interface DailyStats {
  [date: string]: DayStats;
}
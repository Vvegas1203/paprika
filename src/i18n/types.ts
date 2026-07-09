export type Language = 'en' | 'ru' | 'ar';

export interface I18nStrings {
  // Navigation
  back: string;
  backToModules: string;
  backToTopics: string;
  backToMain: string;

  // Main screen
  dailyProgress: string;
  dailyGoal: string;
  goalCompleted: string;
  wordsAboveToday: string;
  wordsToday: string;
  dayStreak: string;
  module: string;
  blitzTest: string;
  blitzSubtitle: string;
  study: string;
  thisWeek: string;
  grammar: string;
  grammarSubtitle: string;

  // Study
  learning: string;
  noCards: string;
  knowSwipe: string;
  learnSwipe: string;
  knowOverlay: string;
  learnOverlay: string;

  // Modules
  selectModule: string;

  // Topics
  topics: string;
  moreTopics: string;
  completed: string;
  scrollForMore: string;

  // Topic result
  topicCompleted: string;
  iKnow: string;
  iDontKnow: string;
  total: string;
  test: string;

  // Test modal
  topicStudied: string;
  topicStudiedDesc: string;
  whatToDo: string;
  takeTest: string;
  repeatCards: string;

  // Blitz
  enterWordPlaceholder: string;
  answer: string;
  dontKnow: string;
  finish: string;
  correctAnswer: string;
  correctEmoji: string;
  waitingNext: string;

  // Blitz result
  testResults: string;
  totalWords: string;
  correct: string;
  incorrect: string;
  retry: string;

  // Day stats
  noActivity: string;
  wordsLearned: string;
  cardsViewed: string;
  knownMarked: string;
  blitzTestsPassed: string;

  // Grammar
  grammarLessons: string;
  startPractice: string;
  theory: string;
  examples: string;
  exceptions: string;
  importantNotes: string;
  commonMistakes: string;
  summary: string;
  completedLessons: string;

  // Week days
  sun: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
}
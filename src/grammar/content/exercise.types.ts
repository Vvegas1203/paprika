/**
 * Типы упражнений. Используется discriminated union по полю `kind`.
 * Generic-архитектура позволяет типобезопасно работать с любыми упражнениями.
 */

import type { ExerciseKind, GermanCase, Gender, Localized, Person, Slug, Tense, Difficulty } from '../core/types';

export interface ExerciseBase {
  id: Slug;
  topicId: Slug;
  kind: ExerciseKind;
  difficulty: Difficulty;
  question: Localized;
  hint?: Localized;
  explanation?: Localized;
  points?: number;
}

/** Выбор варианта */
export interface ChoiceExercise extends ExerciseBase {
  kind: 'choice';
  options: string[];
  correct: number | number[];
  multiple?: boolean;
}

/** Заполнение пропуска */
export interface FillExercise extends ExerciseBase {
  kind: 'fill';
  template: string;
  answers: string[];
  /** Принимать ли альтернативные правильные ответы */
  alternatives?: string[][];
  caseSensitive?: boolean;
}

/** Сопоставление пар */
export interface MatchExercise extends ExerciseBase {
  kind: 'match';
  left: string[];
  right: string[];
  pairs: [number, number][];
}

/** Трансформация */
export interface TransformExercise extends ExerciseBase {
  kind: 'transform';
  input: string;
  instruction: Localized;
  answer: string;
  alternatives?: string[];
}

/** Перевод */
export interface TranslateExercise extends ExerciseBase {
  kind: 'translate';
  source: string;
  sourceLang: 'de' | 'ru' | 'en';
  targetLang: 'de' | 'ru' | 'en';
  answer: string;
  alternatives?: string[];
}

/** Спряжение */
export interface ConjugateExercise extends ExerciseBase {
  kind: 'conjugate';
  verb: string;
  tense: Tense;
  person: Person;
  answer: string;
}

/** Склонение */
export interface DeclineExercise extends ExerciseBase {
  kind: 'decline';
  word: string;
  gender: Gender;
  case: GermanCase;
  articleType: 'definite' | 'indefinite' | 'none';
  answer: string;
}

/** Поиск ошибки */
export interface SpotErrorExercise extends ExerciseBase {
  kind: 'spot-error';
  sentence: string;
  errorPosition: number;
  correction: string;
}

/** Расстановка слов в правильном порядке */
export interface OrderWordsExercise extends ExerciseBase {
  kind: 'order-words';
  words: string[];
  correctOrder: number[];
}

export type Exercise =
  | ChoiceExercise
  | FillExercise
  | MatchExercise
  | TransformExercise
  | TranslateExercise
  | ConjugateExercise
  | DeclineExercise
  | SpotErrorExercise
  | OrderWordsExercise;

/** Результат попытки ответа */
export interface AttemptResult {
  exerciseId: Slug;
  topicId: Slug;
  correct: boolean;
  userAnswer: unknown;
  expectedAnswer: unknown;
  spentMs?: number;
  attemptNo: number;
  timestamp: number;
}
/**
 * Базовые типы модуля. Все сущности строятся на этих примитивах.
 */

/** CEFR-уровни */
export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

/** Падежи немецкого языка */
export type GermanCase = 'nominativ' | 'akkusativ' | 'dativ' | 'genitiv';

/** Род существительных */
export type Gender = 'maskulin' | 'feminin' | 'neutrum' | 'plural';

/** Лицо и число */
export type Person =
  | '1sg' | '2sg' | '3sg-m' | '3sg-f' | '3sg-n'
  | '1pl' | '2pl' | '3pl' | 'formal';

/** Времена глагола */
export type Tense = 'prasens' | 'perfekt' | 'prateritum' | 'futur1';

/** Типы упражнений (discriminated union ниже) */
export type ExerciseKind =
  | 'choice'
  | 'fill'
  | 'match'
  | 'transform'
  | 'translate'
  | 'conjugate'
  | 'decline'
  | 'spot-error'
  | 'order-words';

/** Категории тем */
export type TopicCategory =
  | 'phonetics'
  | 'articles-nouns'
  | 'pronouns'
  | 'verbs'
  | 'syntax'
  | 'cases'
  | 'prepositions'
  | 'adjectives'
  | 'adverbs'
  | 'tenses'
  | 'conjunctions'
  | 'negation'
  | 'infinitive'
  | 'everyday'
  | 'questions'
  | 'imperative'
  | 'lexicon';

/** Языки интерфейса */
export type LangCode = 'ru' | 'en' | 'de' | 'uk' | 'ar';

/** Локализованный текст */
export type Localized<T extends string = string> = Partial<Record<LangCode, T>> & { ru: T };

/** Сложность задания (1-5) */
export type Difficulty = 1 | 2 | 3 | 4 | 5;

/** Уникальный идентификатор (slug) */
export type Slug = string & { readonly __brand?: 'Slug' };

/** Метаданные контента */
export interface ContentMeta {
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  estimatedMinutes?: number;
  tags?: string[];
  keywords?: string[];
  icon?: string;
}
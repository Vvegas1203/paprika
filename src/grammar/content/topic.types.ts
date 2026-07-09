/**
 * Типы для теории грамматики: правила, примеры, ошибки, советы.
 */

import type { GermanCase, Gender, Localized, Person, Slug, Tense, TopicCategory, CefrLevel } from '../core/types';

/** Правило грамматики */
export interface GrammarRule {
  id: Slug;
  title: Localized;
  /** Основное объяснение */
  explanation: Localized;
  /** Расширенное объяснение (опционально) */
  deepDive?: Localized;
  /** Формула/паттерн (например: "Subj + V + Obj") */
  formula?: string;
  /** Мнемоника */
  mnemonic?: Localized;
  /** Теги для поиска */
  tags?: string[];
  /** Связанные падежи */
  cases?: GermanCase[];
  /** Связанные рода */
  genders?: Gender[];
  /** Связанные времена */
  tenses?: Tense[];
  /** Связанные лица */
  persons?: Person[];
}

/** Пример использования */
export interface Example {
  german: string;
  translation: Localized;
  /** Дословный перевод (помогает увидеть структуру) */
  literal?: Localized;
  /** Транскрипция IPA */
  ipa?: string;
  /** Ссылка на правило */
  ruleId?: Slug;
  /** Ключевой пример (особо важный) */
  key?: boolean;
  /** Аудио (URL или asset-id) */
  audio?: string;
}

/** Частая ошибка учащегося */
export interface CommonMistake {
  wrong: Localized;
  correct: Localized;
  explanation: Localized;
  /** Лайфхак, как не ошибаться */
  tip?: Localized;
  /** Частота ошибки 1-5 */
  frequency?: 1 | 2 | 3 | 4 | 5;
}

/** Совет/лайфхак */
export interface LearningTip {
  title: Localized;
  text: Localized;
  kind: 'mnemonic' | 'pattern' | 'exception' | 'shortcut' | 'rule-of-thumb' | 'culture';
}

/** Полное описание темы */
export interface GrammarTopic {
  id: Slug;
  level: CefrLevel;
  category: TopicCategory;
  title: Localized;
  description: Localized;
  /** Порядок изучения */
  order: number;
  /** Какие темы должны быть изучены ранее */
  prerequisites?: Slug[];
  /** Вступление в тему */
  introduction: Localized;
  /** Правила */
  rules: GrammarRule[];
  /** Примеры */
  examples: Example[];
  /** Частые ошибки */
  mistakes: CommonMistake[];
  /** Советы */
  tips?: LearningTip[];
  /** Шпаргалка */
  cheatsheet?: Record<string, string[]>;
  /** Метаданные */
  meta?: import('../core/types').ContentMeta;
}
/**
 * Фабрики (builders) для удобного создания тем и упражнений.
 * С ними добавление нового контента занимает минимум кода.
 *
 * @example
 * const topic = topicBuilder('a1-articles')
 *   .level('A1')
 *   .category('articles-nouns')
 *   .title({ ru: 'Артикли', en: 'Articles', de: 'Artikel' })
 *   .build();
 */

import type { GrammarTopic, GrammarRule, Example, CommonMistake, LearningTip } from './topic.types';
import type { CefrLevel, TopicCategory, Localized, Slug } from '../core/types';
import type { Task, TaskItem, TaskCollection } from './task.types';

/** Фабрика тем */
export class TopicBuilder {
  private topic: Partial<GrammarTopic> & { id: Slug; rules: GrammarRule[]; examples: Example[]; mistakes: CommonMistake[]; tips: LearningTip[] };

  constructor(id: Slug) {
    this.topic = {
      id,
      level: 'A1',
      rules: [],
      examples: [],
      mistakes: [],
      tips: [],
      order: 0,
      title: { ru: '' },
      description: { ru: '' },
      introduction: { ru: '' },
      category: 'lexicon',
    };
  }

  level(level: CefrLevel): this { this.topic.level = level; return this; }
  category(cat: TopicCategory): this { this.topic.category = cat; return this; }
  title(t: Localized): this { this.topic.title = t; return this; }
  description(d: Localized): this { this.topic.description = d; return this; }
  order(n: number): this { this.topic.order = n; return this; }
  intro(text: Localized): this { this.topic.introduction = text; return this; }
  int(text: Localized): this { this.topic.introduction = text; return this; }
  prereq(...ids: Slug[]): this { this.topic.prerequisites = ids; return this; }

  addRule(rule: GrammarRule): this { this.topic.rules.push(rule); return this; }
  addExample(ex: Example): this { this.topic.examples.push(ex); return this; }
  addMistake(m: CommonMistake): this { this.topic.mistakes.push(m); return this; }
  addTip(t: LearningTip): this { this.topic.tips!.push(t); return this; }

  cheatsheet(sheet: Record<string, string[]>): this { this.topic.cheatsheet = sheet; return this; }
  meta(m: GrammarTopic['meta']): this { this.topic.meta = m; return this; }

  build(): GrammarTopic {
    if (!this.topic.title?.ru) throw new Error(`Topic ${this.topic.id}: title is required`);
    if (this.topic.rules.length === 0) throw new Error(`Topic ${this.topic.id}: at least one rule required`);
    return this.topic as unknown as GrammarTopic;
  }
}

/** Быстрое создание правила */
export const rule = (id: Slug, title: Localized, explanation: Localized, extras: Partial<GrammarRule> = {}): GrammarRule => ({
  id, title, explanation, ...extras,
});

/** Быстрое создание примера */
export const example = (german: string, translation: Localized, extras: Partial<Example> = {}): Example => ({
  german, translation, ...extras,
});

/** Быстрое создание типичной ошибки */
export const mistake = (wrong: Localized, correct: Localized, explanation: Localized, extras: Partial<CommonMistake> = {}): CommonMistake => ({
  wrong, correct, explanation, ...extras,
});

// ================================================
// TASK FACTORIES (for practice tasks)
// ================================================

/** Быстрое создание задания (коллекции упражнений одного типа) */
export const task = (
  id: string,
  title: Localized,
  instruction: Localized,
  items: TaskItem[]
): Task => ({
  id,
  title,
  instruction,
  items,
});

/** Builder для коллекций практических заданий (топиков с тасками) */
export class TaskCollectionBuilder {
  private data: Partial<TaskCollection> & { id: string; tasks: Task[] };

  constructor(id: string) {
    this.data = {
      id,
      level: 'A1',
      category: 'lexicon',
      order: 0,
      title: { ru: '' },
      tasks: [],
    };
  }

  level(l: string): this { this.data.level = l; return this; }
  category(c: string): this { this.data.category = c; return this; }
  order(n: number): this { this.data.order = n; return this; }
  title(t: Localized): this { this.data.title = t; return this; }
  description(d: Localized): this { this.data.description = d; return this; }

  addTask(t: Task): this {
    this.data.tasks!.push(t);
    return this;
  }

  build(): TaskCollection {
    if (!this.data.title?.ru) throw new Error(`TaskCollection ${this.data.id}: title is required`);
    return this.data as TaskCollection;
  }
}

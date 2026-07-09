/**
 * Types for practice tasks (from gt/ files).
 * These are simpler exercise formats used after theory lessons.
 */

import type { Localized } from '../core/types';

export type TaskKind =
  | 'choice'         // Multiple choice with options
  | 'fill'           // Fill in the blank
  | 'word-order'     // Arrange words into sentence
  | 'parts-order'    // Arrange sentence parts
  | 'comparison'     // Degrees of comparison (base, comp, sup)
  | 'transform'      // Transform sentence/verb
  | 'scenario'       // Choose correct response

export interface TaskItemBase {
  question?: string;
}

export interface ChoiceTaskItem extends TaskItemBase {
  options: string[];
  correct: string;
  explanation?: Localized;
  hint?: Localized;
  context?: Localized;
}

export interface FillTaskItem extends TaskItemBase {
  answer: string;
  hint?: Localized;
}

export interface WordOrderTaskItem extends TaskItemBase {
  words: string[];
  correct: string;
}

export interface PartsOrderTaskItem extends TaskItemBase {
  parts: string[];
  correct: string;
}

export interface ComparisonTaskItem extends TaskItemBase {
  base: string;
  comp: string;
  sup: string;
}

export interface TransformTaskItem extends TaskItemBase {
  statement: string;
  type: string;
  answer: string;
}

export interface ScenarioTaskItem extends TaskItemBase {
  scenario: string;
  options: string[];
  correct: string;
}

export type TaskItem =
  | ChoiceTaskItem
  | FillTaskItem
  | WordOrderTaskItem
  | PartsOrderTaskItem
  | ComparisonTaskItem
  | TransformTaskItem
  | ScenarioTaskItem;

export interface Task {
  id: string;
  title: Localized;
  instruction: Localized;
  items: TaskItem[];
}

export interface TaskCollection {
  id: string;
  level: string;
  category: string;
  order: number;
  title: Localized;
  description?: Localized;
  tasks: Task[];
}
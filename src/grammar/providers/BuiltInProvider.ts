// ============================================
// src/grammar/providers/BuiltInProvider.ts
// ============================================
import type { ISyncContentProvider } from './IContentProvider';
import type { GrammarTopic } from '../content/topic.types';
import type { Exercise } from '../content/exercise.types';
import type { TaskCollection } from '../content/task.types';
import { A1_TOPICS } from '../content/a1';
import { A1_EXERCISES } from '../content/a1/exercises';
import { A1_TASK_COLLECTIONS } from '../content/a1/tasks';

/**
 * Встроенный поставщик — содержит весь статический контент модуля.
 * Всегда загружается первым в GrammarEngine.
 */
export class BuiltInProvider implements ISyncContentProvider {
  readonly id = 'built-in';
  readonly name = 'Built-in A1 Content';
  readonly priority = 0;

  private readonly topics: GrammarTopic[] = A1_TOPICS;
  private readonly exercises: Exercise[] = A1_EXERCISES;
  private readonly taskCollections: TaskCollection[] = A1_TASK_COLLECTIONS;

  loadTopics(): GrammarTopic[] {
    return [...this.topics];
  }

  loadExercises(): Exercise[] {
    return [...this.exercises];
  }

  loadTaskCollections(): TaskCollection[] {
    return [...this.taskCollections];
  }

  loadTopicById(id: string): GrammarTopic | null {
    return this.topics.find((t) => t.id === id) ?? null;
  }
}

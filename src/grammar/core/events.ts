// src/grammar/core/events.ts

export type EventHandler<T = unknown> = (payload: T) => void;

export interface GrammarEvents {
  'engine:initialized': { topicsCount: number; exercisesCount: number };
  'progress:updated': { topicId: string; progress: TopicProgress };
  'exercise:answered': {
    exerciseId: string;
    topicId: string;
    isCorrect: boolean;
    userAnswer: unknown;
  };
  'topic:completed': { topicId: string; score: number };
  'error': { code: string; message: string };
}

export interface TopicProgress {
  topicId: string;
  completed: boolean;
  attempts: number;
  correctAttempts: number;
  score: number;
  masteredRules: string[];
  weakRules: string[];
  lastStudiedAt?: number;
  timeSpentMs: number;
}

type GrammarEventKey = keyof GrammarEvents;

export class TypedEventEmitter {
  private handlers = new Map<GrammarEventKey, Set<EventHandler<any>>>();

  on<K extends GrammarEventKey>(event: K, handler: EventHandler<GrammarEvents[K]>): () => void {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(handler);
    return () => this.off(event, handler);
  }

  off<K extends GrammarEventKey>(event: K, handler: EventHandler<GrammarEvents[K]>): void {
    this.handlers.get(event)?.delete(handler);
  }

  emit<K extends GrammarEventKey>(event: K, payload: GrammarEvents[K]): void {
    this.handlers.get(event)?.forEach((h) => {
      try {
        h(payload);
      } catch (err) {
        console.error(`[GrammarEvents] handler failed for "${String(event)}":`, err);
      }
    });
  }

  clear(): void {
    this.handlers.clear();
  }
}
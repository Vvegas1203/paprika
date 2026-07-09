import type { AttemptResult } from '../content/exercise.types';
import type { GrammarTopic } from '../content/topic.types';
import type { Slug } from '../core/types';

/** Прогресс по теме */
export interface TopicProgress {
  topicId: Slug;
  completed: boolean;
  attempts: number;
  correctAttempts: number;
  score: number; // 0-100
  masteredRules: string[];
  weakRules: string[];
  lastStudiedAt?: number;
  timeSpentMs: number;
}

/** Общий прогресс */
export interface OverallProgress {
  level?: string;
  topicsTotal: number;
  topicsCompleted: number;
  topicsStarted: number;
  averageScore: number;
  totalAttempts: number;
  totalCorrect: number;
  timeSpentMs: number;
}

/**
 * Адаптер для persistence.
 * Позволяет легко подключить любое хранилище:
 * localStorage, IndexedDB, AsyncStorage, API, SQLite.
 */
export interface ProgressStorage {
  load(): Promise<Map<string, TopicProgress>> | Map<string, TopicProgress>;
  save(data: Map<string, TopicProgress>): Promise<void> | void;
  clear(): Promise<void> | void;
}

/** In-memory реализация (по умолчанию) */
export class InMemoryStorage implements ProgressStorage {
  private data = new Map<string, TopicProgress>();
  load(): Map<string, TopicProgress> { return new Map(this.data); }
  save(data: Map<string, TopicProgress>): void { this.data = new Map(data); }
  clear(): void { this.data.clear(); }
}

export interface ProgressTrackerDeps {
  getTopics: () => GrammarTopic[];
  getExercisesCount: (topicId: Slug) => number;
  storage?: ProgressStorage;
  /** Минимальный score для "completed" */
  completionThreshold?: number;
}

export class ProgressTracker {
  private data = new Map<string, TopicProgress>();
  private readonly storage: ProgressStorage;
  private readonly completionThreshold: number;

  constructor(private readonly deps: ProgressTrackerDeps) {
    this.storage = deps.storage ?? new InMemoryStorage();
    this.completionThreshold = deps.completionThreshold ?? 70;
  }

  async init(): Promise<void> {
    const loaded = await this.storage.load();
    this.data = loaded;
  }

  /** Зарегистрировать попытку ответа */
  async register(result: AttemptResult): Promise<TopicProgress> {
    const current = this.getOrCreate(result.topicId);
    current.attempts += 1;
    if (result.correct) current.correctAttempts += 1;
    current.lastStudiedAt = Date.now();
    current.timeSpentMs += result.spentMs ?? 0;

    current.score = current.attempts > 0
      ? Math.round((current.correctAttempts / current.attempts) * 100)
      : 0;

    current.completed = current.score >= this.completionThreshold
      && current.attempts >= Math.max(3, this.deps.getExercisesCount(result.topicId) / 2);

    await this.persist();
    return { ...current };
  }

  getTopicProgress(topicId: Slug): TopicProgress {
    return this.getOrCreate(topicId);
  }

  getOverallProgress(level?: string): OverallProgress {
    const topics = level
      ? this.deps.getTopics().filter((t) => t.level === level)
      : this.deps.getTopics();

    let totalScore = 0, scored = 0, completed = 0, started = 0;
    let totalAttempts = 0, totalCorrect = 0, totalTime = 0;

    for (const t of topics) {
      const p = this.getTopicProgress(t.id);
      if (p.attempts > 0) { totalScore += p.score; scored += 1; started += 1; }
      if (p.completed) completed += 1;
      totalAttempts += p.attempts;
      totalCorrect += p.correctAttempts;
      totalTime += p.timeSpentMs;
    }

    return {
      level,
      topicsTotal: topics.length,
      topicsCompleted: completed,
      topicsStarted: started,
      averageScore: scored > 0 ? Math.round(totalScore / scored) : 0,
      totalAttempts,
      totalCorrect,
      timeSpentMs: totalTime,
    };
  }

  /** Следующая тема для изучения (с учётом prerequisites) */
  getNextTopic(): GrammarTopic | null {
    const topics = [...this.deps.getTopics()].sort((a, b) => a.order - b.order);
    for (const t of topics) {
      const p = this.getTopicProgress(t.id);
      if (p.completed) continue;
      const prereqsDone = (t.prerequisites ?? []).every((pid) => {
        const pp = this.getTopicProgress(pid);
        return pp.completed;
      });
      if (prereqsDone) return t;
    }
    return topics[0] ?? null;
  }

  async reset(topicId?: Slug): Promise<void> {
    if (topicId) this.data.delete(topicId);
    else this.data.clear();
    await this.persist();
  }

  private getOrCreate(topicId: Slug): TopicProgress {
    if (!this.data.has(topicId)) {
      this.data.set(topicId, {
        topicId,
        completed: false,
        attempts: 0,
        correctAttempts: 0,
        score: 0,
        masteredRules: [],
        weakRules: [],
        timeSpentMs: 0,
      });
    }
    return this.data.get(topicId)!;
  }

  private async persist(): Promise<void> {
    await this.storage.save(this.data);
  }
}
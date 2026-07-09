// src/grammar/services/GrammarEngine.ts

import type { IContentProvider } from '../providers/IContentProvider';
import type { TopicFilter } from '../providers/IContentProvider';
import type { GrammarTopic } from '../content/topic.types';
import type { Exercise, AttemptResult } from '../content/exercise.types';
import type { CefrLevel, Slug } from '../core/types';
import type { TopicProgress, OverallProgress, ProgressStorage } from './ProgressTracker';
import { BuiltInProvider } from '../providers/BuiltInProvider';
import { ProgressTracker } from './ProgressTracker';
import { AnswerChecker } from './AnswerChecker';
import { TypedEventEmitter } from '../core/events';
import {
  NotInitializedError, TopicNotFoundError,
  ExerciseNotFoundError,
} from '../core/errors';

export interface GrammarEngineOptions {
  providers?: IContentProvider[];
  progressStorage?: ProgressStorage;
  autoInit?: boolean;
  completionThreshold?: number;
}

export class GrammarEngine {
  readonly events = new TypedEventEmitter();

  private readonly providers: IContentProvider[] = [];
  private topics: GrammarTopic[] = [];
  private exercises: Exercise[] = [];
  private readonly topicIndex = new Map<Slug, GrammarTopic>();
  private readonly exerciseIndex = new Map<Slug, Exercise>();
  private readonly exercisesByTopic = new Map<Slug, Exercise[]>();

  private readonly tracker: ProgressTracker;
  private readonly checker = new AnswerChecker();
  private initialized = false;

  constructor(options: GrammarEngineOptions = {}) {
    this.providers.push(new BuiltInProvider(), ...(options.providers ?? []));
    this.tracker = new ProgressTracker({
      getTopics: () => this.topics,
      getExercisesCount: (id) => this.exercisesByTopic.get(id)?.length ?? 0,
      storage: options.progressStorage,
      completionThreshold: options.completionThreshold,
    });
    if (options.autoInit) void this.init();
  }

  async init(): Promise<void> {
    if (this.initialized) return;

    const allTopics: GrammarTopic[] = [];
    const allExercises: Exercise[] = [];

    for (const p of this.providers) {
      try {
        const topics = await p.loadTopics();
        const exercises = await p.loadExercises();
        allTopics.push(...topics);
        allExercises.push(...exercises);
      } catch (err) {
        console.error(`[GrammarEngine] Provider "${p.id}" failed:`, err);
        this.events.emit('error', {
          code: 'PROVIDER_FAILED',
          message: `Provider "${p.id}": ${String(err)}`,
        });
      }
    }

    for (const t of allTopics) {
      if (this.topicIndex.has(t.id)) {
        this.events.emit('error', { code: 'DUPLICATE_TOPIC', message: t.id });
        continue;
      }
      this.topics.push(t);
      this.topicIndex.set(t.id, t);
    }
    for (const e of allExercises) {
      if (this.exerciseIndex.has(e.id)) continue;
      this.exercises.push(e);
      this.exerciseIndex.set(e.id, e);
      if (!this.exercisesByTopic.has(e.topicId)) this.exercisesByTopic.set(e.topicId, []);
      this.exercisesByTopic.get(e.topicId)!.push(e);
    }

    this.topics.sort((a, b) => a.order - b.order);
    await this.tracker.init();
    this.initialized = true;

    this.events.emit('engine:initialized', {
      topicsCount: this.topics.length,
      exercisesCount: this.exercises.length,
    });
  }

  getTopics(filter: TopicFilter = {}): GrammarTopic[] {
    this.ensureInit();
    let result = this.topics;
    if (filter.level) result = result.filter((t) => t.level === filter.level);
    if (filter.category) result = result.filter((t) => t.category === filter.category);
    if (filter.query) {
      const q = filter.query.toLowerCase();
      result = result.filter((t) =>
        [t.title.ru, t.description?.ru, t.id, t.category].some((s) => String(s).toLowerCase().includes(q))
      );
    }
    if (filter.limit) result = result.slice(0, filter.limit);
    return [...result];
  }

  getTopicById(id: Slug): GrammarTopic {
    this.ensureInit();
    const t = this.topicIndex.get(id);
    if (!t) throw new TopicNotFoundError(id);
    return t;
  }

  getTopicsByLevel(level: CefrLevel): GrammarTopic[] {
    return this.getTopics({ level });
  }

  getTopicsByCategory(category: string): GrammarTopic[] {
    return this.getTopics({ category });
  }

  searchTopics(query: string): GrammarTopic[] {
    return this.getTopics({ query });
  }

  getExercises(topicId: Slug): Exercise[] {
    this.ensureInit();
    if (!this.topicIndex.has(topicId)) throw new TopicNotFoundError(topicId);
    return [...(this.exercisesByTopic.get(topicId) ?? [])];
  }

  getExerciseById(id: Slug): Exercise {
    this.ensureInit();
    const e = this.exerciseIndex.get(id);
    if (!e) throw new ExerciseNotFoundError(id);
    return e;
  }

  checkAnswer(exercise: Exercise, userAnswer: unknown): ReturnType<typeof this.checker.check> {
    return this.checker.check(exercise, userAnswer);
  }

  async registerAttempt(result: AttemptResult): Promise<TopicProgress> {
    this.ensureInit();
    const progress = await this.tracker.register(result);

    this.events.emit('exercise:answered', {
      exerciseId: result.exerciseId,
      topicId: result.topicId,
      isCorrect: result.correct,
      userAnswer: result.userAnswer,
    });

    this.events.emit('progress:updated', { topicId: result.topicId, progress });

    if (progress.completed) {
      this.events.emit('topic:completed', { topicId: result.topicId, score: progress.score });
    }

    return progress;
  }

  getTopicProgress(topicId: Slug): TopicProgress {
    this.ensureInit();
    return this.tracker.getTopicProgress(topicId);
  }

  getOverallProgress(level?: CefrLevel): OverallProgress {
    this.ensureInit();
    return this.tracker.getOverallProgress(level);
  }

  getNextTopic(): GrammarTopic | null {
    this.ensureInit();
    return this.tracker.getNextTopic();
  }

  async resetProgress(topicId?: Slug): Promise<void> {
    this.ensureInit();
    await this.tracker.reset(topicId);
  }

  addProvider(provider: IContentProvider): void {
    this.providers.push(provider);
    this.initialized = false;
  }

  dumpAll(): { topics: GrammarTopic[]; exercises: Exercise[] } {
    this.ensureInit();
    return { topics: [...this.topics], exercises: [...this.exercises] };
  }

  private ensureInit(): void {
    if (!this.initialized) throw new NotInitializedError();
  }
}
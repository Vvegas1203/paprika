import type { GrammarTopic } from '../content/topic.types';
import type { Exercise } from '../content/exercise.types';
import type { CefrLevel, Slug } from '../core/types';

/**
 * Интерфейс поставщика контента.
 *
 * Архитектурный краеугольный камень: модуль не зависит от того,
 * откуда приходит контент. Можно подключить:
 * - BuiltInProvider (статический)
 * - RemoteProvider (из API)
 * - JsonFileProvider (из JSON)
 * - CustomProvider (из БД)
 */
export interface IContentProvider {
  readonly id: string;
  readonly name: string;
  readonly priority?: number;

  loadTopics(): Promise<GrammarTopic[]> | GrammarTopic[];
  loadExercises(): Promise<Exercise[]> | Exercise[];

  /** Опционально: загрузить конкретную тему (для ленивой загрузки) */
  loadTopicById?(id: Slug): Promise<GrammarTopic | null> | GrammarTopic | null;
}

/** Синхронная версия для встроенного контента */
export interface ISyncContentProvider extends IContentProvider {
  loadTopics(): GrammarTopic[];
  loadExercises(): Exercise[];
}

/** Фильтр тем */
export interface TopicFilter {
  level?: CefrLevel;
  category?: string;
  query?: string;
  limit?: number;
}
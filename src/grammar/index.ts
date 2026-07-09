/**
 * 📘 Публичный API модуля немецкой грамматики.
 *
 * Полностью типизированный, production-ready модуль для изучения
 * грамматики немецкого языка уровня A1.
 *
 * @packageDocumentation
 *
 * @example Простое использование
 * ```ts
 * import { GrammarEngine } from '@your-org/german-grammar';
 *
 * const engine = new GrammarEngine();
 * await engine.init();
 *
 * const a1Topics = engine.getTopicsByLevel('A1');
 * const topic = engine.getTopicById('a1-articles');
 * const exercises = engine.getExercises('a1-articles');
 *
 * const result = engine.checkAnswer(exercises[0], 'den');
 * console.log(result.correct); // true/false
 * ```
 *
 * @example С отслеживанием прогресса
 * ```ts
 * engine.events.on('topic:completed', ({ topicId, score }) => {
 *   console.log(`Тема ${topicId} пройдена на ${score}%`);
 * });
 *
 * await engine.registerAttempt({
 *   exerciseId: 'ex-1',
 *   topicId: 'a1-articles',
 *   correct: true,
 *   userAnswer: 'den',
 *   expectedAnswer: 'den',
 *   attemptNo: 1,
 *   timestamp: Date.now(),
 * });
 * ```
 *
 * @example Custom persistence (localStorage)
 * ```ts
 * class LocalStorageAdapter implements ProgressStorage {
 *   load() {
 *     const raw = localStorage.getItem('grammar-progress');
 *     return raw ? new Map(JSON.parse(raw)) : new Map();
 *   }
 *   save(data) {
 *     localStorage.setItem('grammar-progress', JSON.stringify([...data]));
 *   }
 *   clear() { localStorage.removeItem('grammar-progress'); }
 * }
 *
 * const engine = new GrammarEngine({ progressStorage: new LocalStorageAdapter() });
 * ```
 */

// Главный движок
export { GrammarEngine, type GrammarEngineOptions } from './services/GrammarEngine';

// Сервисы
export { ProgressTracker, InMemoryStorage, type ProgressStorage, type TopicProgress, type OverallProgress } from './services/ProgressTracker';
export { AnswerChecker, type CheckResult } from './services/AnswerChecker';

// Провайдеры
export type { IContentProvider, ISyncContentProvider, TopicFilter } from './providers/IContentProvider';
export { BuiltInProvider } from './providers/BuiltInProvider';

// Events
export { TypedEventEmitter, type GrammarEvents, type EventHandler } from './core/events';

// Ошибки
export {
  GrammarModuleError, NotInitializedError, TopicNotFoundError,
  ExerciseNotFoundError, DuplicateIdError, ValidationError,
} from './core/errors';

// Builders (для расширения контента)
export { TopicBuilder, rule, example, mistake, task, TaskCollectionBuilder } from './content/builders';

// Типы
export type * from './core/types';
export type * from './content/topic.types';
export type * from './content/exercise.types';
export type * from './content/task.types';

// Контент (для случаев прямого доступа)
export { A1_TOPICS } from './content/a1';
export { A1_EXERCISES } from './content/a1/exercises';
export { A1_TASK_COLLECTIONS } from './content/a1/tasks';
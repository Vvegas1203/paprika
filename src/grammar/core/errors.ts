/**
 * Кастомные ошибки модуля. Позволяют точно идентифицировать проблемы.
 */

export class GrammarModuleError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'GrammarModuleError';
  }
}

export class NotInitializedError extends GrammarModuleError {
  constructor() {
    super('GrammarEngine не инициализирован. Вызовите engine.init() перед использованием.', 'NOT_INITIALIZED');
  }
}

export class TopicNotFoundError extends GrammarModuleError {
  constructor(id: string) {
    super(`Тема с id "${id}" не найдена.`, 'TOPIC_NOT_FOUND');
  }
}

export class ExerciseNotFoundError extends GrammarModuleError {
  constructor(id: string) {
    super(`Упражнение с id "${id}" не найдено.`, 'EXERCISE_NOT_FOUND');
  }
}

export class DuplicateIdError extends GrammarModuleError {
  constructor(id: string, kind: 'topic' | 'exercise') {
    super(`Дубликат ${kind} с id "${id}".`, 'DUPLICATE_ID');
  }
}

export class ValidationError extends GrammarModuleError {
  constructor(message: string, public readonly issues: string[]) {
    super(message, 'VALIDATION_FAILED');
  }
}
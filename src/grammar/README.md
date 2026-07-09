# Grammar Module Documentation

## Overview

A modern, type-safe German grammar learning module (A1 level) with extensible architecture.

## Architecture

```
src/grammar/
├── index.ts              # Public API exports
├── core/
│   ├── types.ts          # Core types (CefrLevel, GermanCase, Gender, etc.)
│   ├── errors.ts         # Custom error classes
│   └── events.ts         # Typed event emitter
├── content/
│   ├── topic.types.ts    # GrammarTopic, GrammarRule, Example, etc.
│   ├── exercise.types.ts # Exercise types (choice, fill, conjugate, etc.)
│   ├── builders.ts       # TopicBuilder, exercise factory
│   └── a1/               # A1 level content
│       ├── index.ts      # A1 topics list
│       ├── exercises.ts  # A1 exercises
│       └── *.ts          # Individual topic files
├── providers/
│   ├── IContentProvider.ts # Content provider interface
│   └── BuiltInProvider.ts  # Default static content provider
└── services/
    ├── GrammarEngine.ts    # Main engine class
    ├── AnswerChecker.ts    # Answer checking logic
    └── ProgressTracker.ts  # Progress tracking & persistence
```

## Quick Start

```ts
import { GrammarEngine } from './grammar';

const engine = new GrammarEngine();
await engine.init();

// Get all A1 topics
const topics = engine.getTopics({ level: 'A1' });

// Get exercises for a topic
const exercises = engine.getExercises('a1-articles');

// Check an answer
const result = engine.checkAnswer(exercises[0], 'den');
console.log(result.correct); // true/false
```

## Adding New Content

### Adding a new topic:

1. Create `src/grammar/content/a1/24-new-topic.ts`:
```ts
import { TopicBuilder, rule, example, mistake } from '../builders';

export const NEW_TOPIC = new TopicBuilder('a1-new-topic')
  .level('A1').category('syntax').order(24)
  .title({ ru: 'Новая тема', en: 'New Topic' })
  .description({ ru: 'Описание', en: 'Description' })
  .intro({ ru: 'Вводный текст', en: 'Intro text' })
  .addRule(rule('rule-id', { ru: 'Заголовок' }, { ru: 'Объяснение' }))
  .addExample(example('Deutsch', { ru: 'немецкий' }))
  .addMistake(mistake('falsch', 'richtig', { ru: 'Почему' }))
  .meta({ estimatedMinutes: 30 })
  .build();
```

2. Add export to `src/grammar/content/a1/index.ts`:
```ts
import { NEW_TOPIC } from './24-new-topic';
// ... other imports
export const A1_TOPICS: GrammarTopic[] = [
  // ... existing topics
  NEW_TOPIC,
].sort((a, b) => a.order - b.order);
```

### Adding exercises:

Add to `src/grammar/content/a1/exercises.ts`:
```ts
exercise.choice({
  id: 'new-01' as Slug,
  topicId: 'a1-new-topic' as Slug,
  difficulty: 1,
  question: { ru: 'Вопрос?' },
  options: ['a', 'b', 'c'],
  correct: 0,
}),
```

## Event System

```ts
engine.events.on('topic:completed', ({ topicId, score }) => {
  console.log(`Topic ${topicId} completed with ${score}%`);
});

engine.events.on('exercise:answered', ({ exerciseId, isCorrect }) => {
  console.log(`Exercise ${exerciseId}: ${isCorrect ? '✓' : '✗'}`);
});
```

## Persistence

Extend `ProgressStorage` for custom persistence:

```ts
class LocalStorageAdapter implements ProgressStorage {
  load() {
    const raw = localStorage.getItem('grammar-progress');
    return raw ? new Map(JSON.parse(raw)) : new Map();
  }
  save(data: Map<string, TopicProgress>) {
    localStorage.setItem('grammar-progress', JSON.stringify([...data]));
  }
  clear() {
    localStorage.removeItem('grammar-progress');
  }
}

const engine = new GrammarEngine({ progressStorage: new LocalStorageAdapter() });
```

## Content Structure

Each topic contains:
- **Rules**: Grammar rules with explanations, formulas, mnemonics
- **Examples**: German sentences with translations
- **Mistakes**: Common errors with corrections and tips
- **Tips**: Learning hints (mnemonic, pattern, shortcut)
- **Cheatsheet**: Quick reference data

## Exercise Types

- `choice` - Multiple choice
- `fill` - Fill in the blank
- `match` - Match pairs
- `transform` - Transform text
- `translate` - Translation
- `conjugate` - Verb conjugation
- `decline` - Noun declension
- `spot-error` - Find the error
- `order-words` - Arrange words in order
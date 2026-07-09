# Руководство по добавлению контента

## Содержание
1. [Добавление теории грамматики](#1-добавление-теории-грамматики)
2. [Добавление практических заданий](#2-добавление-практических-заданий)
3. [Добавление нового уровня (A2, B1...)](#3-добавление-нового-уровня-a2-b1)
4. [Типы заданий и их поля](#4-типы-заданий-и-их-поля)
5. [Проверка результата](#5-проверка-результата)

---

## 1. Добавление теории грамматики

### 1.1. Создать файл темы

Создайте файл в `src/grammar/content/a1/tasks/` (для заданий A1) или создайте новую папку уровней. 

**Пример: `src/grammar/content/a2/01-past-tense.ts`**

```typescript
import { TopicBuilder, rule, example, mistake } from '../builders';

export const PAST_TENSE = new TopicBuilder('a2-past-tense')
  .level('A2')
  .category('tenses')
  .order(1)
  .title({
    ru: 'Прошедшее время',
    en: 'Past Tense',
    de: 'Vergangenheit',
    ar: 'الماضي'
  })
  .description({
    ru: 'Präteritum и Perfekt для модальных глаголов.',
    en: 'Präteritum and Perfekt for modal verbs.',
    ar: 'الماضي التام والماضي البسيط للأفعال المساعدة.'
  })
  .intro({
    ru: 'В немецком два основных прошедших времени...',
    en: 'In German there are two main past tenses...',
    ar: 'في الألمانية هناك زمنان ماضيان رئيسيان...'
  })
  .addRule(rule('prateritum-modals',
    { ru: 'Präteritum модальных глаголов', en: 'Präteritum of modal verbs', ar: 'الماضي البسيط للأفعال المساعدة' },
    { ru: 'Модальные глаголы в Präteritum: können → konnte, müssen → musste, wollen → wollte.',
      en: 'Modal verbs in Präteritum: können → konnte...',
      ar: 'الأفعال المساعدة في الماضي البسيط...' },
    { formula: 'können → konnte, müssen → musste, dürfen → durfte' }
  ))
  .addExample(example(
    'Ich konnte gut Deutsch sprechen.',
    { ru: 'Я мог хорошо говорить по-немецки.', en: 'I could speak German well.', ar: 'كنت أستطيع التحدث بالألمانية جيداً.' }
  ))
  .addMistake(mistake(
    { ru: 'Ich habe gekonnt (вместо konnte)', en: 'Ich habe gekonnt...', ar: 'خطأ شائع' },
    { ru: 'В Präteritum: "Ich konnte".', en: 'In Präteritum: "Ich konnte".', ar: 'التصحيح' },
    { ru: 'Модальные глаголы редко используются в Perfekt.', en: 'Explanation...', ar: 'الشرح' }
  ))
  .build();
```

### 1.2. Обязательные поля темы

| Поле | Метод | Тип | Обяз. | Описание |
|------|-------|-----|-------|----------|
| `id` | constructor | Slug | ✅ | Уникальный идентификатор (например `'a2-past-tense'`) |
| `level` | `.level()` | CefrLevel | ✅ | 'A1' \| 'A2' \| 'B1' \| 'B2' \| 'C1' \| 'C2' |
| `category` | `.category()` | TopicCategory | ✅ | Категория темы |
| `order` | `.order()` | number | ✅ | Позиция в списке (сортировка) |
| `title` | `.title()` | Localized | ✅ | Название (минимум `{ ru: '...' }`) |
| `introduction` | `.intro()` | Localized | ✅ | Вступление к теме |
| `rules` | `.addRule()` | GrammarRule[] | ✅ | Минимум **1 правило** |

### 1.3. Необязательные поля

| Поле | Метод | Описание |
|------|-------|----------|
| `description` | `.description()` | Краткое описание для списка тем |
| `examples` | `.addExample()` | Примеры использования |
| `mistakes` | `.addMistake()` | Типичные ошибки |
| `tips` | `.addTip()` | Советы и лайфхаки |
| `cheatsheet` | `.cheatsheet()` | Шпаргалка (ключ → массив значений) |
| `prerequisites` | `.prereq()` | ID тем, которые нужно знать перед этой |
| `meta` | `.meta()` | Метаданные (автор, иконка, теги) |

---

## 2. Добавление практических заданий

### 2.1. Создать файл заданий

Создайте файл в `src/grammar/content/a1/tasks/` (или `a2/tasks/` для других уровней).

**Пример: `src/grammar/content/a2/tasks/01-past-tense.ts`**

```typescript
import { TaskCollectionBuilder, task } from '../../builders';

export const PAST_TENSE_TASKS = new TaskCollectionBuilder('a2-past-tense-tasks')
  .level('A2')
  .category('tenses')
  .order(1)
  .title({
    ru: 'Задания: Прошедшее время',
    en: 'Tasks: Past Tense',
    ar: 'تمارين: الماضي'
  })
  .description({
    ru: 'Практика Präteritum модальных глаголов.',
    en: 'Practice Präteritum of modal verbs.',
    ar: 'ممارسة الماضي البسيط للأفعال المساعدة.'
  })
  // Каждый addTask — это один блок заданий одного типа
  .addTask(task('prateritum-fill',
    { ru: 'Вставьте Präteritum', en: 'Fill in Präteritum', ar: 'أكمل الماضي البسيط' },
    { ru: 'Поставьте модальный глагол в Präteritum.', en: 'Put the modal verb in Präteritum.', ar: 'ضع الفعل المساعد في الماضي البسيط.' },
    [
      { question: 'Ich ___ (können) gut schwimmen.', answer: 'konnte' },
      { question: 'Er ___ (müssen) viel arbeiten.', answer: 'musste' },
    ]
  ))
  .addTask(task('modal-choice',
    { ru: 'Выберите правильную форму', en: 'Choose the correct form', ar: 'اختر الشكل الصحيح' },
    { ru: 'Какая форма Präteritum правильная?', en: 'Which Präteritum form is correct?', ar: 'أي شكل من الماضي البسيط صحيح؟' },
    [
      { question: 'können (ich)', options: ['konnte', 'konntest', 'konnten'], correct: 'konnte' },
      { question: 'müssen (er)', options: ['musste', 'musstest', 'mussten'], correct: 'musste' },
    ]
  ))
  .build();
```

### 2.2. Обязательные поля заданий

| Поле | Метод | Описание |
|------|-------|----------|
| `id` | constructor | Уникальный ID (например `'a2-past-tense-tasks'`) |
| `level` | `.level()` | Уровень |
| `order` | `.order()` | Порядок |
| `title` | `.title()` | Название коллекции |
| `tasks` | `.addTask()` | Массив заданий (минимум 1) |

### 2.3. Каждый task (задание) состоит из:

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | string | Уникальный ID задания |
| `title` | Localized | Название задания |
| `instruction` | Localized | Инструкция для пользователя |
| `items` | TaskItem[] | Массив упражнений (минимум 1) |

---

## 3. Типы заданий (TaskItem) и их поля

### 3.1. choice — выбор варианта

Подходит для: выбор артикля, выбор окончания, выбор модального глагола.

```typescript
{
  question: '___ Mann',           // вопрос
  options: ['der', 'die', 'das'],  // варианты
  correct: 'der',                  // правильный ответ
  explanation?: { ru: '...' },     // объяснение (опционально)
  hint?: { ru: '...' },            // подсказка (опционально)
  context?: { ru: '...' },        // контекст (опционально)
}
```

### 3.2. fill — заполнение пропуска

Подходит для: спряжение, вставка окончания, вставка слова.

```typescript
{
  question: 'Ich mach__.',     // вопрос с пропуском
  answer: 'e',                  // правильный ответ
  hint?: { ru: '...' },        // подсказка (опционально)
}
```

### 3.3. word-order — сборка предложения из слов

Подходит для: порядок слов, V2-правило, союзы.

```typescript
{
  words: ['ich', 'heute', 'lerne', 'Deutsch'],  // массив слов
  correct: 'Heute lerne ich Deutsch.',           // правильное предложение
  question?: '',                                  // вопрос (не обязателен)
}
```

### 3.4. parts-order — сборка из частей

Подходит для: TeKaMoLo, порядок обстоятельств.

```typescript
{
  parts: ['mit dem Bus', 'morgen', 'nach Berlin'],  // части предложения
  correct: 'morgen mit dem Bus nach Berlin',          // правильный порядок
  question?: '',
}
```

### 3.5. comparison — степени сравнения

Подходит для: прилагательные, наречия.

```typescript
{
  base: 'schnell',      // положительная степень
  comp: 'schneller',     // сравнительная
  sup: 'am schnellsten', // превосходная
  question?: '',
}
```

### 3.6. transform — трансформация

Подходит для: преобразование предложения, изменение времени.

```typescript
{
  statement: 'Du bist müde.',   // исходное утверждение
  type: 'Yes/No',               // тип трансформации
  answer: 'Bist du müde?',      // правильный ответ
  question?: '',
}
```

### 3.7. scenario — ситуация

Подходит для: бытовые диалоги, выбор реакции.

```typescript
{
  scenario: 'В ресторане вы хотите счет.',           // описание ситуации
  options: ['Die Rechnung, bitte.', 'Ich habe Hunger.'], // варианты ответа
  correct: 'Die Rechnung, bitte.',                    // правильный ответ
  question?: '',
}
```

---

## 4. Регистрация в index.ts

### 4.1. Теория

Добавьте экспорт в `src/grammar/content/a2/index.ts` (создайте, если нет):

```typescript
import type { GrammarTopic } from '../topic.types';
import { PAST_TENSE } from './01-past-tense';

export const A2_TOPICS: GrammarTopic[] = [
  PAST_TENSE,
  // другие темы...
].sort((a, b) => a.order - b.order);
```

### 4.2. Задания

Добавьте экспорт в `src/grammar/content/a2/tasks/index.ts`:

```typescript
import type { TaskCollection } from '../../task.types';
import { PAST_TENSE_TASKS } from './01-past-tense';

export const A2_TASK_COLLECTIONS: TaskCollection[] = [
  PAST_TENSE_TASKS,
  // другие коллекции...
].sort((a, b) => a.order - b.order);
```

### 4.3. Подключить к BuiltInProvider

Отредактируйте `src/grammar/providers/BuiltInProvider.ts`:

```typescript
import { A2_TOPICS } from '../content/a2';
import { A2_TASK_COLLECTIONS } from '../content/a2/tasks';

// В классе:
private readonly topics: GrammarTopic[] = [
  ...A1_TOPICS,
  ...A2_TOPICS,  // добавить
];
private readonly taskCollections: TaskCollection[] = [
  ...A1_TASK_COLLECTIONS,
  ...A2_TASK_COLLECTIONS,  // добавить
];
```

---

## 5. Добавление нового уровня (A2, B1, C1...)

### Полный чеклист нового уровня:

#### Шаг 1. Создать папки уровня

```
src/grammar/content/
├── a1/                       # уже есть
│   ├── 01-phonetics.ts ..
│   ├── index.ts
│   ├── exercises.ts          # пустой (legacy)
│   └── tasks/
│       ├── 01-phonetics.ts ..
│       └── index.ts
│
├── a2/                       # нужно создать
│   ├── 01-past-tense.ts ..   # файлы тем
│   ├── index.ts              # агрегатор тем
│   └── tasks/
│       ├── 01-past-tense.ts  # файлы заданий
│       └── index.ts          # агрегатор заданий
│
├── b1/                       # нужно создать
│   ├── ...                   # аналогично
│   └── ...
```

#### Шаг 2. Создать файлы теории

Для каждой темы уровня создайте файл `src/grammar/content/{level}/{order}-{topic}.ts`:
- Используйте `TopicBuilder`
- Добавьте правила (`addRule`), примеры (`addExample`), ошибки (`addMistake`)

#### Шаг 3. Создать файлы заданий

Для каждой темы создайте файл `src/grammar/content/{level}/tasks/{order}-{topic}.ts`:
- Используйте `TaskCollectionBuilder`
- Добавьте задания (`addTask`) с items нужных типов

#### Шаг 4. Создать index.ts уровня

`src/grammar/content/{level}/index.ts`:
```typescript
import type { GrammarTopic } from '../topic.types';
import { TOPIC } from './01-topic';
export const X_TOPICS: GrammarTopic[] = [TOPIC].sort((a,b) => a.order - b.order);
```

#### Шаг 5. Создать tasks/index.ts уровня

`src/grammar/content/{level}/tasks/index.ts`:
```typescript
import type { TaskCollection } from '../../task.types';
import { TOPIC_TASKS } from './01-topic';
export const X_TASK_COLLECTIONS: TaskCollection[] = [TOPIC_TASKS].sort((a,b) => a.order - b.order);
```

#### Шаг 6. Подключить в BuiltInProvider

```typescript
// BuiltInProvider.ts
private readonly topics = [...A1_TOPICS, ...A2_TOPICS, ...B1_TOPICS];
private readonly taskCollections = [...A1_TASK_COLLECTIONS, ...A2_TASK_COLLECTIONS, ...B1_TASK_COLLECTIONS];
```

#### Шаг 7. Проверить сборку

```bash
npx vite build
# Должно быть: ✓ built successfully, 0 errors
```

---

## 6. Локализация

Все тексты должны быть минимум на **русском** (`{ ru: '...' }`).
Рекомендуется добавлять **английский** и **арабский**:

```typescript
{
  ru: 'Привет',       // обязательно
  en: 'Hello',        // желательно
  ar: 'مرحبا',        // желательно
  de: 'Hallo'         // опционально
}
```

Если текста на нужном языке нет, `getText()` автоматически использует fallback:
`en` → `ru` → первое значение в объекте.

---

## 7. Быстрый шаблон для копирования

### Теория (шаблон)
```typescript
import { TopicBuilder, rule, example, mistake } from '../builders';

export const TOPIC = new TopicBuilder('a2-topic-id')
  .level('A2').category('tenses').order(1)
  .title({ ru: 'Название', en: 'Title', ar: 'العنوان' })
  .description({ ru: 'Описание.', en: 'Description.', ar: 'الوصف.' })
  .intro({ ru: 'Вступление.', en: 'Introduction.', ar: 'المقدمة.' })
  .addRule(rule('rule-1',
    { ru: 'Правило', en: 'Rule', ar: 'قاعدة' },
    { ru: 'Объяснение.', en: 'Explanation.', ar: 'الشرح.' },
    { formula: 'формула' }
  ))
  .addExample(example('Beispiel', { ru: 'Перевод', en: 'Translation', ar: 'الترجمة' }))
  .addMistake(mistake(
    { ru: 'Ошибка', en: 'Wrong', ar: 'خطأ' },
    { ru: 'Правильно', en: 'Correct', ar: 'صحيح' },
    { ru: 'Почему', en: 'Why', ar: 'لماذا' }
  ))
  .build();
```

### Задания (шаблон)
```typescript
import { TaskCollectionBuilder, task } from '../builders';

export const TOPIC_TASKS = new TaskCollectionBuilder('a2-topic-id-tasks')
  .level('A2').category('tenses').order(1)
  .title({ ru: 'Задания', en: 'Tasks', ar: 'تمارين' })
  .addTask(task('task-1',
    { ru: 'Название', en: 'Title', ar: 'العنوان' },
    { ru: 'Инструкция.', en: 'Instruction.', ar: 'التعليمات.' },
    [
      { question: 'Вопрос?', options: ['A', 'B'], correct: 'A' },
      { question: 'Вопрос2?', answer: 'ответ' },
    ]
  ))
  .build();
```

---

## 8. Проверка результата

После добавления контента запустите сборку:

```bash
npx vite build
```

Успешная сборка означает, что:
- ✅ Все типы корректны
- ✅ Все обязательные поля заполнены
- ✅ Нет циклических зависимостей
- ✅ Новые темы появятся в GrammarLevelList → GrammarTopicList
- ✅ Новые задания появятся после теории (кнопка "Практика")

---

## 9. Структура после добавления уровня A2

```
src/grammar/
├── content/
│   ├── a1/
│   │   ├── 01-phonetics.ts .. 19-everyday-grammar.ts
│   │   ├── index.ts
│   │   └── tasks/
│   │       ├── 01-phonetics.ts .. 08-remaining.ts
│   │       └── index.ts
│   │
│   ├── a2/                          ← НОВЫЙ УРОВЕНЬ
│   │   ├── 01-past-tense.ts         ← темы A2
│   │   ├── 02-future-tense.ts
│   │   ├── index.ts                 ← агрегатор A2_TOPICS
│   │   └── tasks/
│   │       ├── 01-past-tense.ts     ← задания A2
│   │       ├── 02-future-tense.ts
│   │       └── index.ts             ← агрегатор A2_TASK_COLLECTIONS
│   │
│   ├── builders.ts                  ← (не трогать)
│   ├── exercise.types.ts            ← (не трогать, legacy)
│   ├── task.types.ts                ← (не трогать)
│   └── topic.types.ts               ← (не трогать)

src/grammar/providers/
├── BuiltInProvider.ts               ← добавить A2_TOPICS, A2_TASK_COLLECTIONS
└── IContentProvider.ts              ← (не трогать)
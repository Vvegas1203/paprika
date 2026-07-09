import { TaskCollectionBuilder, task } from '../../builders';

export const TENSES_TASKS = new TaskCollectionBuilder('a1-tenses-tasks')
  .level('A1').category('tenses').order(6)
  .title({ ru: 'Задания: Präsens и Perfekt', en: 'Tasks: Present and Perfect', ar: 'تمارين: الأزمنة' })
  .addTask(task('perfekt-participles',
    { ru: 'Образуйте Partizip II', en: 'Form Participle II', ar: 'شكل التصريف الثالث' },
    { ru: 'Напишите третью форму глагола.', en: 'Write the third form of the verb.', ar: 'اكتب الشكل الثالث للفعل.' },
    [
      { question: 'machen -> ge___', answer: 'macht' },
      { question: 'gehen -> ge___', answer: 'gangen' },
      { question: 'sehen -> ge___', answer: 'sehen' },
    ]
  ))
  .addTask(task('haben-or-sein',
    { ru: 'Выберите вспомогательный глагол', en: 'Choose the auxiliary verb', ar: 'اختر الفعل المساعد' },
    { ru: 'haben или sein?', en: 'haben or sein?', ar: 'haben أم sein؟' },
    [
      { question: 'Ich ___ gegessen.', options: ['habe', 'bin'], correct: 'habe' },
      { question: 'Er ___ gefahren.', options: ['hat', 'ist'], correct: 'ist' },
    ]
  ))
  .build();

export const SENTENCE_STRUCTURE_TASKS = new TaskCollectionBuilder('a1-sentence-structure-tasks')
  .level('A1').category('syntax').order(7)
  .title({ ru: 'Задания: Порядок слов', en: 'Tasks: Word Order', ar: 'تمارين: ترتيب الكلمات' })
  .addTask(task('v2-rule-puzzle',
    { ru: 'Составьте предложение (V2)', en: 'Build the sentence (V2)', ar: 'كون الجملة (V2)' },
    { ru: 'Расставьте слова в правильном порядке.', en: 'Put the words in the correct order.', ar: 'رتب الكلمات بشكل صحيح.' },
    [
      { words: ['ich', 'heute', 'lerne', 'Deutsch'], correct: 'Heute lerne ich Deutsch.', question: '' },
      { words: ['wir', 'ins', 'gehen', 'Kino'], correct: 'Wir gehen ins Kino.', question: '' },
    ]
  ))
  .addTask(task('question-formation',
    { ru: 'Сформулируйте вопрос', en: 'Form a question', ar: 'صغ سؤالاً' },
    { ru: 'Превратите утверждение в вопрос.', en: 'Turn the statement into a question.', ar: 'حول العبارة إلى سؤال.' },
    [
      { statement: 'Du bist müde.', type: 'Yes/No', answer: 'Bist du müde?', question: '' },
      { statement: 'Er wohnt in Berlin.', type: 'W-Question (Wo)', answer: 'Wo wohnt er?', question: '' },
    ]
  ))
  .build();

export const NEGATION_TASKS = new TaskCollectionBuilder('a1-negation-tasks')
  .level('A1').category('negation').order(8)
  .title({ ru: 'Задания: nicht vs kein', en: 'Tasks: nicht vs kein', ar: 'تمارين: النفي' })
  .addTask(task('nicht-kein-choice',
    { ru: 'Выберите nicht или kein', en: 'Choose nicht or kein', ar: 'اختر nicht أو kein' },
    { ru: 'Какое отрицание подходит?', en: 'Which negation fits?', ar: 'أي نفي يناسب؟' },
    [
      { question: 'Ich habe ___ Zeit.', options: ['nicht', 'keine'], correct: 'keine' },
      { question: 'Das ist ___ gut.', options: ['nicht', 'kein'], correct: 'nicht' },
      { question: 'Er hat ___ Auto.', options: ['nicht', 'kein'], correct: 'kein' },
    ]
  ))
  .build();
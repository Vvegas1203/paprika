import { TaskCollectionBuilder, task } from '../../builders';

export const ADJECTIVES_TASKS = new TaskCollectionBuilder('a1-adjectives-tasks')
  .level('A1').category('adjectives').order(13)
  .title({ ru: 'Задания: Прилагательные', en: 'Tasks: Adjectives', ar: 'تمارين: الصفات' })
  .addTask(task('comparative-superlative',
    { ru: 'Степени сравнения', en: 'Degrees of comparison', ar: 'درجات المقارنة' },
    { ru: 'Напишите сравнительную и превосходную степень.', en: 'Write comparative and superlative.', ar: 'اكتب صيغتي التفضيل والتفضيل الأعلى.' },
    [
      { base: 'schnell', comp: 'schneller', sup: 'am schnellsten', question: '' },
      { base: 'gut', comp: 'besser', sup: 'am besten', question: '' },
    ]
  ))
  .build();

export const PREPOSITIONS_TASKS = new TaskCollectionBuilder('a1-prepositions-tasks')
  .level('A1').category('prepositions').order(11)
  .title({ ru: 'Задания: Предлоги и падежи', en: 'Tasks: Prepositions and Cases', ar: 'تمارين: حروف الجر' })
  .description({ ru: 'Практика выбора правильного падежа после предлогов.', en: 'Practice choosing the correct case after prepositions.', ar: 'ممارسة اختيار الحالة الإعرابية الصحيحة بعد حروف الجر.' })
  .addTask(task('prep-case-choice',
    { ru: 'Выберите правильный артикль', en: 'Choose the correct article', ar: 'اختر أداة التعريف الصحيحة' },
    { ru: 'Определите падеж после предлога.', en: 'Determine the case after the preposition.', ar: 'حدد الحالة بعد حرف الجر.' },
    [
      { question: 'mit ___ (der) Freund', options: ['dem', 'den', 'der'], correct: 'dem', explanation: { ru: 'mit всегда с Dativ.', en: 'mit always takes Dative.', ar: 'mit دائمًا مع الجر.' } },
      { question: 'für ___ (die) Mutter', options: ['die', 'der', 'dem'], correct: 'die', explanation: { ru: 'für всегда с Akkusativ.', en: 'für always takes Accusative.', ar: 'für دائمًا مع النصب.' } },
      { question: 'in ___ (das) Haus (движение)', options: ['das', 'dem', 'den'], correct: 'das', explanation: { ru: 'Движение = Akkusativ.', en: 'Movement = Accusative.', ar: 'الحركة = نصب.' } },
    ]
  ))
  .build();
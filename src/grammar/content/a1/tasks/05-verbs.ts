import { TaskCollectionBuilder, task } from '../../builders';

export const VERBS_TASKS = new TaskCollectionBuilder('a1-verbs-tasks')
  .level('A1').category('verbs').order(5)
  .title({ ru: 'Задания: Спряжение глаголов', en: 'Tasks: Verb Conjugation', ar: 'تمارين: تصريف الأفعال' })
  .addTask(task('regular-conjugation',
    { ru: 'Проспрягайте правильный глагол', en: 'Conjugate the regular verb', ar: 'صرف الفعل المنتظم' },
    { ru: 'Вставьте правильное окончание.', en: 'Insert the correct ending.', ar: 'أدخل النهاية الصحيحة.' },
    [
      { question: 'Ich mach__.', answer: 'e' },
      { question: 'Du komm__.', answer: 'st' },
      { question: 'Er arbeit__.', answer: 'et' },
    ]
  ))
  .addTask(task('modal-verbs-choice',
    { ru: 'Выберите модальный глагол', en: 'Choose the modal verb', ar: 'اختر الفعل المساعد' },
    { ru: 'Подберите глагол по смыслу (können, müssen, wollen).', en: 'Select the verb by meaning.', ar: 'اختر الفعل حسب المعنى.' },
    [
      { question: 'Ich ___ schwimmen.', options: ['kann', 'muss', 'will'], correct: 'kann', context: { ru: 'Умение', en: 'Ability', ar: 'القدرة' } },
      { question: 'Wir ___ nach Hause gehen.', options: ['dürfen', 'wollen', 'sollen'], correct: 'wollen', context: { ru: 'Желание', en: 'Desire', ar: 'الرغبة' } },
    ]
  ))
  .build();
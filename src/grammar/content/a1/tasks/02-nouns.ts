import { TaskCollectionBuilder, task } from '../../builders';

export const NOUNS_TASKS = new TaskCollectionBuilder('a1-nouns-tasks')
  .level('A1').category('nouns').order(2)
  .title({
    ru: 'Задания: Род и Артикли',
    en: 'Tasks: Gender and Articles',
    ar: 'تمارين: الجنس وأدوات التعريف'
  })
  .description({
    ru: 'Практика определения рода существительных и выбора правильного артикля.',
    en: 'Practice determining noun gender and choosing the correct article.',
    ar: 'ممارسة تحديد جنس الأسماء واختيار أداة التعريف الصحيحة.'
  })
  .addTask(task('article-selection',
    { ru: 'Выберите правильный артикль', en: 'Choose the correct article', ar: 'اختر أداة التعريف الصحيحة' },
    { ru: 'Определите род слова и выберите der, die или das.', en: 'Determine the gender and choose der, die, or das.', ar: 'حدد الجنس واختر der أو die أو das.' },
    [
      { question: '___ Mann', options: ['der', 'die', 'das'], correct: 'der', explanation: { ru: 'Mann — мужской род.', en: 'Mann is masculine.', ar: 'Mann مذكر.' } },
      { question: '___ Frau', options: ['der', 'die', 'das'], correct: 'die', explanation: { ru: 'Frau — женский род.', en: 'Frau is feminine.', ar: 'Frau مؤنث.' } },
      { question: '___ Kind', options: ['der', 'die', 'das'], correct: 'das', explanation: { ru: 'Kind — средний род.', en: 'Kind is neuter.', ar: 'Kind محايد.' } },
    ]
  ))
  .addTask(task('plural-forms',
    { ru: 'Образуйте множественное число', en: 'Form the plural', ar: 'شكل الجمع' },
    { ru: 'Напишите слово во множественном числе с артиклем Die.', en: 'Write the word in plural with the article Die.', ar: 'اكتب الكلمة في الجمع مع أداة التعريف Die.' },
    [
      { question: 'der Tisch ->', answer: 'Die Tische', hint: { ru: 'Добавьте -e', en: 'Add -e', ar: 'أضف -e' } },
      { question: 'die Lampe ->', answer: 'Die Lampen', hint: { ru: 'Добавьте -n', en: 'Add -n', ar: 'أضف -n' } },
    ]
  ))
  .build();
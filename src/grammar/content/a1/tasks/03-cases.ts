import { TaskCollectionBuilder, task } from '../../builders';

export const CASES_TASKS = new TaskCollectionBuilder('a1-cases-tasks')
  .level('A1').category('cases').order(3)
  .title({
    ru: 'Задания: Падежи',
    en: 'Tasks: Cases',
    ar: 'تمارين: الحالات الإعرابية'
  })
  .description({
    ru: 'Упражнения на различение Nominativ, Akkusativ и Dativ.',
    en: 'Exercises on distinguishing Nominative, Accusative, and Dative.',
    ar: 'تمارين للتمييز بين الرفع والنصب والجر.'
  })
  .addTask(task('case-identification',
    { ru: 'Определите падеж', en: 'Identify the case', ar: 'حدد الحالة الإعرابية' },
    { ru: 'Посмотрите на выделенное слово и выберите падеж.', en: 'Look at the highlighted word and choose the case.', ar: 'انظر إلى الكلمة المميزة واختر الحالة.' },
    [
      { question: 'Der Mann schläft.', options: ['Nominativ', 'Akkusativ', 'Dativ'], correct: 'Nominativ', explanation: { ru: 'Подлежащее в Nominativ.', en: 'Subject is Nominative.', ar: 'الفاعل في حالة الرفع.' } },
      { question: 'Ich sehe den Hund.', options: ['Nominativ', 'Akkusativ', 'Dativ'], correct: 'Akkusativ', explanation: { ru: 'Прямое дополнение = Akkusativ.', en: 'Direct object = Accusative.', ar: 'المفعول به = نصب.' } },
      { question: 'Ich helfe dem Kind.', options: ['Nominativ', 'Akkusativ', 'Dativ'], correct: 'Dativ', explanation: { ru: 'helfen требует Dativ.', en: 'helfen takes Dative.', ar: 'helfen يتطلب الجر.' } },
    ]
  ))
  .addTask(task('article-declension',
    { ru: 'Измените артикль', en: 'Decline the article', ar: 'صرف أداة التعريف' },
    { ru: 'Поставьте артикль в нужный падеж.', en: 'Put the article in the correct case.', ar: 'ضع أداة التعريف في الحالة الصحيحة.' },
    [
      { question: 'Ich habe ___ (der) Bruder.', answer: 'den', hint: { ru: 'Akkusativ мужской род.', en: 'Accusative masculine.', ar: 'النصب المذكر.' } },
      { question: 'Das Geschenk ist für ___ (die) Mutter.', answer: 'die', hint: { ru: 'für + Akkusativ.', en: 'für + Accusative.', ar: 'für + نصب.' } },
      { question: 'Ich spreche mit ___ (das) Kind.', answer: 'dem', hint: { ru: 'mit + Dativ.', en: 'mit + Dative.', ar: 'mit + جر.' } },
    ]
  ))
  .build();
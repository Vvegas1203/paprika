import { TaskCollectionBuilder, task } from '../../builders';

export const PRONOUNS_TASKS = new TaskCollectionBuilder('a1-pronouns-tasks')
  .level('A1').category('pronouns').order(4)
  .title({ ru: 'Задания: Местоимения', en: 'Tasks: Pronouns', ar: 'تمارين: الضمائر' })
  .addTask(task('personal-pronouns-fill',
    { ru: 'Вставьте личное местоимение', en: 'Fill in the personal pronoun', ar: 'أكمل الضمير الشخصي' },
    { ru: 'Замените существительное на подходящее местоимение (er, sie, es).', en: 'Replace the noun with the appropriate pronoun.', ar: 'استبدل الاسم بالضمير المناسب.' },
    [
      { question: 'Der Tisch ist groß. ___ ist neu.', answer: 'Er' },
      { question: 'Die Lampe ist hell. ___ steht dort.', answer: 'Sie' },
      { question: 'Das Buch ist interessant. ___ liegt hier.', answer: 'Es' },
    ]
  ))
  .addTask(task('possessive-match',
    { ru: 'Соотнесите притяжательное местоимение', en: 'Match the possessive pronoun', ar: 'طابق الضمير الملكي' },
    { ru: 'Выберите правильное местоимение для лица.', en: 'Choose the correct pronoun for the person.', ar: 'اختر الضمير الصحيح للشخص.' },
    [
      { question: 'Ich -> ___ Vater', options: ['mein', 'dein', 'sein'], correct: 'mein' },
      { question: 'Du -> ___ Mutter', options: ['mein', 'dein', 'ihr'], correct: 'dein' },
    ]
  ))
  .build();
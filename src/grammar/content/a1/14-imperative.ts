import { TopicBuilder, rule } from '../builders';

export const IMPERATIVE = new TopicBuilder('a1-imperative')
  .level('A1').category('imperative').order(14)
  .title({
    ru: 'Повелительное наклонение',
    en: 'Imperative Mood',
    de: 'Imperativ',
    ar: 'صيغة الأمر'
  })
  .description({
    ru: 'Как давать инструкции и просьбы.',
    en: 'How to give instructions and requests.',
    ar: 'كيفية إعطاء التعليمات والطلبات.'
  })
  .addRule(rule('du-form',
    { ru: 'Форма для "ты"', en: 'Form for "you" (sg)', ar: 'صيغة "أنت"' },
    { ru: 'Убираем окончание -st. Для сильных глаголов с изменением корня сохраняем изменение.', en: 'Remove -st ending. For strong verbs with stem change, keep the change.', ar: 'احذف نهاية -st. للأفعال القوية مع تغير الجذر، احتفظ بالتغير.' },
    { formula: 'mach! (machen), iss! (essen), schlaf! (schlafen)' }
  ))
  .addRule(rule('sie-form',
    { ru: 'Вежливая форма', en: 'Formal form', ar: 'الصيغة الرسمية' },
    { ru: 'Глагол + Sie. Глагол на первом месте.', en: 'Verb + Sie. Verb in first position.', ar: 'الفعل + Sie. الفعل في الموقع الأول.' },
    { formula: 'Kommen Sie bitte!' }
  ))
  .build();
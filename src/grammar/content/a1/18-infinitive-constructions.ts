import { TopicBuilder, rule, example } from '../builders';

export const INFINITIVE_CONSTRUCTIONS = new TopicBuilder('a1-infinitive-constructions')
  .level('A1').category('infinitive').order(19)
  .title({
    ru: 'Инфинитив с частицей Zu',
    en: 'Infinitive with Zu',
    de: 'Infinitiv mit zu',
    ar: 'المصدر مع Zu'
  })
  .description({
    ru: 'Глаголы, требующие инфинитива с zu.',
    en: 'Verbs requiring infinitive with zu.',
    ar: 'الأفعال التي تتطلب المصدر مع zu.'
  })
  .addRule(rule('zu-infinitive',
    { ru: 'Правило использования Zu', en: 'Rule for using Zu', ar: 'قاعدة استخدام Zu' },
    { ru: 'После глаголов: versuchen, vergessen, anfangen, lernen, hoffen. Zu ставится перед инфинитивом.', en: 'After verbs: try, forget, start, learn, hope. Zu is placed before infinitive.', ar: 'بعد الأفعال: يحاول، ينسى، يبدأ، يتعلم، يأمل. توضع Zu قبل المصدر.' },
    { formula: 'Ich versuche, Deutsch zu lernen.' }
  ))
  .addExample(example('vergessen', { ru: 'забывать', en: 'to forget', ar: 'ينسى' }))
  .build();
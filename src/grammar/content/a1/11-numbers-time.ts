import { TopicBuilder, rule, example } from '../builders';

export const NUMBERS_TIME = new TopicBuilder('a1-numbers-time')
  .level('A1').category('lexicon').order(13)
  .title({
    ru: 'Числа, Даты и Время',
    en: 'Numbers, Dates, and Time',
    de: 'Zahlen, Daten und Uhrzeit',
    ar: 'الأرقام، التواريخ، والوقت'
  })
  .description({
    ru: 'Счет, порядковые числительные и telling time.',
    en: 'Counting, ordinal numbers, and telling time.',
    ar: 'العد، الأعداد الترتيبية، وإخبار الوقت.'
  })
  .addRule(rule('time-telling',
    { ru: 'Как сказать время', en: 'Telling time', ar: 'إخبار الوقت' },
    { ru: 'Es ist ... Uhr. Для минут: nach (после) и vor (до).', en: 'Es ist ... Uhr. For minutes: nach (past) and vor (to).', ar: 'Es ist ... Uhr. للدقائق: nach (بعد) و vor (قبل).' },
    { formula: 'Es ist zehn nach acht. (8:10)' }
  ))
  .addExample(example('erste', { ru: 'первый', en: 'first', ar: 'الأول' }))
  .addExample(example('zweite', { ru: 'второй', en: 'second', ar: 'الثاني' }))
  .build();
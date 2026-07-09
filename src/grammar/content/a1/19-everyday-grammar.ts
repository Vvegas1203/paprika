import { TopicBuilder, rule, example } from '../builders';

export const EVERYDAY_GRAMMAR = new TopicBuilder('a1-everyday-grammar')
  .level('A1').category('everyday').order(20)
  .title({
    ru: 'Грамматика в бытовых ситуациях',
    en: 'Grammar in Everyday Situations',
    de: 'Alltagsgrammatik',
    ar: 'القواعد في المواقف اليومية'
  })
  .description({
    ru: 'Покупки, ресторан, врач, путешествия.',
    en: 'Shopping, restaurant, doctor, travel.',
    ar: 'التسوق، المطعم، الطبيب، السفر.'
  })
  .addRule(rule('shopping',
    { ru: 'В магазине', en: 'At the shop', ar: 'في المتجر' },
    { ru: 'Ich hätte gern... (Я бы хотел...). Вежливая форма Konjunktiv II.', en: 'Ich hätte gern... (I would like...). Polite form.', ar: 'Ich hätte gern... (أود أن...). صيغة مهذبة.' },
    { formula: 'Ich hätte gern ein Brot, bitte.' }
  ))
  .addRule(rule('directions',
    { ru: 'Как пройти', en: 'Asking for directions', ar: 'السؤال عن الاتجاهات' },
    { ru: 'Wie komme ich zum Bahnhof? Gehen Sie geradeaus.', en: 'How do I get to the station? Go straight.', ar: 'كيف أصل إلى المحطة؟ امشِ مباشرة.' },
    { formula: 'Entschuldigung, wo ist die Toilette?' }
  ))
  .addExample(example('die Rechnung', { ru: 'счет', en: 'bill', ar: 'الفاتورة' }))
  .build();
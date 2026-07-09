import { TopicBuilder, rule, example } from '../builders';

export const ADVERBS = new TopicBuilder('a1-adverbs')
  .level('A1').category('adverbs').order(10)
  .title({
    ru: 'Наречия времени и места',
    en: 'Time and Place Adverbs',
    de: 'Temporal- und Lokaladverbien',
    ar: 'ظروф الزمان والمكان'
  })
  .description({
    ru: 'Правило TeKaMoLo и основные наречия.',
    en: 'TeKaMoLo rule and basic adverbs.',
    ar: 'قاعدة TeKaMoLo والظروف الأساسية.'
  })
  .addRule(rule('tekamolo',
    { ru: 'Порядок обстоятельств', en: 'Order of adverbials', ar: 'ترتيب الظروف' },
    { ru: 'Temporal (Когда) -> Kausal (Почему) -> Modal (Как) -> Local (Где).', en: 'Temporal (When) -> Kausal (Why) -> Modal (How) -> Local (Where).', ar: 'الزمان (متى) -> السبب (لماذا) -> الكيفية (كيف) -> المكان (أين).' },
    { formula: 'Ich fahre morgen wegen der Arbeit mit dem Zug nach Berlin.' }
  ))
  .addExample(example('morgen', { ru: 'завтра', en: 'tomorrow', ar: 'غدًا' }))
  .addExample(example('hier', { ru: 'здесь', en: 'here', ar: 'هنا' }))
  .build();
import { TopicBuilder, rule, example } from '../builders';

export const TIME_EXPRESSIONS = new TopicBuilder('a1-time-expressions')
  .level('A1').category('lexicon').order(17)
  .title({
    ru: 'Выражения времени и Наречия',
    en: 'Time Expressions and Adverbs',
    de: 'Zeitangaben',
    ar: 'تعابير الوقت'
  })
  .description({
    ru: 'heute, morgen, gestern, bald, später.',
    en: 'today, tomorrow, yesterday, soon, later.',
    ar: 'اليوم، غدًا، أمس، قريبًا، لاحقًا.'
  })
  .addRule(rule('sequence',
    { ru: 'Последовательность действий', en: 'Sequence of actions', ar: 'تسلسل الأفعال' },
    { ru: 'zuerst (сначала), dann (потом), danach (после этого), zum Schluss (в конце).', en: 'zuerst (first), dann (then), danach (after that), zum Schluss (finally).', ar: 'zuerst (أولاً)، dann (ثم)، danach (بعد ذلك)، zum Schluss (أخيرًا).' },
    { formula: 'Zuerst frühstücke ich, dann gehe ich zur Arbeit.' }
  ))
  .addExample(example('gestern', { ru: 'вчера', en: 'yesterday', ar: 'أمس' }))
  .build();
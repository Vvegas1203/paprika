import { TopicBuilder, rule, example } from '../builders';

export const QUESTION_WORDS = new TopicBuilder('a1-question-words')
  .level('A1').category('questions').order(15)
  .title({
    ru: 'Вопросительные слова (W-Fragen)',
    en: 'Question Words (W-Questions)',
    de: 'W-Fragen',
    ar: 'كلمات الاستفهام'
  })
  .description({
    ru: 'Wer, Was, Wo, Wann, Warum, Wie.',
    en: 'Who, What, Where, When, Why, How.',
    ar: 'من، ماذا، أين، متى، لماذا، كيف.'
  })
  .addRule(rule('w-words',
    { ru: 'Основные вопросительные слова', en: 'Basic question words', ar: 'كلمات الاستفهام الأساسية' },
    { ru: 'Wer (кто), Was (что), Wo (где), Wohin (куда), Woher (откуда), Wann (когда), Warum (почему), Wie (как).', en: 'Wer (who), Was (what), Wo (where), Wohin (where to), Woher (where from), Wann (when), Warum (why), Wie (how).', ar: 'Wer (من), Was (ماذا)، Wo (أين)، Wohin (إلى أين)، Woher (من أين)، Wann (متى)، Warum (لماذا)، Wie (كيف).' },
    { formula: 'Woher kommst du?' }
  ))
  .addExample(example('warum', { ru: 'почему', en: 'why', ar: 'لماذا' }))
  .build();
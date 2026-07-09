import { TopicBuilder, rule, example } from '../builders';

export const ADJECTIVES = new TopicBuilder('a1-adjectives')
  .level('A1').category('adjectives').order(9)
  .title({
    ru: 'Прилагательные и Степени сравнения',
    en: 'Adjectives and Comparisons',
    de: 'Adjektive und Steigerungsformen',
    ar: 'الصفات وصيغ التفضيل'
  })
  .description({
    ru: 'Предикативное использование, базовые окончания и сравнение.',
    en: 'Predicative use, basic endings, and comparison.',
    ar: 'الاستخدام الخبري، النهايات الأساسية، والمقارنة.'
  })
  .addRule(rule('predicative',
    { ru: 'Предикативные прилагательные', en: 'Predicative adjectives', ar: 'الصفات الخبرية' },
    { ru: 'Если прилагательное стоит после глага (sein, werden), оно не имеет окончаний.', en: 'If adjective is after verb (sein, werden), it has no endings.', ar: 'إذا كانت الصفة بعد الفعل (sein, werden)، فلا توجد لها نهايات.' },
    { formula: 'Das Haus ist groß. (Not: großes)' }
  ))
  .addRule(rule('comparative',
    { ru: 'Сравнительная степень', en: 'Comparative', ar: 'صيغة التفضيل' },
    { ru: 'Образуется добавлением -er. Часто с umlaut: alt -> älter.', en: 'Formed by adding -er. Often with umlaut: alt -> älter.', ar: 'تتكون بإضافة -er. غالبًا مع umlaut: alt -> älter.' },
    { formula: 'schnell -> schneller, gut -> besser' }
  ))
  .addExample(example('besser', { ru: 'лучше', en: 'better', ar: 'أفضل' }))
  .build();
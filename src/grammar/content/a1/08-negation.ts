import { TopicBuilder, rule, mistake } from '../builders';

export const NEGATION = new TopicBuilder('a1-negation')
  .level('A1').category('negation').order(8)
  .title({
    ru: 'Отрицание: nicht и kein',
    en: 'Negation: nicht and kein',
    de: 'Verneinung: nicht und kein',
    ar: 'النفي: nicht و kein'
  })
  .description({
    ru: 'Разница между отрицанием глаголов/прилагательных и существительных.',
    en: 'Difference between negating verbs/adjectives and nouns.',
    ar: 'الفرق بين نفي الأفعال/الصفات والأسماء.'
  })
  .addRule(rule('kein',
    { ru: 'Отрицание существительных', en: 'Negating nouns', ar: 'نفي الأسماء' },
    { ru: 'Используется перед существительными с неопределенным артиклем или без него.', en: 'Used before nouns with indefinite article or no article.', ar: 'يستخدم قبل الأسماء ذات أداة التعريف غير المحددة أو بدون أداة.' },
    { formula: 'Ich habe kein Auto. Das ist keine Lampe.' }
  ))
  .addRule(rule('nicht',
    { ru: 'Отрицание остального', en: 'Negating everything else', ar: 'نفي الباقي' },
    { ru: 'Используется для глаголов, прилагательных, имен собственных и определенных артиклей.', en: 'Used for verbs, adjectives, proper names, and definite articles.', ar: 'يستخدم للأفعال، الصفات، الأعلام، وأدوات التعريف المحددة.' },
    { formula: 'Ich schlafe nicht. Das ist nicht gut.' }
  ))
  .addMistake(mistake(
    { ru: 'использовать nicht вместо kein перед существительным', en: 'using nicht instead of kein before noun', ar: 'استخدام nicht بدلاً من kein قبل الاسم' },
    { ru: 'Неправильно: Ich habe nicht Zeit. Правильно: Ich habe keine Zeit.', en: 'Wrong: Ich habe nicht Zeit. Correct: Ich habe keine Zeit.', ar: 'خطأ: Ich habe nicht Zeit. صحيح: Ich habe keine Zeit.' },
    { ru: 'nicht отрицает действие или признак, kein — существительное.', en: 'nicht negates action/quality, kein negates noun.', ar: 'nicht ينفي الفعل أو الصفة، kein — اسم.' },
    { frequency: 5 }
  ))
  .build();
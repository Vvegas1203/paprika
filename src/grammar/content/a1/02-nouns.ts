import { TopicBuilder, rule, example, mistake } from '../builders';

export const NOUNS = new TopicBuilder('a1-nouns')
  .level('A1').category('articles-nouns').order(2).prereq('a1-phonetics')
  .title({
    ru: 'Существительные и Артикли',
    en: 'Nouns and Articles',
    de: 'Substantive und Artikel',
    ar: 'الأسماء وأدوات التعريف'
  })
  .description({
    ru: 'Род существительных (der, die, das), артикли, число и капитализация.',
    en: 'Gender of nouns (der, die, das), articles, plural forms, and capitalization.',
    ar: 'جنس الأسماء (der, die, das)، أدوات التعريف، صيغ الجمع، وكتابة الحروف الكبيرة.'
  })
  .int({
    ru: 'В немецком языке все существительные пишутся с большой буквы. У каждого существительного есть род: мужской (der), женский (die) или средний (das).',
    en: 'In German, all nouns are capitalized. Every noun has a gender: masculine (der), feminine (die), or neuter (das).',
    ar: 'في اللغة الألمانية، تكتب جميع الأسماء بحرف كبير. لكل اسم جنس: مذكر (der)، مؤنث (die)، أو محايد (das).'
  })
  .addRule(rule('capitalization',
    { ru: 'Правило капитализации', en: 'Capitalization rule', ar: 'قاعدة الكتابة بحرف كبير' },
    { ru: 'Все существительные в немецком языке начинаются с заглавной буквы, независимо от их позиции в предложении.', en: 'All nouns in German start with a capital letter, regardless of their position in the sentence.', ar: 'تبدأ جميع الأسماء في الألمانية بحرف كبير، بغض النظر عن موقعها في الجملة.' },
    { formula: 'der Tisch, die Lampe, das Buch', tags: ['basics'] }
  ))
  .addRule(rule('gender-basics',
    { ru: 'Определенные артикли', en: 'Definite articles', ar: 'أدوات التعريف' },
    { ru: 'Der — мужской род, Die — женский род, Das — средний род. Множественное число всегда имеет артикль Die.', en: 'Der — masculine, Die — feminine, Das — neuter. Plural always uses Die.', ar: 'Der — للمذكر، Die — للمؤنث، Das — للمحايد. الجمع دائمًا يستخدم Die.' },
    { mnemonic: { ru: 'Запоминайте артикль вместе со словом!', en: 'Always learn the article with the noun!', ar: 'احفظ دائمًا أداة التعريف مع الاسم!' } }
  ))
  .addExample(example('der Mann', { ru: 'мужчина', en: 'man', ar: 'رجل' }))
  .addExample(example('die Frau', { ru: 'женщина', en: 'woman', ar: 'امرأة' }))
  .addExample(example('das Kind', { ru: 'ребенок', en: 'child', ar: 'طفل' }))
  .addMistake(mistake(
    { ru: 'использовать один артикль для всех слов', en: 'using one article for all words', ar: 'استخدام أداة تعريف واحدة لجميع الكلمات' },
    { ru: 'Неправильно: der Frau. Правильно: die Frau.', en: 'Wrong: der Frau. Correct: die Frau.', ar: 'خطأ: der Frau. صحيح: die Frau.' },
    { ru: 'Род в немецком часто не совпадает с биологическим полом или логикой.', en: 'Gender in German often does not match biological sex or logic.', ar: 'الجنس في الألمانية غالبًا لا يتطابق مع الجنس البيولوجي أو المنطق.' },
    { frequency: 5 }
  ))
  .build();
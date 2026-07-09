import { TopicBuilder, rule, example, mistake } from '../builders';

export const PRONOUNS = new TopicBuilder('a1-pronouns')
  .level('A1').category('pronouns').order(4)
  .title({
    ru: 'Личные и Притяжательные местоимения',
    en: 'Personal and Possessive Pronouns',
    de: 'Personal- und Possessivpronomen',
    ar: 'الضمائر الشخصية والملكية'
  })
  .description({
    ru: 'Замена существительных местоимениями (ich, du, er...) и выражение принадлежности (mein, dein...).',
    en: 'Replacing nouns with pronouns (ich, du, er...) and expressing possession (mein, dein...).',
    ar: 'استبدال الأسماء بالضمائر (ich, du, er...) والتعبير عن الملكية (mein, dein...).'
  })
  .addRule(rule('personal-pronouns',
    { ru: 'Личные местоимения', en: 'Personal pronouns', ar: 'الضمائر الشخصية' },
    { ru: 'ich (я), du (ты), er/es/sie (он/оно/она), wir (мы), ihr (вы мн.), sie/Sie (они/Вы).', en: 'ich (I), du (you sg), er/es/sie (he/it/she), wir (we), ihr (you pl), sie/Sie (they/You formal).', ar: 'ich (أنا), du (أنت), er/es/sie (هو/هي/ذلك), wir (نحن), ihr (أنتم), sie/Sie (هم/أنتم رسميًا).' },
    { formula: 'Ich bin müde. Er ist hier.' }
  ))
  .addRule(rule('possessive-pronouns',
    { ru: 'Притяжательные местоимения', en: 'Possessive pronouns', ar: 'الضمائر الملكية' },
    { ru: 'mein (мой), dein (твой), sein (его), ihr (ее/их), unser (наш), euer (ваш), Ihr (Ваш).', en: 'mein (my), dein (your), sein (his), ihr (her/their), unser (our), euer (your pl), Ihr (Your formal).', ar: 'mein (ملكي), dein (ملكك), sein (ملكه), ihr (ملكها/ملكهم), unser (ملكنا), euer (ملككم), Ihr (ملككم رسميًا).' },
    { formula: 'Das ist mein Buch. Ist das dein Auto?' }
  ))
  .addExample(example('mein Vater', { ru: 'мой отец', en: 'my father', ar: 'أبي' }))
  .addExample(example('deine Mutter', { ru: 'твоя мама', en: 'your mother', ar: 'أمك' }))
  .addMistake(mistake(
    { ru: 'путать ihr (ее) и ihr (их)', en: 'confusing ihr (her) and ihr (their)', ar: 'الخلط بين ihr (لها) و ihr (لهم)' },
    { ru: 'Контекст важен: "Sie liebt ihren Hund" (ее) vs "Sie lieben ihren Hund" (их).', en: 'Context is key: "She loves her dog" vs "They love their dog".', ar: 'السياق مهم: "هي تحب كلبها" مقابل "هم يحبون كلبهم".' },
    { ru: 'Форма одинаковая, но глагол помогает понять смысл.', en: 'The form is identical, but the verb helps understand the meaning.', ar: 'الشكل متطابق، لكن الفعل يساعد في فهم المعنى.' },
    { frequency: 3 }
  ))
  .build();
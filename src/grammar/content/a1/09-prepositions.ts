import { TopicBuilder, rule } from '../builders';

export const PREPOSITIONS = new TopicBuilder('a1-prepositions')
  .level('A1').category('prepositions').order(11)
  .title({
    ru: 'Предлоги и Падежи',
    en: 'Prepositions and Cases',
    de: 'Präpositionen und Fälle',
    ar: 'حروف الجر والحالات الإعرابية'
  })
  .description({
    ru: 'Предлоги, требующие Akkusativ, Dativ и Wechselpräpositionen.',
    en: 'Prepositions requiring Accusative, Dative, and Two-way prepositions.',
    ar: 'حروف الجر التي تتطلب النصب، الجر، وحروف الجر المزدوجة.'
  })
  .addRule(rule('acc-prep',
    { ru: 'Предлоги с Akkusativ', en: 'Prepositions with Accusative', ar: 'حروف جر مع النصب' },
    { ru: 'für, ohne, gegen, durch, um. Всегда требуют винительного падежа.', en: 'für, ohne, gegen, durch, um. Always require accusative.', ar: 'für, ohne, gegen, durch, um. تتطلب دائمًا حالة النصب.' },
    { formula: 'Das Geschenk ist für dich.' }
  ))
  .addRule(rule('dat-prep',
    { ru: 'Предлоги с Dativ', en: 'Prepositions with Dative', ar: 'حروف جر مع الجر' },
    { ru: 'mit, nach, von, zu, bei, aus, seit. Всегда требуют дательного падежа.', en: 'mit, nach, von, zu, bei, aus, seit. Always require dative.', ar: 'mit, nach, von, zu, bei, aus, seit. تتطلب دائمًا حالة الجر.' },
    { formula: 'Ich komme aus Deutschland.' }
  ))
  .addRule(rule('wechsel',
    { ru: 'Wechselpräpositionen (Двойные)', en: 'Two-way prepositions', ar: 'حروف الجر المزدوجة' },
    { ru: 'in, an, auf, unter, vor, hinter, neben, zwischen, über. Движение = Akk, Позиция = Dat.', en: 'in, an, auf... Movement = Akk, Position = Dat.', ar: 'in, an, auf... الحركة = نصب، الموقع = جر.' },
    { formula: 'Ich lege das Buch auf den Tisch (Akk). Das Buch liegt auf dem Tisch (Dat).' }
  ))
  .build();
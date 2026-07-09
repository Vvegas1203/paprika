import { TopicBuilder, rule, mistake } from '../builders';

export const CONJUNCTIONS = new TopicBuilder('a1-conjunctions')
  .level('A1').category('conjunctions').order(12)
  .title({
    ru: 'Союзы: und, aber, weil, dass',
    en: 'Conjunctions: und, aber, weil, dass',
    de: 'Konjunktionen',
    ar: 'أدوات الربط'
  })
  .description({
    ru: 'Соединение простых и сложных предложений.',
    en: 'Connecting simple and complex sentences.',
    ar: 'ربط الجمل البسيطة والمعقدة.'
  })
  .addRule(rule('coordinating',
    { ru: 'Сочинительные союзы', en: 'Coordinating conjunctions', ar: 'أدوات الربط العطفية' },
    { ru: 'und, oder, aber, denn. Не влияют на порядок слов (позиция 0).', en: 'und, oder, aber, denn. Do not affect word order (position 0).', ar: 'und, oder, aber, denn. لا تؤثر على ترتيب الكلمات (الموقع 0).' },
    { formula: 'Ich bin müde, aber ich arbeite.' }
  ))
  .addRule(rule('subordinating',
    { ru: 'Подчинительные союзы', en: 'Subordinating conjunctions', ar: 'أدوات الربط الفرعية' },
    { ru: 'weil, dass. Отправляют глагол в самый конец предложения.', en: 'weil, dass. Send the verb to the very end of the sentence.', ar: 'weil, dass. ترسل الفعل إلى نهاية الجملة.' },
    { formula: 'Ich esse, weil ich Hunger habe.' }
  ))
  .addMistake(mistake(
    { ru: 'не отправлять глагол в конец после weil', en: 'not sending verb to end after weil', ar: 'عدم إرسال الفعل إلى النهاية بعد weil' },
    { ru: 'Неправильно: weil ich habe Hunger. Правильно: weil ich Hunger habe.', en: 'Wrong: weil ich habe Hunger. Correct: weil ich Hunger habe.', ar: 'خطأ: weil ich habe Hunger. صحيح: weil ich Hunger habe.' },
    { ru: 'Глагол в придаточном предложении ставится в конец.', en: 'The verb goes to the end in subordinate clauses.', ar: 'الفعل يذهب إلى النهاية في الجمل الفرعية.' },
    { frequency: 5 }
  ))
  .build();
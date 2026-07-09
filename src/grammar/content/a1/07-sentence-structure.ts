import { TopicBuilder, rule, example, mistake } from '../builders';

export const SENTENCE_STRUCTURE = new TopicBuilder('a1-sentence-structure')
  .level('A1').category('syntax').order(7)
  .title({
    ru: 'Порядок слов в предложении',
    en: 'Word Order in Sentences',
    de: 'Satzstellung',
    ar: 'ترتيب الكلمات في الجمل'
  })
  .description({
    ru: 'Правило V2, инверсия и построение вопросов.',
    en: 'V2 rule, inversion, and question formation.',
    ar: 'قاعدة V2، العكس، وتكوين الأسئلة.'
  })
  .addRule(rule('v2-rule',
    { ru: 'Глагол на втором месте', en: 'Verb in second position', ar: 'الفعل في المركز الثاني' },
    { ru: 'В повествовательном предложении спрягаемый глагол всегда стоит на втором месте.', en: 'In declarative sentences, the conjugated verb is always in the second position.', ar: 'في الجمل الخبرية، يأتي الفعل المصرّف دائمًا في المركز الثاني.' },
    { formula: 'Heute gehe ich ins Kino. (Not: Heute ich gehe...)' }
  ))
  .addRule(rule('questions',
    { ru: 'Вопросы', en: 'Questions', ar: 'الأسئلة' },
    { ru: 'Да/Нет: Глагол на 1 месте. W-вопросы: Вопросительное слово на 1 месте, глагол на 2.', en: 'Yes/No: Verb in 1st pos. W-questions: Question word in 1st, verb in 2nd.', ar: 'نعم/لا: الفعل في المركز الأول. أسئلة W: كلمة الاستفهام في الأول، الفعل في الثاني.' },
    { formula: 'Kommst du? Wo wohnst du?' }
  ))
  .addExample(example('Morgen fahre ich.', { ru: 'Завтра я еду.', en: 'Tomorrow I drive.', ar: 'غدًا أقود.' }))
  .addMistake(mistake(
    { ru: 'ставить глагол в конец в главном предложении', en: 'putting verb at end in main clause', ar: 'وضع الفعل في النهاية في الجملة الرئيسية' },
    { ru: 'Глагол должен быть во 2-м месте в главном предложении.', en: 'Verb should be in 2nd position in main clause.', ar: 'يجب أن يكون الفعل في المركز الثاني في الجملة الرئيسية.' },
    { ru: 'Это ошибка из-за влияния придаточных предложений.', en: 'This is a mistake due to influence of subordinate clauses.', ar: 'هذا خطأ بسبب تأثير الجمل الفرعية.' },
    { frequency: 3 }
  ))
  .build();
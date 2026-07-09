import { TopicBuilder, rule, example, mistake } from '../builders';

export const TENSES = new TopicBuilder('a1-tenses')
  .level('A1').category('tenses').order(6)
  .title({
    ru: 'Времена: Präsens и Perfekt',
    en: 'Tenses: Present and Perfect',
    de: 'Zeiten: Präsens und Perfekt',
    ar: 'الأزمنة: الحاضر والماضي التام'
  })
  .description({
    ru: 'Настоящее время и прошедшее разговорное время (Perfekt).',
    en: 'Present tense and spoken past tense (Perfekt).',
    ar: 'زمن الحاضر والزمن الماضي المحكي (Perfekt).'
  })
  .addRule(rule('praesens',
    { ru: 'Präsens (Настоящее)', en: 'Present Tense', ar: 'زمن الحاضر' },
    { ru: 'Используется для текущих действий и фактов. Также может заменять будущее время.', en: 'Used for current actions and facts. Can also replace future tense.', ar: 'يستخدم للأفعال الحالية والحقائق. يمكن أن يحل محل زمن المستقبل أيضًا.' },
    { formula: 'Ich lerne Deutsch. Morgen fliege ich nach Berlin.' }
  ))
  .addRule(rule('perfekt',
    { ru: 'Perfekt (Прошедшее разговорное)', en: 'Perfect Tense', ar: 'زمن الماضي التام' },
    { ru: 'Образуется с помощью haben/sein + Partizip II. Используется в разговоре о прошлом.', en: 'Formed with haben/sein + Participle II. Used in speech about the past.', ar: 'يتكون باستخدام haben/sein + التصريف الثالث. يستخدم في الكلام عن الماضي.' },
    { formula: 'Ich habe gegessen. Er ist gegangen.' }
  ))
  .addExample(example('gegessen', { ru: 'съел', en: 'eaten', ar: 'أكل' }))
  .addMistake(mistake(
    { ru: 'использовать sein вместо haben для переходных глаголов', en: 'using sein instead of haben for transitive verbs', ar: 'استخدام sein بدلاً من haben للأفعال المتعدية' },
    { ru: 'Неправильно: Ich bin einen Apfel gegessen. Правильно: Ich habe...', en: 'Wrong: Ich bin einen Apfel gegessen. Correct: Ich habe...', ar: 'خطأ: Ich bin einen Apfel gegessen. صحيح: Ich habe...' },
    { ru: 'Большинство глаголов используют haben. Sein используется для движения и изменения состояния.', en: 'Most verbs use haben. Sein is used for movement and change of state.', ar: 'معظم الأفعال تستخدم haben. تستخدم Sein للحركة وتغير الحالة.' },
    { frequency: 4 }
  ))
  .build();
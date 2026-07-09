import { TopicBuilder, rule, example, mistake } from '../builders';

export const CASES = new TopicBuilder('a1-cases')
  .level('A1').category('cases').order(3)
  .title({
    ru: 'Падежи: Nominativ, Akkusativ, Dativ',
    en: 'Cases: Nominative, Accusative, Dative',
    de: 'Fälle: Nominativ, Akkusativ, Dativ',
    ar: 'الحالات الإعرابية: الرفع، النصب، الجر'
  })
  .description({
    ru: 'Изменение артиклей и местоимений в зависимости от роли в предложении.',
    en: 'Changing articles and pronouns based on their role in the sentence.',
    ar: 'تغيير أدوات التعريف والضمائر بناءً على دورها في الجملة.'
  })
  .int({
    ru: 'В немецком языке 4 падежа. На уровне А1 мы фокусируемся на трех основных: Nominativ (кто? что?), Akkusativ (кого? что?) и Dativ (кому?).',
    en: 'German has 4 cases. At A1 level, we focus on three main ones: Nominative (who? what?), Accusative (whom? what?), and Dative (to whom?).',
    ar: 'للغة الألمانية 4 حالات إعرابية. في مستوى A1، نركز على ثلاث رئيسية: الرفع (من؟ ماذا؟)، النصب (من؟ ماذا؟)، والجر (لمن؟).'
  })
  .addRule(rule('nominative',
    { ru: 'Nominativ (Именительный)', en: 'Nominative', ar: 'حالة الرفع' },
    { ru: 'Используется для подлежащего. Артикли не меняются: der, die, das.', en: 'Used for the subject. Articles do not change: der, die, das.', ar: 'تستخدم للفاعل. لا تتغير أدوات التعريف: der, die, das.' },
    { formula: 'Der Mann schläft. (The man sleeps.)' }
  ))
  .addRule(rule('accusative',
    { ru: 'Akkusativ (Винительный)', en: 'Accusative', ar: 'حالة النصب' },
    { ru: 'Используется для прямого дополнения. Меняется только мужской род: der -> den.', en: 'Used for the direct object. Only masculine changes: der -> den.', ar: 'تستخدم للمفعول به المباشر. يتغير فقط المذكر: der -> den.' },
    { formula: 'Ich sehe den Mann. (I see the man.)' }
  ))
  .addRule(rule('dative',
    { ru: 'Dativ (Дательный)', en: 'Dative', ar: 'حالة الجر' },
    { ru: 'Используется для косвенного дополнения (кому?). Изменения: der->dem, die->der, das->dem, pl->den.', en: 'Used for indirect object (to whom?). Changes: der->dem, die->der, das->dem, pl->den.', ar: 'تستخدم للمفعول غير المباشر (لمن؟). التغييرات: der->dem, die->der, das->dem, pl->den.' },
    { formula: 'Ich gebe dem Mann das Buch. (I give the man the book.)' }
  ))
  .addExample(example('den Apfel', { ru: 'яблоко (вин. п.)', en: 'apple (acc.)', ar: 'تفاحة (نصب)' }))
  .addMistake(mistake(
    { ru: 'менять артикль у женского рода в Akkusativ', en: 'changing article for feminine in Accusative', ar: 'تغيير أداة التعريف للمؤنث في حالة النصب' },
    { ru: 'Die остается Die в Akkusativ.', en: 'Die stays Die in Accusative.', ar: 'Die تبقى Die في حالة النصب.' },
    { ru: 'Только мужской род (der) меняется на den в винительном падеже.', en: 'Only masculine (der) changes to den in accusative case.', ar: 'فقط المذكر (der) يتغير إلى den في حالة النصب.' },
    { frequency: 4 }
  ))
  .build();
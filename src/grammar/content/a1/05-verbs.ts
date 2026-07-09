import { TopicBuilder, rule, example, mistake } from '../builders';

export const VERBS = new TopicBuilder('a1-verbs')
  .level('A1').category('verbs').order(5)
  .title({
    ru: 'Глаголы: Правильные, Неправильные и Модальные',
    en: 'Verbs: Regular, Irregular, and Modal',
    de: 'Verben: Regelmäßig, Unregelmäßig und Modal',
    ar: 'الأفعال: المنتظمة، غير المنتظمة، والأفعال المساعدة'
  })
  .description({
    ru: 'Спряжение глаголов в настоящем времени, сильные глаголы и модальные конструкции.',
    en: 'Conjugation of verbs in present tense, strong verbs, and modal constructions.',
    ar: 'تصريف الأفعال في الزمن الحاضر، الأفعال القوية، وتراكيب الأفعال المساعدة.'
  })
  .addRule(rule('regular-verbs',
    { ru: 'Правильные глаголы', en: 'Regular verbs', ar: 'الأفعال المنتظمة' },
    { ru: 'Основа + окончания: -e, -st, -t, -en, -t, -en. Пример: machen -> ich mache, du machst.', en: 'Stem + endings: -e, -st, -t, -en, -t, -en. Ex: machen -> ich mache, du machst.', ar: 'الجذر + النهايات: -e, -st, -t, -en, -t, -en. مثال: machen -> ich mache, du machst.' },
    { formula: 'kommen: ich komme, du kommst, er kommt...' }
  ))
  .addRule(rule('modal-verbs',
    { ru: 'Модальные глаголы', en: 'Modal verbs', ar: 'الأفعال المساعدة' },
    { ru: 'können (мочь), müssen (быть должным), wollen (хотеть), dürfen (разрешено), sollen (следует). Местоимения du/er/sie/es не имеют окончания -st/-t.', en: 'können (can), müssen (must), wollen (want), dürfen (allowed), sollen (should). du/er/sie/es have no ending.', ar: 'können (يستطيع), müssen (يجب), wollen (يريد), dürfen (مسموح), sollen (ينبغي). du/er/sie/es ليس لها نهاية.' },
    { formula: 'Ich kann schwimmen. Du musst lernen.' }
  ))
  .addExample(example('arbeiten', { ru: 'работать', en: 'to work', ar: 'يعمل' }))
  .addExample(example('dürfen', { ru: 'иметь разрешение', en: 'to be allowed', ar: 'يُسمح له' }))
  .addMistake(mistake(
    { ru: 'добавлять окончание к модальному глаголу в 3 лице', en: 'adding ending to modal verb in 3rd person', ar: 'إضافة نهاية للفعل المساعد في الشخص الثالث' },
    { ru: 'Неправильно: er kannst. Правильно: er kann.', en: 'Wrong: er kannst. Correct: er kann.', ar: 'خطأ: er kannst. صحيح: er kann.' },
    { ru: 'Модальные глаголы в единственном числе не имеют личных окончаний.', en: 'Modal verbs in singular have no personal endings.', ar: 'الأفعال المساعدة في المفرد ليس لها نهايات شخصية.' },
    { frequency: 5 }
  ))
  .build();
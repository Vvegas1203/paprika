import { TaskCollectionBuilder, task } from '../../builders';

export const PHONETICS_TASKS = new TaskCollectionBuilder('a1-phonetics-tasks')
  .level('A1').category('phonetics').order(1)
  .title({
    ru: 'Задания: Алфавит и произношение',
    en: 'Tasks: Alphabet & Pronunciation',
    ar: 'تمارين: الأبجدية والنطق'
  })
  .description({
    ru: 'Практика чтения умлаутов, дифтонгов и сложных согласных.',
    en: 'Practice reading umlauts, diphthongs, and complex consonants.',
    ar: 'ممارسة قراءة الأوملوت، الدفتونغات، والحروف الساكنة المعقدة.'
  })
  .addTask(task('letter-sound-match',
    { ru: 'Соотнесите букву и звук', en: 'Match letter and sound', ar: 'طابق الحرف والصوت' },
    { ru: 'Как читается выделенная буква в немецком языке?', en: 'How is the highlighted letter read in German?', ar: 'كيف يُنطق الحرف المميز في الألمانية؟' },
    [
      { question: 'Как читается "v" в слове Vater?', options: ['[в]', '[ф]', '[з]'], correct: '[ф]', explanation: { ru: 'В исконно немецких словах v читается как [ф].', en: 'In native German words, v is read as [f].', ar: 'في الكلمات الألمانية الأصيلة، v تُنطق [ف].' } },
      { question: 'Как читается "w" в слове Wasser?', options: ['[у]', '[в]', '[ф]'], correct: '[в]', explanation: { ru: 'Немецкое w всегда читается как звонкое [в].', en: 'German w is always read as voiced [v].', ar: 'الـ w الألمانية تُنطق دائمًا كـ [و] مجهورة.' } },
      { question: 'Как читается "z" в слове Zoo?', options: ['[з]', '[ц]', '[с]'], correct: '[ц]', explanation: { ru: 'Буква z в немецком всегда читается как [ц].', en: 'The letter z in German is always read as [ts].', ar: 'الحرف z في الألمانية يُنطق دائمًا [و].' } },
    ]
  ))
  .addTask(task('umlaut-pronunciation',
    { ru: 'Выберите правильное произношение умлаута', en: 'Choose correct umlaut pronunciation', ar: 'اختر النطق الصحيح للأوملوت' },
    { ru: 'Определите, как звучат ä, ö, ü.', en: 'Determine how ä, ö, ü sound.', ar: 'حدد كيف تُنطق ä, ö, ü.' },
    [
      { question: 'Käse (сыр)', options: ['[казэ]', '[кэ:зэ]', '[ки:зэ]'], correct: '[кэ:зэ]', hint: { ru: 'ä похоже на русское [э].', en: 'ä is similar to [e].', ar: 'ä مشابهة لل[إ].' } },
      { question: 'schön (красивый)', options: ['[шон]', '[шён]', '[шун]'], correct: '[шён]', hint: { ru: 'ö — это как [э], но с округленными губами.', en: 'ö is like [e] but with rounded lips.', ar: 'ö مثل [إ] لكن مع شفاه مستديرة.' } },
    ]
  ))
  .addTask(task('diphthong-identification',
    { ru: 'Распознайте дифтонг', en: 'Identify the diphthong', ar: 'تعرف على الدفتونغ' },
    { ru: 'Какое сочетание букв дает звук [ай]?', en: 'Which letter combination gives the sound [ai]?', ar: 'أي تركيبة حروف تعطي الصوت [اي]؟' },
    [
      { question: 'mein (мой)', options: ['ie', 'ei', 'eu'], correct: 'ei', explanation: { ru: 'Сочетание ei всегда читается как [ай].', en: 'The combination ei is always read as [ai].', ar: 'التركيب ei يُنطق دائمًا [اي].' } },
      { question: 'neu (новый)', options: ['au', 'eu', 'äu'], correct: 'eu', explanation: { ru: 'eu и äu читаются одинаково — как [ой].', en: 'eu and äu are read the same — as [oi].', ar: 'eu و äu تُنطقان بنفس الطريقة — [واي].' } },
    ]
  ))
  .addTask(task('eszett-rule',
    { ru: 'ß или ss?', en: 'ß or ss?', ar: 'ß أم ss؟' },
    { ru: 'Выберите правильное написание после гласной.', en: 'Choose the correct spelling after the vowel.', ar: 'اختر الكتابة الصحيحة بعد حرف العلة.' },
    [
      { question: 'gro_ (большой)', options: ['ss', 'ß'], correct: 'ß', explanation: { ru: 'После долгих гласных пишется ß.', en: 'ß is written after long vowels.', ar: 'يُكتب ß بعد حروف العلة الطويلة.' } },
      { question: 'Ku_ (поцелуй)', options: ['ss', 'ß'], correct: 'ss', explanation: { ru: 'После кратких гласных пишется ss.', en: 'ss is written after short vowels.', ar: 'يُكتب ss بعد حروف العلة القصيرة.' } },
    ]
  ))
  .build();
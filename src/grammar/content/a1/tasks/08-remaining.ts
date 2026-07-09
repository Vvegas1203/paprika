import { TaskCollectionBuilder, task } from '../../builders';

export const ADVERBS_TASKS = new TaskCollectionBuilder('a1-adverbs-tasks')
  .level('A1').category('adverbs').order(10)
  .title({ ru: 'Задания: Наречия и TeKaMoLo', en: 'Tasks: Adverbs and TeKaMoLo', ar: 'تمارين: الظروف' })
  .addTask(task('tekamolo-order',
    { ru: 'Расставьте обстоятельства по порядку', en: 'Order the adverbials', ar: 'رتب الظروف' },
    { ru: 'Используйте правило TeKaMoLo.', en: 'Use the TeKaMoLo rule.', ar: 'استخدم قاعدة TeKaMoLo.' },
    [
      { parts: ['mit dem Bus', 'morgen', 'nach Berlin'], correct: 'morgen mit dem Bus nach Berlin', question: '' },
    ]
  ))
  .build();

export const NUMBERS_TIME_TASKS = new TaskCollectionBuilder('a1-numbers-time-tasks')
  .level('A1').category('numbers').order(12)
  .title({ ru: 'Задания: Числа и Время', en: 'Tasks: Numbers and Time', ar: 'تمارين: الأرقام والوقت' })
  .addTask(task('time-writing',
    { ru: 'Напишите время словами', en: 'Write time in words', ar: 'اكتب الوقت بالكلمات' },
    { ru: 'Преобразуйте цифровой формат в текстовый.', en: 'Convert digital format to text.', ar: 'حول التنسيق الرقمي إلى نص.' },
    [
      { question: '14:15', answer: 'Viertel nach zwei', hint: { ru: 'Используйте 12-часовой формат.', en: 'Use 12-hour format.', ar: 'استخدم نظام 12 ساعة.' } },
      { question: '18:30', answer: 'halb sieben', hint: { ru: 'В немецком "половина" относится к следующему часу.', en: 'In German "half" refers to the next hour.', ar: 'في الألمانية "النصف" يشير للساعة التالية.' } },
    ]
  ))
  .build();

export const CONJUNCTIONS_TASKS = new TaskCollectionBuilder('a1-conjunctions-tasks')
  .level('A1').category('conjunctions').order(15)
  .title({ ru: 'Задания: Союзы и порядок слов', en: 'Tasks: Conjunctions and Word Order', ar: 'تمارين: أدوات الربط' })
  .addTask(task('word-order-puzzle',
    { ru: 'Поставьте глагол на место', en: 'Place the verb correctly', ar: 'ضع الفعل في المكان الصحيح' },
    { ru: 'Где должен стоять глагол?', en: 'Where should the verb be?', ar: 'أين يجب أن يكون الفعل؟' },
    [
      { question: 'Ich lerne Deutsch, weil ich in Berlin ___.', options: ['wohne', 'bin', 'habe'], correct: 'wohne', explanation: { ru: 'weil отправляет глагол в конец.', en: 'weil sends verb to end.', ar: 'weil ترسل الفعل للنهاية.' } },
      { question: 'Ich bin müde, aber ich ___ nicht.', options: ['schlafe', 'schlafen', 'geschlafen'], correct: 'schlafe', explanation: { ru: 'aber не меняет порядок (позиция 0).', en: 'aber does not change order.', ar: 'aber لا يغير الترتيب.' } },
    ]
  ))
  .build();

export const IMPERATIVE_TASKS = new TaskCollectionBuilder('a1-imperative-tasks')
  .level('A1').category('imperative').order(14)
  .title({ ru: 'Задания: Повелительное наклонение', en: 'Tasks: Imperative Mood', ar: 'تمارين: صيغة الأمر' })
  .addTask(task('imperative-form',
    { ru: 'Образуйте повелительное наклонение', en: 'Form the imperative', ar: 'صغ صيغة الأمر' },
    { ru: 'Напишите команду для "du".', en: 'Write the command for "du".', ar: 'اكتب الأمر لـ "du".' },
    [
      { question: 'machen (du)', answer: 'Mach!' },
      { question: 'sein (du)', answer: 'Sei!' },
      { question: 'fahren (du)', answer: 'Fahr!' },
    ]
  ))
  .build();

export const QUESTION_WORDS_TASKS = new TaskCollectionBuilder('a1-question-words-tasks')
  .level('A1').category('questions').order(16)
  .title({ ru: 'Задания: Вопросительные слова', en: 'Tasks: Question Words', ar: 'تمارين: كلمات الاستفهام' })
  .addTask(task('w-word-match',
    { ru: 'Подберите вопросительное слово', en: 'Match the question word', ar: 'طابق كلمة الاستفهام' },
    { ru: 'Какое слово подходит к ответу?', en: 'Which word fits the answer?', ar: 'أي كلمة تناسب الإجابة؟' },
    [
      { question: '___ kommst du? — Aus Russland.', options: ['Woher', 'Wohin', 'Wo'], correct: 'Woher' },
      { question: '___ ist das? — Das ist mein Bruder.', options: ['Wer', 'Was', 'Wie'], correct: 'Wer' },
      { question: '___ machst du? — Ich arbeite.', options: ['Was', 'Wer', 'Wo'], correct: 'Was' },
    ]
  ))
  .build();

export const COMMON_PATTERNS_TASKS = new TaskCollectionBuilder('a1-common-patterns-tasks')
  .level('A1').category('patterns').order(17)
  .title({ ru: 'Задания: Речевые паттерны', en: 'Tasks: Speech Patterns', ar: 'تمارين: عبارات الكلام' })
  .addTask(task('introduction-fill',
    { ru: 'Заполните пропуски в представлении', en: 'Fill in the introduction', ar: 'أكمل التعارف' },
    { ru: 'Используйте правильные предлоги и глаголы.', en: 'Use correct prepositions and verbs.', ar: 'استخدم حروف الجر والأفعال الصحيحة.' },
    [
      { question: 'Ich ___ aus Deutschland.', answer: 'komme' },
      { question: 'Ich ___ in Moskau.', answer: 'wohne' },
      { question: 'Ich ___ Anna.', answer: 'heiße' },
    ]
  ))
  .build();

export const TIME_EXPRESSIONS_TASKS = new TaskCollectionBuilder('a1-time-expressions-tasks')
  .level('A1').category('time').order(18)
  .title({ ru: 'Задания: Выражения времени', en: 'Tasks: Time Expressions', ar: 'تمارين: تعابير الوقت' })
  .addTask(task('sequence-order',
    { ru: 'Расставьте события по порядку', en: 'Order the events', ar: 'رتب الأحداث' },
    { ru: 'zuerst -> dann -> danach.', en: 'first -> then -> after that.', ar: 'أولاً -> ثم -> بعد ذلك.' },
    [
      { words: ['aufstehe', 'ich', 'zuerst'], correct: 'Zuerst stehe ich auf.', question: '' },
      { words: ['dann', 'frühstücke', 'ich'], correct: 'Dann frühstücke ich.', question: '' },
    ]
  ))
  .build();

export const INFINITIVE_CONSTRUCTIONS_TASKS = new TaskCollectionBuilder('a1-infinitive-constructions-tasks')
  .level('A1').category('infinitive').order(19)
  .title({ ru: 'Задания: Инфинитив с Zu', en: 'Tasks: Infinitive with Zu', ar: 'تمارين: المصدر مع Zu' })
  .addTask(task('zu-placement',
    { ru: 'Вставьте "zu" в правильное место', en: 'Place "zu" correctly', ar: 'ضع "zu" في المكان الصحيح' },
    { ru: 'Соберите предложение с инфинитивом.', en: 'Build the sentence with infinitive.', ar: 'كون الجملة مع المصدر.' },
    [
      { words: ['Ich', 'versuche', 'Deutsch', 'lernen', 'zu'], correct: 'Ich versuche, Deutsch zu lernen.', question: '' },
      { words: ['Er', 'vergessen', 'hat', 'einzukaufen', 'zu'], correct: 'Er hat vergessen, einzukaufen.', question: '' },
    ]
  ))
  .build();

export const EVERYDAY_GRAMMAR_TASKS = new TaskCollectionBuilder('a1-everyday-grammar-tasks')
  .level('A1').category('everyday').order(20)
  .title({ ru: 'Задания: Бытовые ситуации', en: 'Tasks: Everyday Situations', ar: 'تمارين: المواقف اليومية' })
  .addTask(task('scenario-response',
    { ru: 'Выберите правильную реакцию', en: 'Choose the correct response', ar: 'اختر الرد الصحيح' },
    { ru: 'Что сказать в этой ситуации?', en: 'What to say in this situation?', ar: 'ماذا تقول في هذا الموقف؟' },
    [
      { scenario: 'В ресторане вы хотите счет.', options: ['Die Rechnung, bitte.', 'Ich habe Hunger.', 'Wo ist die Toilette?'], correct: 'Die Rechnung, bitte.' },
      { scenario: 'Вы хотите купить хлеб.', options: ['Ich hätte gern ein Brot.', 'Ich bin ein Brot.', 'Das Brot ist gut.'], correct: 'Ich hätte gern ein Brot.' },
    ]
  ))
  .build();

export const COMMON_CONSTRUCTIONS_TASKS = new TaskCollectionBuilder('a1-common-constructions-tasks')
  .level('A1').category('constructions').order(21)
  .title({ ru: 'Задания: Устойчивые выражения', en: 'Tasks: Fixed Expressions', ar: 'تمارين: عبارات ثابتة' })
  .addTask(task('haben-vs-sein-choice',
    { ru: 'Haben или Sein?', en: 'Haben or Sein?', ar: 'Haben أم Sein؟' },
    { ru: 'Выберите правильный глагол для выражения.', en: 'Choose the correct verb for the expression.', ar: 'اختر الفعل الصحيح للعبارة.' },
    [
      { question: 'Ich ___ Hunger.', options: ['habe', 'bin'], correct: 'habe' },
      { question: 'Mir ___ kalt.', options: ['ist', 'habe'], correct: 'ist' },
      { question: 'Es ___ einen Park.', options: ['gibt', 'hat'], correct: 'gibt' },
    ]
  ))
  .build();
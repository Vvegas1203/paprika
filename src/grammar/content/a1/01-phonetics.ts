// ============================================
// src/grammar/content/a1/01-phonetics.ts
// ============================================
import { TopicBuilder, rule, example, mistake } from '../builders';

export const PHONETICS = new TopicBuilder('a1-phonetics')
  .level('A1').category('phonetics').order(1)
  .title({ 
    ru: 'Алфавит и произношение', 
    en: 'Alphabet & Pronunciation', 
    de: 'Alphabet und Aussprache',
    ar: 'الأبجدية والنطق'
  })
  .description({ 
    ru: 'Немецкий алфавит, умлауты, ß, дифтонги, правила чтения.', 
    en: 'German alphabet, umlauts, ß, diphthongs, reading rules.',
    ar: 'الأبجدية الألمانية، الأوملوت، ß، الدفتونغات، قواعد القراءة.'
  })
  .intro({
    ru: 'Немецкий алфавит содержит 26 латинских букв + 3 умлаута (ä, ö, ü) + лигатуру ß. Правильное произношение — фундамент понимания.',
    en: 'The German alphabet has 26 Latin letters + 3 umlauts + ß. Correct pronunciation is the foundation of comprehension.',
    ar: 'الأبجدية الألمانية تحتوي على 26 حرفًا لاتينيًا + 3 أوملوت (ä, ö, ü) + حرف ß. التننيح الصحيح هو أساس الفهم.'
  })
  .addRule(rule('alphabet-basics',
    { ru: 'Основной алфавит', en: 'Basic alphabet', ar: 'الأبجدية الأساسية' },
    { ru: 'Большинство букв читаются похоже на русские. Исключения: v = [ф], w = [в], z = [ц], j = [й], s перед гласной = [з], q только в сочетании qu = [кв].', en: 'Most letters read like Russian. Exceptions: v = [f], w = [v], z = [ts], j = [j], s before vowel = [z], q only in qu = [kv].', ar: 'معظم الحروف تُنطق مثل الحروف الروسية. الاستثناءات: v = [ف], w = [و], z = [و], j = [ج], s قبل حرف متصل = [ز].' },
    { formula: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z + ä ö ü ß', tags: ['alphabet'] }
  ))
  .addRule(rule('umlauts',
    { ru: 'Умлауты ä, ö, ü', en: 'Umlauts ä, ö, ü', ar: 'الأوملوت ä, ö, ü' },
    { ru: 'ä ≈ русскому [э] (Käse [кэ:зэ]); ö — округлите губы для [о], но скажите [э] (schön [шё:н]); ü — губы для [у], звук [и] (über [ю:ба]).', en: 'ä ≈ Russian [э] (Käse). ö — round lips for [o], but say [э] (schön). ü — lips for [u], but sound [и] (über).', ar: 'ä ≈ الروسية [ه], ö — لاف حواجب لل[و] لكن تنطق [ه] (schön). ü — الشفاه لل[و] لكن الصوت [ي].' },
    { mnemonic: { ru: 'ä≈я, ö≈ё, ü≈ю — похоже на русские звуки!', en: 'Think "fronted" vowels.', ar: 'تخيل "حروف المتحدثة" الأمامية.' } }
  ))
  .addRule(rule('eszett',
    { ru: 'Буква ß (эсцет)', en: 'Letter ß (eszett)', ar: 'الحرف ß (إيستset)' },
    { ru: 'Читается как [с]. Пишется после долгих гласных и дифтонгов: Straße, groß, heißen. После кратких гласных пишется ss: Kuss, Fluss. В Швейцарии ß не используется вообще.', en: 'Read as [s]. Written after long vowels/diphthongs: Straße, groß, heißen. After short vowels: ss: Kuss, Fluss. Switzerland doesn\'t use ß at all.', ar: 'يُنطق [س]. يكتب بعد الحروف المتحدثة: Straße, groß. بعد الحروف القصيرة: ss.' }
  ))
  .addRule(rule('vowel-length',
    { ru: 'Долгие и краткие гласные', en: 'Long and short vowels', ar: 'الحروف المتحدثة والقصيرة' },
    { ru: 'Долгота меняет смысл: Staat [шта:т] (государство) ≠ Stadt [штат] (город). Маркеры долгого звука: удвоение (aa, ee), h после гласной (ihn, Sohn), ß после гласной. Краткий звук — перед удвоенной или группой согласных.', en: 'Length changes meaning: Staat [state] ≠ Stadt [city]. Long markers: vowel doubling, h after vowel, ß after vowel.', ar: 'الطول يغيّر المعنى. علامات الحرف الطويل: التكرار، h بعد حرف متصل.' }
  ))
  .addRule(rule('diphthongs',
    { ru: 'Дифтонги', en: 'Diphthongs', ar: 'الدفتونغات' },
    { ru: 'ei = [ай] (mein, drei); ie = долгое [и:] (Liebe, nie); eu / äu = [ой] (neu, Häuser); au = [ау] (Haus, Maus).', en: 'ei = [ai] (mein), ie = long [i:] (Liebe), eu/äu = [oi] (neu), au = [au] (Haus).', ar: 'ei = [اي] (mein), ie = [إي] الطويل (Liebe), eu/äu = [واي] (neu).' },
    { formula: 'ei→[ай], ie→[и:], eu/äu→[ой], au→[ау]' }
  ))
  .addRule(rule('consonant-combos',
    { ru: 'Сочетания согласных', en: 'Consonant combinations', ar: 'التراكيب الساكنة' },
    { ru: 'ch после a/o/u/au = [х] (Bach, Buch); ch после i/e/ä/ö/ü/согл. = мягкое [хь] (ich, Milch); sch = [ш]; sp-/st- в начале слова = [шп]/[шт] (Spiel, Student); ng = [нг] (singen); tsch = [ч] (Deutsch); -ig в конце = [ихь] (wichtig).', en: 'ch after a/o/u/au = [h] (Bach), after i/e = soft [h] (ich, Milch); sch = [sh]; sp-/st- at start = [shp]/[sht].', ar: 'ch بعد a/o/u/au = [و], sch = [ش], sp-/st- في البداية = [ш]' }
  ))
  .addRule(rule('stress',
    { ru: 'Ударение', en: 'Stress', ar: 'الوقف' },
    { ru: 'Обычно на первом слоге корня. Безударные приставки: be-, ge-, er-, ver-, zer-, ent-, emp-, miss-. Ударные (отделяемые): ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-. В заимствованиях — по языку-источнику (Student, Musik).', en: 'Usually on first root syllable. Unstressed prefixes: be-, ge-, er-, ver-; stressed: ab-, an-, auf-, aus-; loans keep source language stress.', ar: 'عادةً على السطر الأول من الجذر. البدائيات غير المaccented: be-, ge-; المaccented: ab-, an-.' }
  ))
  .addExample(example('Käse', { ru: 'сыр', en: 'cheese', ar: 'جبن' }, { ipa: '[ˈkɛːzə]' }))
  .addExample(example('schön', { ru: 'красивый', en: 'beautiful', ar: 'جميل' }, { ipa: '[ʃøːn]' }))
  .addExample(example('über', { ru: 'над, через', en: 'over', ar: 'فوق' }, { ipa: '[yːbɐ]' }))
  .addExample(example('Straße', { ru: 'улица', en: 'street', ar: 'شارع' }, { ipa: '[ʃtʁaːsə]' }))
  .addExample(example('ich / Buch', { ru: 'я / книга', en: 'I / book', ar: 'أنا / كتاب' }, { ipa: '[ɪç] / [buːx]' }))
  .addExample(example('Schule / Student', { ru: 'школа / студент', en: 'school / student', ar: 'مدرسة / طالب' }, { literal: { ru: '[ʃuːlə] / [ʃtudənt]', en: '[ʃuːlə] / [ʃtudənt]', ar: '[ʃuːlə] / [ʃtudənt]' } }))
  .addMistake(mistake(
    { ru: 'читать w как английское [w]', en: 'read w as English [w]', ar: 'قراءة w كـ [w] الإنجليزي' },
    { ru: 'w = [в]: Wasser [васэ]', en: 'w = [v]: Wasser', ar: 'w = [و]: Wasser' },
    { ru: 'Немецкое w всегда звонкое [в], а не английское [у].', en: 'German w is always [v], not English [w].', ar: 'الw الألماني هو دائمًا [و] لا الحرف الإنجليزي.' },
    { frequency: 4 }
  ))
  .addMistake(mistake(
    { ru: 'читать v как [в]', en: 'read v as [v]', ar: 'قراءة v كـ [و]' },
    { ru: 'v = [ф] в немецких словах: Vater [фатэ]', en: 'v = [f] in German words: Vater [fater]', ar: 'v = [ف] في الكلمات الألمانية: Vater' },
    { ru: 'v читается как [ф] в исконно немецких словах, но [в] в заимствованиях (Vase [ва:зэ]).', en: 'v = [f] in native German words (Vater), but [v] in loans (Vase).', ar: 'v = [ف] في الكلمات الألمانية الأصيلة، لكن [و] في الكلمات المنقولة.' },
    { frequency: 5 }
  ))
  .addMistake(mistake(
    { ru: 'читать z как [з]', en: 'read z as [z]', ar: 'قراءة z كـ [ز]' },
    { ru: 'z всегда = [ц]: Zeitung [цайтунг], Zoo [цо:]', en: 'z always = [ts]: Zeitung [tsaitung], Zoo [tso:]', ar: 'z دائمًا = [و]: Zeitung' },
    { ru: 'Одна из самых частых ошибок новичков.', en: 'One of the most common beginner mistakes.', ar: 'أحد الأخطاء الشائعة للمبتدئين.' },
    { frequency: 5 }
  ))
  .addMistake(mistake(
    { ru: 'игнорировать долготу', en: 'ignore vowel length', ar: 'تجاهل طول الحرف' },
    { ru: 'Stadt (город) ≠ Staat (государство)', en: 'Stadt (city) ≠ Staat (state)', ar: 'Stadt (مدينة) ≠ Staat (دولة)' },
    { ru: 'Различие только в долготе гласной, но смысл совершенно разный.', en: 'Only vowel length differs, but meaning is completely different.', ar: 'الاختلاف فقط في طول الحرف، لكن المعنى مختلف تمامًا.' },
    { frequency: 3 }
  ))
  .build();
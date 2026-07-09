import { TopicBuilder, rule } from '../builders';

export const COMMON_PATTERNS = new TopicBuilder('a1-common-patterns')
  .level('A1').category('everyday').order(16)
  .title({
    ru: 'Типовые речевые паттерны',
    en: 'Common Speech Patterns',
    de: 'Redemittel',
    ar: 'عبارات شائعة'
  })
  .description({
    ru: 'Представление, профессия, хобби и предпочтения.',
    en: 'Introductions, profession, hobbies, and preferences.',
    ar: 'التعارف، المهنة، الهوايات، والتفضيلات.'
  })
  .addRule(rule('introduction',
    { ru: 'Представление', en: 'Introduction', ar: 'التعارف' },
    { ru: 'Ich heiße... / Ich komme aus... / Ich wohne in...', en: 'My name is... / I come from... / I live in...', ar: 'اسمي... / أنا من... / أعيش في...' },
    { formula: 'Ich heiße Anna und ich komme aus Russland.' }
  ))
  .addRule(rule('likes',
    { ru: 'Нравится / Не нравится', en: 'Likes / Dislikes', ar: 'الإعجاب / عدم الإعجاب' },
    { ru: 'Ich mag... / Ich mag ... nicht. / Ich interessiere mich für...', en: 'I like... / I don\'t like... / I am interested in...', ar: 'أحب... / لا أحب... / أنا مهتم بـ...' },
    { formula: 'Ich mag Musik, aber ich mag keinen Sport.' }
  ))
  .build();
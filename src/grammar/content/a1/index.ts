import type { GrammarTopic } from '../topic.types';

import { PHONETICS } from './01-phonetics';
import { NOUNS } from './02-nouns';
import { CASES } from './03-cases';
import { PRONOUNS } from './04-pronouns';
import { VERBS } from './05-verbs';
import { TENSES } from './06-tenses';
import { SENTENCE_STRUCTURE } from './07-sentence-structure';
import { NEGATION } from './08-negation';
import { PREPOSITIONS } from './09-prepositions';
import { ADVERBS } from './10-adverbs';
import { NUMBERS_TIME } from './11-numbers-time';
import { CONJUNCTIONS } from './12-conjunctions';
import { ADJECTIVES } from './13-adjectives';
import { IMPERATIVE } from './14-imperative';
import { QUESTION_WORDS } from './15-question-words';
import { COMMON_PATTERNS } from './16-common-patterns';
import { TIME_EXPRESSIONS } from './17-time-expressions';
import { INFINITIVE_CONSTRUCTIONS } from './18-infinitive-constructions';
import { EVERYDAY_GRAMMAR } from './19-everyday-grammar';

/**
 * Полный список тем уровня A1 в порядке изучения.
 * Сортировка по полю `order` каждой темы.
 */
export const A1_TOPICS: GrammarTopic[] = [
  PHONETICS,
  NOUNS,
  CASES,
  PRONOUNS,
  VERBS,
  TENSES,
  SENTENCE_STRUCTURE,
  NEGATION,
  PREPOSITIONS,
  ADVERBS,
  NUMBERS_TIME,
  CONJUNCTIONS,
  ADJECTIVES,
  IMPERATIVE,
  QUESTION_WORDS,
  COMMON_PATTERNS,
  TIME_EXPRESSIONS,
  INFINITIVE_CONSTRUCTIONS,
  EVERYDAY_GRAMMAR,
].sort((a, b) => a.order - b.order) as GrammarTopic[];
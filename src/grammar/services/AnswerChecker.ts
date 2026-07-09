// src/grammar/services/AnswerChecker.ts
import type { Exercise } from '../content/exercise.types';

export interface CheckResult {
  correct: boolean;
  expected: unknown;
  normalized: unknown;
  details?: string;
}

/**
 * Нормализует и проверяет ответы пользователя.
 * Учитывает регистр, пробелы, пунктуацию в зависимости от типа упражнения.
 */
export class AnswerChecker {
  check(exercise: Exercise, userAnswer: unknown): CheckResult {
    switch (exercise.kind) {
      case 'choice': {
        const idx = typeof userAnswer === 'number' ? userAnswer : Number(userAnswer);
        const expected = exercise.correct;
        const correct = Array.isArray(expected)
          ? expected.includes(idx)
          : expected === idx;
        return { correct, expected, normalized: idx };
      }

      case 'fill': {
        const ans = this.normalize(String(userAnswer ?? ''), exercise.caseSensitive);
        const expected = exercise.answers?.[0];
        const alternatives: string[] = exercise.alternatives?.flat() ?? [];
        const pool = [expected, ...(exercise.answers ?? []), ...alternatives]
          .map((s) => this.normalize(String(s), exercise.caseSensitive));
        return {
          correct: pool.includes(ans),
          expected,
          normalized: ans,
        };
      }

      case 'match': {
        const pairs = Array.isArray(userAnswer) ? userAnswer : [];
        const expected: [number, number][] = exercise.pairs;
        const correct = pairs.length === expected.length
          && expected.every(([a, b]) =>
            pairs.some(([pa, pb]: [number, number]) => pa === a && pb === b)
          );
        return { correct, expected, normalized: pairs };
      }

      case 'transform':
      case 'translate':
      case 'conjugate':
      case 'decline': {
        const ans = this.normalize(String(userAnswer ?? ''));
        const expected = (exercise as any).answer;
        const alternatives: string[] = (exercise as any).alternatives ?? [];
        const pool = [expected, ...alternatives].map((s) => this.normalize(String(s)));
        return {
          correct: pool.includes(ans),
          expected,
          normalized: ans,
        };
      }

      case 'spot-error': {
        const pos = Number(userAnswer);
        return {
          correct: pos === exercise.errorPosition,
          expected: exercise.errorPosition,
          normalized: pos,
        };
      }

      case 'order-words': {
        const order = Array.isArray(userAnswer) ? userAnswer : [];
        const expected = exercise.correctOrder;
        const correct = JSON.stringify(order) === JSON.stringify(expected);
        return { correct, expected, normalized: order };
      }

      default:
        return { correct: false, expected: null, normalized: userAnswer };
    }
  }

  private normalize(s: string, caseSensitive = false): string {
    let r = s.trim().replace(/\s+/g, ' ');
    if (!caseSensitive) r = r.toLowerCase();
    return r;
  }
}
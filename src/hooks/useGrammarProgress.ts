import { useState, useCallback } from 'react';
import { UserGrammarProgress, TopicGrammarProgress, GrammarLesson, GrammarTopic } from '../utils/grammarTypes';

const GRAMMAR_PROGRESS_KEY = 'grammarProgress';
const TOPIC_PROGRESS_KEY = 'topicGrammarProgress';

function loadGrammarProgress(): Record<string, UserGrammarProgress> {
  try {
    const raw = localStorage.getItem(GRAMMAR_PROGRESS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function loadTopicGrammarProgress(): Record<string, TopicGrammarProgress> {
  try {
    const raw = localStorage.getItem(TOPIC_PROGRESS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveGrammarProgress(progress: Record<string, UserGrammarProgress>) {
  localStorage.setItem(GRAMMAR_PROGRESS_KEY, JSON.stringify(progress));
}

function saveTopicGrammarProgress(progress: Record<string, TopicGrammarProgress>) {
  localStorage.setItem(TOPIC_PROGRESS_KEY, JSON.stringify(progress));
}

function getTodayDate(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

export function useGrammarProgress() {
  const [lessonProgress, setLessonProgress] = useState<Record<string, UserGrammarProgress>>(loadGrammarProgress);
  const [topicProgress, setTopicProgress] = useState<Record<string, TopicGrammarProgress>>(loadTopicGrammarProgress);

  // Record lesson completion
  const recordLessonComplete = useCallback((lessonId: string) => {
    setLessonProgress((prev) => {
      const next = {
        ...prev,
        [lessonId]: {
          lessonId,
          completed: true,
          mastery: 100,
          mistakes: prev[lessonId]?.mistakes ?? 0,
          lastReview: getTodayDate(),
          completedAt: getTodayDate()
        }
      };
      saveGrammarProgress(next);
      return next;
    });
  }, []);

  // Record exercise completion for topic progress tracking
  const recordExerciseComplete = useCallback((topicId: string, correct: boolean) => {
    setTopicProgress((prev) => {
      const existing = prev[topicId] ?? {
        topicId,
        completion: 0,
        mastery: 0,
        stars: 0,
        xpEarned: 0,
        mistakesCount: 0
      };
      const updatedMistakes = correct ? existing.mistakesCount : existing.mistakesCount + 1;
      const mastery = correct ? Math.min(100, existing.mastery + 10) : Math.max(0, existing.mastery - 5);
      const xp = correct ? existing.xpEarned + 10 : existing.xpEarned;
      const next = {
        ...prev,
        [topicId]: {
          ...existing,
          mistakesCount: updatedMistakes,
          mastery,
          xpEarned: xp,
          completion: mastery,
          lastReview: getTodayDate()
        }
      };
      saveTopicGrammarProgress(next);
      return next;
    });
  }, []);

  // Record lesson view (for progress tracking)
  const recordLessonView = useCallback((lessonId: string) => {
    setLessonProgress((prev) => {
      const existing = prev[lessonId];
      const next = {
        ...prev,
        [lessonId]: {
          lessonId,
          completed: existing?.completed ?? false,
          mastery: existing?.mastery ?? 0,
          mistakes: existing?.mistakes ?? 0,
          lastReview: getTodayDate()
        }
      };
      saveGrammarProgress(next);
      return next;
    });
  }, []);

  // Record lesson mistake
  const recordLessonMistake = useCallback((lessonId: string) => {
    setLessonProgress((prev) => {
      const existing = prev[lessonId];
      const next = {
        ...prev,
        [lessonId]: {
          lessonId,
          completed: existing?.completed ?? false,
          mastery: Math.max(0, (existing?.mastery ?? 0) - 5),
          mistakes: (existing?.mistakes ?? 0) + 1,
          lastReview: getTodayDate()
        }
      };
      saveGrammarProgress(next);
      return next;
    });
  }, []);

  // Get lesson progress
  const getLessonProgress = useCallback((lessonId: string): UserGrammarProgress | undefined => {
    return lessonProgress[lessonId];
  }, [lessonProgress]);

  // Calculate topic progress from lessons
  const calculateTopicProgress = useCallback((topic: GrammarTopic): TopicGrammarProgress => {
    // This will be calculated based on lesson completions
    const progress = topicProgress[topic.id];
    return progress ?? {
      topicId: topic.id,
      completion: 0,
      mastery: 0,
      stars: 0,
      xpEarned: 0,
      mistakesCount: 0
    };
  }, [topicProgress]);

  // Update topic progress based on lesson progress
  const updateTopicProgress = useCallback((topic: GrammarTopic, lessons: GrammarLesson[]) => {
    const completedLessons = lessons.filter(l => lessonProgress[l.id]?.completed);
    const completion = lessons.length > 0 ? Math.round((completedLessons.length / lessons.length) * 100) : 0;
    const totalXP = completedLessons.length * 10; // 10 XP per lesson
    const totalMistakes = completedLessons.reduce((sum, l) => sum + (lessonProgress[l.id]?.mistakes ?? 0), 0);
    const stars = completion === 100 ? 3 : completion >= 66 ? 2 : completion >= 33 ? 1 : 0;

    setTopicProgress((prev) => {
      const next = {
        ...prev,
        [topic.id]: {
          topicId: topic.id,
          completion,
          mastery: Math.max(...completedLessons.map(l => lessonProgress[l.id]?.mastery ?? 0), 0),
          stars,
          xpEarned: totalXP,
          mistakesCount: totalMistakes,
          lastReview: getTodayDate()
        }
      };
      saveTopicGrammarProgress(next);
      return next;
    });
  }, [lessonProgress]);

  // Get overall grammar progress
  const getOverallGrammarProgress = useCallback((totalLessons: number): { completed: number; total: number; percent: number } => {
    const completed = Object.values(lessonProgress).filter(p => p.completed).length;
    const percent = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
    return { completed, total: totalLessons, percent };
  }, [lessonProgress]);

  return {
    lessonProgress,
    topicProgress,
    recordLessonComplete,
    recordLessonView,
    recordLessonMistake,
    recordExerciseComplete,
    getLessonProgress,
    calculateTopicProgress,
    updateTopicProgress,
    getOverallGrammarProgress
  };
}
import { useState, useCallback, useEffect } from 'react';
import { CardStatus, DailyStats, DayStats, TopicTestProgress } from '../utils/types';

const STORAGE_KEY = 'cardProgress';
const DAILY_STATS_KEY = 'dailyStats';
const TOPIC_TEST_KEY = 'topicTestProgress';

function loadProgress(): Record<number, CardStatus> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveProgress(progress: Record<number, CardStatus>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function loadDailyStats(): DailyStats {
  try {
    const raw = localStorage.getItem(DAILY_STATS_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveDailyStats(stats: DailyStats) {
  localStorage.setItem(DAILY_STATS_KEY, JSON.stringify(stats));
}

function getTodayDate(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function getDateDaysAgo(days: number): string {
  const now = new Date();
  const date = new Date(now);
  date.setDate(date.getDate() - days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function getDateFromDateTime(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function useProgress() {
  const [progress, setProgress] = useState<Record<number, CardStatus>>(loadProgress);
  const [dailyStats, setDailyStats] = useState<DailyStats>(loadDailyStats);
  const [topicTestProgress, setTopicTestProgress] = useState<Record<string, TopicTestProgress>>({});

  // Load topic test progress from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(TOPIC_TEST_KEY);
      if (raw) {
        setTopicTestProgress(JSON.parse(raw));
      }
    } catch {
      // ignore
    }
  }, []);

  // Save topic test progress to localStorage
  const saveTopicTestProgress = useCallback((data: Record<string, TopicTestProgress>) => {
    localStorage.setItem(TOPIC_TEST_KEY, JSON.stringify(data));
    setTopicTestProgress(data);
  }, []);

  // Calculate streak — counts today if any activity present
  const calculateStreak = useCallback((): number => {
    let streak = 0;
    
    for (let i = 0; i < 365; i++) {
      const date = getDateDaysAgo(i);
      const dayStats = dailyStats[date];
      
      // Consider a day "active" if user did anything: blitz, learned words, viewed cards
      const hasActivity = dayStats && (
        (dayStats.blitzCompleted ?? 0) > 0 ||
        (dayStats.wordsLearned ?? 0) > 0 ||
        (dayStats.cardsViewed ?? 0) > 0 ||
        (dayStats.cardsKnown ?? 0) > 0
      );
      
      if (hasActivity) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  }, [dailyStats]);

  // Get stats for a specific date
  const getDayStats = useCallback((date: string): DayStats | null => {
    return dailyStats[date] ?? null;
  }, [dailyStats]);

  // Get week dates (last 7 days)
  const getWeekDates = useCallback((): string[] => {
    const dates: string[] = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(getDateFromDateTime(date));
    }
    return dates;
  }, []);

  // Get stats for current week
  // A day is "completed" if user reached daily goal (wordsLearned >= 20) OR did a blitz
  const getWeekStats = useCallback((): { completedDays: number; totalDays: number } => {
    const dates = getWeekDates();
    let completedDays = 0;
    
    for (const date of dates) {
      const dayStats = dailyStats[date];
      if (dayStats && ((dayStats.wordsLearned ?? 0) >= 20 || (dayStats.blitzCompleted ?? 0) > 0)) {
        completedDays++;
      }
    }
    
    return { completedDays, totalDays: 7 };
  }, [dailyStats, getWeekDates]);

// Record blitz completion
  const recordBlitzComplete = useCallback((correctCount: number, _totalWords: number) => {
    const today = getTodayDate();
    const existing = dailyStats[today] ?? {
      date: today,
      wordsLearned: 0,
      cardsViewed: 0,
      cardsKnown: 0,
      blitzCompleted: 0
    };
    
    setDailyStats((prev) => {
      const next = {
        ...prev,
        [today]: {
          ...existing,
          blitzCompleted: (existing.blitzCompleted ?? 0) + 1,
          wordsLearned: (existing.wordsLearned ?? 0) + correctCount,
          cardsKnown: (existing.cardsKnown ?? 0) + correctCount
        }
      };
      saveDailyStats(next);
      return next;
    });
  }, [dailyStats]);

  // Record card view + word learned (for daily goal tracking)
  const recordCardView = useCallback(() => {
    const today = getTodayDate();
    const existing = dailyStats[today] ?? {
      date: today,
      wordsLearned: 0,
      cardsViewed: 0,
      cardsKnown: 0,
      blitzCompleted: 0
    };
    
    setDailyStats((prev) => {
      const next = {
        ...prev,
        [today]: {
          ...existing,
          cardsViewed: (existing.cardsViewed ?? 0) + 1
        }
      };
      saveDailyStats(next);
      return next;
    });
  }, [dailyStats]);

  // Record a word learned today (for daily goal counter)
  const recordWordLearned = useCallback(() => {
    const today = getTodayDate();
    const existing = dailyStats[today] ?? {
      date: today,
      wordsLearned: 0,
      cardsViewed: 0,
      cardsKnown: 0,
      blitzCompleted: 0
    };
    
    setDailyStats((prev) => {
      const next = {
        ...prev,
        [today]: {
          ...existing,
          wordsLearned: (existing.wordsLearned ?? 0) + 1,
          cardsKnown: (existing.cardsKnown ?? 0) + 1
        }
      };
      saveDailyStats(next);
      return next;
    });
  }, [dailyStats]);

  // Get today's words learned count
  const getTodayLearned = useCallback((): number => {
    const today = getTodayDate();
    const stats = dailyStats[today];
    return stats ? (stats.wordsLearned ?? 0) : 0;
  }, [dailyStats]);

  const setCardStatus = useCallback((cardId: number, status: CardStatus) => {
    setProgress((prev) => {
      const next = { ...prev };
      if (status === null) {
        delete next[cardId];
      } else {
        next[cardId] = status;
      }
      saveProgress(next);
      return next;
    });
  }, []);

  const getCardStatus = useCallback(
    (cardId: number): CardStatus => {
      return progress[cardId] ?? null;
    },
    [progress]
  );

  const getKnownCount = useCallback(
    (cardIds: number[]): number => {
      return cardIds.filter((id) => progress[id] === 'known').length;
    },
    [progress]
  );

// Get topic test progress for a specific topic
  const getTopicTestProgress = useCallback((topicKey: string): TopicTestProgress => {
    return topicTestProgress[topicKey] ?? {};
  }, [topicTestProgress]);

  // Mark a word as correctly answered in topic test
  const markTopicTestWordCorrect = useCallback((topicKey: string, wordId: number) => {
    setTopicTestProgress((prev) => {
      const next = { ...prev };
      if (!next[topicKey]) next[topicKey] = {};
      next[topicKey][wordId] = {
        correct: true,
        lastAttempt: getTodayDate()
      };
      saveTopicTestProgress(next);
      return next;
    });
  }, [saveTopicTestProgress]);

  // Reset topic test progress (when user wants to retake test)
  const resetTopicTestProgress = useCallback((topicKey: string) => {
    setTopicTestProgress((prev) => {
      const next = { ...prev };
      delete next[topicKey];
      saveTopicTestProgress(next);
      return next;
    });
  }, [saveTopicTestProgress]);

  const isFullyKnown = useCallback(
    (ids: number[]): boolean => {
      return ids.length > 0 && ids.every((id) => progress[id] === 'known');
    },
    [progress]
  );

  return { 
    progress, 
    setCardStatus, 
    getCardStatus, 
    getKnownCount, 
    isFullyKnown,
    dailyStats,
    streak: calculateStreak(),
    getDayStats,
    getWeekStats,
    recordBlitzComplete,
    recordCardView,
    recordWordLearned,
    getTodayLearned,
    getTopicTestProgress,
    markTopicTestWordCorrect,
    resetTopicTestProgress
  };
}

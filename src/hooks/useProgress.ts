import { useState, useCallback } from 'react';
import { CardStatus } from '../utils/types';

const STORAGE_KEY = 'cardProgress';

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

export function useProgress() {
  const [progress, setProgress] = useState<Record<number, CardStatus>>(loadProgress);

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

  const isFullyKnown = useCallback(
    (ids: number[]): boolean => {
      return ids.length > 0 && ids.every((id) => progress[id] === 'known');
    },
    [progress]
  );

  return { progress, setCardStatus, getCardStatus, getKnownCount, isFullyKnown };
}
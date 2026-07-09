// src/hooks/useGrammar.ts
import { useEffect, useState, useCallback } from 'react';
import { GrammarEngine } from '../grammar';
import type { GrammarTopic, Exercise, TopicProgress } from '../grammar';

/**
 * React hook для работы с грамматическим модулем
 */
export function useGrammar(autoInit = true) {
  const [engine] = useState(() => new GrammarEngine({ autoInit: false }));
  const [initialized, setInitialized] = useState(false);
  const [topics, setTopics] = useState<GrammarTopic[]>([]);
  const [overallProgress, setOverallProgress] = useState({
    topicsTotal: 0,
    topicsCompleted: 0,
    topicsStarted: 0,
    averageScore: 0,
    totalAttempts: 0,
    totalCorrect: 0,
    timeSpentMs: 0,
  });

  useEffect(() => {
    if (!autoInit) return;
    
    engine.init().then(() => {
      setInitialized(true);
      setTopics(engine.getTopics({ level: 'A1' }));
      setOverallProgress(engine.getOverallProgress('A1'));
    });
  }, [autoInit]);

  const getTopicById = useCallback((id: string) => {
    return engine.getTopicById(id);
  }, [engine]);

  const getExercises = useCallback((topicId: string) => {
    return engine.getExercises(topicId);
  }, [engine]);

  const checkAnswer = useCallback((exercise: Exercise, answer: unknown) => {
    return engine.checkAnswer(exercise, answer);
  }, [engine]);

  const registerAttempt = useCallback(async (result: Parameters<typeof engine.registerAttempt>[0]) => {
    const progress = await engine.registerAttempt(result);
    setOverallProgress(engine.getOverallProgress('A1'));
    return progress;
  }, [engine]);

  const getNextTopic = useCallback(() => {
    return engine.getNextTopic();
  }, [engine]);

  const getTopicProgress = useCallback((topicId: string): TopicProgress => {
    return engine.getTopicProgress(topicId);
  }, [engine]);

  return {
    engine,
    initialized,
    topics,
    overallProgress,
    getTopicById,
    getExercises,
    checkAnswer,
    registerAttempt,
    getNextTopic,
    getTopicProgress,
  };
}
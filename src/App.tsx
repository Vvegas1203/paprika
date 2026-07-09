import { useState, useEffect, useMemo } from 'react';
import { Word, Screen, BlitzCard } from './utils/types';
import { loadWords, getWordsByTopic, getTopics, getModules } from './utils/csvParser';
import { useProgress } from './hooks/useProgress';
import { useGrammarProgress } from './hooks/useGrammarProgress';
import { useLanguage } from './contexts/LanguageContext';
import MainScreen from './components/MainScreen';
import ModuleList from './components/ModuleList';
import TopicList from './components/TopicList';
import SwipeableCard from './components/SwipeableCard';
import BlitzTest from './components/BlitzTest';
import BlitzResult from './components/BlitzResult';
import TopicResult from './components/TopicResult';
import TestModal from './components/TestModal';
import DayStatsModal from './components/DayStatsModal';
import LanguageSwitcher from './components/LanguageSwitcher';
import GrammarLevelList from './components/GrammarLevelList';
import GrammarTopicList from './components/GrammarTopicList';
import GrammarLesson from './components/GrammarLesson';
import GrammarPractice from './components/GrammarPractice';
import { useGrammar } from './hooks/useGrammar';
import { A1_TASK_COLLECTIONS } from './grammar/content/a1/tasks';
import type { TaskCollection } from './grammar/content/task.types';
import './App.css';

const BLITZ_COUNT = 10;
const DAILY_GOAL = 20;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

export default function App() {
  const { t, dir } = useLanguage();
  const [words, setWords] = useState<Word[]>([]);
  const [screen, setScreen] = useState<Screen>('main');
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  
  const [selectedGrammarLevel, setSelectedGrammarLevel] = useState<string>('A1');
  const [selectedGrammarTopic, setSelectedGrammarTopic] = useState<string>('');
  const [grammarTopics, setGrammarTopics] = useState<any[]>([]);
  const [lessonsByTopic, setLessonsByTopic] = useState<Record<string, any[]>>({});
  
  const [sessionWords, setSessionWords] = useState<Word[]>([]);

  const { 
    progress,
    setCardStatus, 
    getKnownCount, 
    isFullyKnown,
    streak,
    getDayStats,
    getWeekStats,
    recordWordLearned,
    getTodayLearned,
    getTopicTestProgress,
    markTopicTestWordCorrect,
    resetTopicTestProgress
  } = useProgress();

  const { 
    lessonProgress, 
    recordLessonComplete,
  } = useGrammarProgress();

  const [blitzCards, setBlitzCards] = useState<BlitzCard[]>([]);
  const [blitzIndex, setBlitzIndex] = useState(0);
  const [blitzResult, setBlitzResult] = useState<'pending' | 'correct' | 'incorrect'>('pending');
  const [blitzCorrect, setBlitzCorrect] = useState(0);
  const [sessionKnown, setSessionKnown] = useState(0);
  const [sessionUnknown, setSessionUnknown] = useState(0);

  const [showTestModal, setShowTestModal] = useState(false);
  const [pendingTopic, setPendingTopic] = useState('');
  const [_repeatTopic, setRepeatTopic] = useState(false);
  const [isTopicTest, setIsTopicTest] = useState(false);

  const [showDayStats, setShowDayStats] = useState(false);
  const [selectedDayDate, setSelectedDayDate] = useState('');

  const { initialized, topics, engine } = useGrammar(true);
  const grammarEngineTopics = useMemo(() => topics ?? [], [topics]);

  useEffect(() => {
    if (initialized) {
      setGrammarTopics(grammarEngineTopics);
      const lessonsMap: Record<string, any[]> = {};
      grammarEngineTopics.forEach((topic: any) => {
        lessonsMap[topic.id] = lessonsMap[topic.id] ?? [];
      });
      setLessonsByTopic(lessonsMap);
    }
  }, [initialized, grammarEngineTopics]);

  useEffect(() => {
    loadWords().then(setWords);
  }, []);

  const topicWordsAll = useMemo(
    () => getWordsByTopic(words, selectedModule, selectedTopic),
    [words, selectedModule, selectedTopic]
  );

  const currentWord = sessionWords[currentCardIndex] ?? null;

  const moduleKnownCounts = useMemo(() => {
    const result: Record<string, number> = {};
    for (const m of getModules(words)) {
      const ids = words.filter((w) => w.module === m).map((w) => w.id);
      result[m] = getKnownCount(ids);
    }
    return result;
  }, [words, getKnownCount]);

  const moduleTotalCounts = useMemo(() => {
    const result: Record<string, number> = {};
    for (const m of getModules(words)) {
      result[m] = words.filter((w) => w.module === m).length;
    }
    return result;
  }, [words]);

  const topicKnownCounts = useMemo(() => {
    const result: Record<string, number> = {};
    const topics = getTopics(words, selectedModule);
    for (const t of topics) {
      const ids = getWordsByTopic(words, selectedModule, t).map((w) => w.id);
      result[t] = getKnownCount(ids);
    }
    return result;
  }, [words, selectedModule, getKnownCount]);

  const topicTotalCounts = useMemo(() => {
    const result: Record<string, number> = {};
    const topics = getTopics(words, selectedModule);
    for (const t of topics) {
      result[t] = getWordsByTopic(words, selectedModule, t).length;
    }
    return result;
  }, [words, selectedModule]);

  const topicIsFullyKnown = useMemo(() => {
    const result: Record<string, boolean> = {};
    const topics = getTopics(words, selectedModule);
    for (const t of topics) {
      const ids = getWordsByTopic(words, selectedModule, t).map((w) => w.id);
      result[t] = isFullyKnown(ids);
    }
    return result;
  }, [words, selectedModule, isFullyKnown]);

  const allCardIds = useMemo(() => words.map((w) => w.id), [words]);
  const knownCount = getKnownCount(allCardIds);
  const todayLearned = getTodayLearned();
  const totalModuleWords = Object.values(moduleTotalCounts).reduce((sum, count) => sum + count, 0) || 650;
  const modulePercent = totalModuleWords > 0 ? Math.round((knownCount / totalModuleWords) * 100) : 0;
  const dailyGoalPercent = Math.min(100, Math.round((todayLearned / DAILY_GOAL) * 100));

  const grammarCompletedLessons = Object.keys(lessonProgress).filter(id => lessonProgress[id]?.completed).length;
  const grammarProgress = grammarTopics.length > 0 ? Math.round((grammarCompletedLessons / grammarTopics.length) * 100) : 0;

  const grammarLevels = Array.from(new Set(grammarTopics.map((t: any) => t.level))).sort();

  const grammarLevelCounts = useMemo(() => {
    const result: Record<string, { known: number; total: number }> = {};
    grammarLevels.forEach(level => {
      const levelTopics = grammarTopics.filter((t: any) => t.level === level);
      result[level] = {
        known: 0,
        total: levelTopics.length,
      };
    });
    return result;
  }, [grammarTopics, grammarLevels]);

  const grammarLevelTotalCounts = useMemo(() => {
    const result: Record<string, number> = {};
    grammarTopics.forEach((t: any) => {
      result[t.level] = (result[t.level] ?? 0) + 1;
    });
    return result;
  }, [grammarTopics]);

  const lessonProgressMap = useMemo(() => {
    const map: Record<string, { completed: boolean }> = {};
    Object.entries(lessonProgress).forEach(([id, progress]) => {
      map[id] = { completed: progress.completed };
    });
    return map;
  }, [lessonProgress]);

  const topicExercises = useMemo(() => {
    if (!selectedGrammarTopic || !engine) return [];
    try {
      return engine.getExercises(selectedGrammarTopic);
    } catch {
      return [];
    }
  }, [selectedGrammarTopic, engine, initialized]);

  /** Find TaskCollection by matching topic ID prefix (e.g. a1-phonetics -> a1-phonetics-tasks) */
  const currentTaskCollection = useMemo<TaskCollection | undefined>(() => {
    if (!selectedGrammarTopic) return undefined;
    const taskId = selectedGrammarTopic + '-tasks';
    return A1_TASK_COLLECTIONS.find(tc => tc.id === taskId);
  }, [selectedGrammarTopic]);
  const weekStats = getWeekStats();

  const handleSwipeRight = () => {
    if (currentWord) {
      setCardStatus(currentWord.id, 'known');
      recordWordLearned();
      setSessionKnown((c) => c + 1);
    }
    goToNextCard();
  };

  const handleSwipeLeft = () => {
    if (currentWord) {
      setCardStatus(currentWord.id, 'learning');
      setSessionUnknown((c) => c + 1);
    }
    goToNextCard();
  };

  const goToNextCard = () => {
    if (currentCardIndex < sessionWords.length - 1) {
      setCurrentCardIndex((i) => i + 1);
    } else {
      setScreen('topic-result');
    }
  };

  const handleStartLearning = () => {
    setScreen('modules');
  };

  const handleModuleSelect = (moduleName: string) => {
    setSelectedModule(moduleName);
    setScreen('topics');
  };

  const handleTopicSelect = (topicName: string) => {
    const topicWords = getWordsByTopic(words, selectedModule, topicName);
    const isComplete = topicWords.length > 0 && topicWords.every(w => isFullyKnown([w.id]));
    
    if (isComplete) {
      setPendingTopic(topicName);
      setShowTestModal(true);
    } else {
      startLearning(topicName, false);
    }
  };

  const startLearning = (topicName: string, repeat: boolean) => {
    const allWords = getWordsByTopic(words, selectedModule, topicName);
    const wordsToLearn = repeat
      ? allWords
      : allWords.filter((w) => !isFullyKnown([w.id]));
    setSessionWords(wordsToLearn);
    setSelectedTopic(topicName);
    setCurrentCardIndex(0);
    setSessionKnown(0);
    setSessionUnknown(0);
    setRepeatTopic(repeat);
    setScreen('cards');
  };

  const handleStartTopicTest = () => {
    setShowTestModal(false);
    const topicWords = getWordsByTopic(words, selectedModule, pendingTopic);
    const topicKey = `${selectedModule}::${pendingTopic}`;
    const testProgress = getTopicTestProgress(topicKey);
    
    const remainingWords = topicWords.filter(w => !testProgress[w.id]?.correct);
    const wordsToTest = remainingWords.length > 0 ? remainingWords : topicWords;
    
    const shuffled = shuffle(wordsToTest);
    setBlitzCards(shuffled.map((w) => ({ word: w, userAnswer: '', status: 'pending' })));
    setBlitzIndex(0);
    setBlitzResult('pending');
    setBlitzCorrect(0);
    setSelectedTopic(pendingTopic);
    setIsTopicTest(true);
    setScreen('blitz');
  };

  const handleBackToModules = () => {
    setScreen('modules');
    setSessionWords([]);
  };
  
  const handleBackToTopics = () => {
    setScreen('topics');
    setCurrentCardIndex(0);
    setShowTestModal(false);
    setSessionWords([]);
  };
  
  const handleBackToMain = () => {
    setScreen('main');
    setSessionWords([]);
  };

  const handleBlitz = () => {
    const knownWordIds = Object.keys(progress)
      .filter(key => progress[parseInt(key)] === 'known')
      .map(key => parseInt(key));
  
    const sourceWords = selectedModule 
      ? words.filter((w) => w.module === selectedModule && knownWordIds.includes(w.id))
      : words.filter((w) => knownWordIds.includes(w.id));
  
    if (sourceWords.length === 0) {
      return;
    }
    const shuffled = shuffle(sourceWords);
    const selected = shuffled.slice(0, Math.min(BLITZ_COUNT, shuffled.length));
    setBlitzCards(selected.map((w) => ({ word: w, userAnswer: '', status: 'pending' })));
    setBlitzIndex(0);
    setBlitzResult('pending');
    setBlitzCorrect(0);
    setScreen('blitz');
  };

  const handleBlitzAnswer = (answer: string) => {
    const card = blitzCards[blitzIndex];
    const isCorrect = normalize(answer) === normalize(card.word.word);

    if (isCorrect) {
      setCardStatus(card.word.id, 'known');
      setBlitzCorrect((c) => c + 1);
      if (isTopicTest) {
        const topicKey = `${selectedModule}::${selectedTopic}`;
        markTopicTestWordCorrect(topicKey, card.word.id);
      }
    }

    setBlitzResult(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      if (blitzIndex < blitzCards.length - 1) {
        setBlitzIndex((i) => i + 1);
        setBlitzResult('pending');
      } else {
        setScreen('blitz-result');
      }
    }, isCorrect ? 600 : 1500);
  };

  const handleBlitzDontKnow = () => {
    setBlitzResult('incorrect');
    setTimeout(() => {
      if (blitzIndex < blitzCards.length - 1) {
        setBlitzIndex((i) => i + 1);
        setBlitzResult('pending');
      } else {
        setScreen('blitz-result');
      }
    }, 1500);
  };

  const handleBlitzFinish = () => {
    setScreen('blitz-result');
  };

  const handleTopicTestRetry = () => {
    const topicKey = `${selectedModule}::${selectedTopic}`;
    resetTopicTestProgress(topicKey);
    handleStartTopicTest();
  };

  const handleDayClick = (date: string) => {
    setSelectedDayDate(date);
    setShowDayStats(true);
  };

  const handleGrammarOpen = () => {
    setScreen('grammar-levels');
  };

  const handleGrammarLevelSelect = (level: string) => {
    setSelectedGrammarLevel(level);
    setGrammarTopics((all: any[]) => (all ?? []).filter((t: any) => t.level === level));
    setScreen('grammar-topics');
  };

  const handleGrammarTopicSelect = (topicId: string) => {
    setSelectedGrammarTopic(topicId);
    setScreen('grammar-lesson');
  };

  const handleGrammarLessonNext = () => {
    if (selectedGrammarTopic) {
      recordLessonComplete(selectedGrammarTopic);
    }
    setScreen('grammar-practice');
  };

  const handleGrammarPracticeBack = () => {
    setScreen('grammar-lesson');
  };

  const topicFullyKnown = topicWordsAll.length > 0 && isFullyKnown(topicWordsAll.map(w => w.id));

  return (
    <div className="app" dir={dir}>
      <LanguageSwitcher />
      {screen === 'main' && (
        <MainScreen
          words={words}
          knownCount={todayLearned}
          modulePercent={modulePercent}
          dailyGoalPercent={dailyGoalPercent}
          streak={streak}
          weekStats={weekStats}
          grammarProgress={grammarProgress}
          onDayClick={handleDayClick}
          onStartLearning={handleStartLearning}
          onGrammar={handleGrammarOpen}
          onExit={handleBackToMain}
          onBlitz={handleBlitz}
        />
      )}

      {screen === 'modules' && (
        <ModuleList
          words={words}
          knownCounts={moduleKnownCounts}
          totalCounts={moduleTotalCounts}
          onSelect={handleModuleSelect}
          onBack={handleBackToMain}
        />
      )}

      {screen === 'topics' && (
        <TopicList
          words={words}
          moduleName={selectedModule}
          knownCounts={topicKnownCounts}
          totalCounts={topicTotalCounts}
          isFullyKnown={topicIsFullyKnown}
          onSelect={handleTopicSelect}
          onBack={handleBackToModules}
        />
      )}

      {screen === 'cards' && (
        <div className="screen cards-screen">
          <button className="btn btn-nav-back" onClick={handleBackToTopics}>
            {t.back}
          </button>
          <div className="card-mode-label">{t.learning}</div>
          <div className="card-counter">
            {sessionWords.length > 0 ? `${currentCardIndex + 1} / ${sessionWords.length}` : t.noCards}
          </div>
          {currentWord ? (
            <SwipeableCard
              key={currentWord.id}
              word={currentWord}
              onSwipeLeft={handleSwipeLeft}
              onSwipeRight={handleSwipeRight}
            />
          ) : (
            <div style={{ color: '#888', textAlign: 'center', marginTop: '40px' }}>
              {t.noCards}
            </div>
          )}
        </div>
      )}

      {screen === 'topic-result' && (
        <TopicResult
          topicName={selectedTopic}
          known={sessionKnown}
          unknown={sessionUnknown}
          total={topicWordsAll.length}
          sessionTotal={sessionWords.length}
          onBackToTopics={handleBackToTopics}
          onBackToModules={handleBackToModules}
          onStartTest={handleStartTopicTest}
          isComplete={topicFullyKnown}
        />
      )}

      {screen === 'blitz' && blitzCards.length > 0 && blitzCards[blitzIndex] ? (
        <BlitzTest
          key={blitzIndex + blitzCards[blitzIndex].word.id}
          word={blitzCards[blitzIndex].word}
          total={blitzCards.length}
          index={blitzIndex}
          result={blitzResult}
          onAnswer={handleBlitzAnswer}
          onDontKnow={handleBlitzDontKnow}
          onFinish={handleBlitzFinish}
        />
      ) : screen === 'blitz' ? (
        <div className="screen blitz-test-screen">
          <div className="blitz-waiting">No words available for Blitz Test</div>
          <button className="btn btn-nav-back" onClick={handleBackToMain}>
            ← Back to Main
          </button>
        </div>
      ) : null}

      {screen === 'blitz-result' && (
        <BlitzResult
          total={blitzCards.length}
          correct={blitzCorrect}
          onRetry={isTopicTest ? handleTopicTestRetry : () => {
            const sourceWords = selectedModule 
              ? words.filter((w) => w.module === selectedModule) 
              : words;
            const shuffled = shuffle(sourceWords);
            const selected = shuffled.slice(0, Math.min(BLITZ_COUNT, shuffled.length));
            setBlitzCards(selected.map((w) => ({ word: w, userAnswer: '', status: 'pending' })));
            setScreen('blitz');
          }}
          onBackToModules={handleBackToModules}
        />
      )}

      {screen === 'grammar-levels' && (
        <GrammarLevelList
          knownCounts={grammarLevelCounts}
          totalCounts={grammarLevelTotalCounts}
          levels={grammarLevels}
          onSelect={handleGrammarLevelSelect}
          onBack={handleBackToMain}
        />
      )}

      {screen === 'grammar-topics' && (
        <GrammarTopicList
          topics={grammarTopics}
          levelName={selectedGrammarLevel}
          lessonsByTopic={lessonsByTopic}
          lessonProgress={lessonProgressMap}
          onSelect={handleGrammarTopicSelect}
          onBack={handleBackToMain}
        />
      )}

      {screen === 'grammar-lesson' && selectedGrammarTopic && (
        <GrammarLesson
          topic={grammarTopics.find(t => t.id === selectedGrammarTopic)!}
          completed={!!lessonProgress[selectedGrammarTopic]?.completed}
          onNext={handleGrammarLessonNext}
          onBack={() => setScreen('grammar-topics')}
        />
      )}

      {screen === 'grammar-practice' && selectedGrammarTopic && (
        <GrammarPractice
          topic={grammarTopics.find(t => t.id === selectedGrammarTopic)!}
          exercises={topicExercises}
          taskCollection={currentTaskCollection}
          onBack={handleGrammarPracticeBack}
          onFinish={() => setScreen('grammar-topics')}
        />
      )}

      {showTestModal && (
        <TestModal
          topicName={pendingTopic}
          onStartTest={handleStartTopicTest}
          onRepeat={() => {
            setShowTestModal(false);
            startLearning(pendingTopic, true);
          }}
          onClose={() => {
            setShowTestModal(false);
          }}
        />
      )}

      {showDayStats && (
        <DayStatsModal
          date={selectedDayDate}
          stats={getDayStats(selectedDayDate)}
          onClose={() => setShowDayStats(false)}
        />
      )}
    </div>
  );
}
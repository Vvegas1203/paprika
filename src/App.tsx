import { useState, useEffect, useMemo } from 'react';
import { Word, Screen } from './utils/types';
import { loadWords, getWordsByTopic, getTopics, getModules } from './utils/csvParser';
import { useProgress } from './hooks/useProgress';
import MainScreen from './components/MainScreen';
import ModuleList from './components/ModuleList';
import TopicList from './components/TopicList';
import SwipeableCard from './components/SwipeableCard';
import './App.css';

type Mode = 'learning' | 'repetition';

export default function App() {
  const [words, setWords] = useState<Word[]>([]);
  const [screen, setScreen] = useState<Screen>('main');
  const [mode, setMode] = useState<Mode>('learning');
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { setCardStatus, getKnownCount, isFullyKnown } = useProgress();

  useEffect(() => {
    loadWords().then(setWords);
  }, []);

  // All words for the current topic, filtered by mode
  const topicWordsAll = useMemo(
    () => getWordsByTopic(words, selectedModule, selectedTopic),
    [words, selectedModule, selectedTopic]
  );

  const topicWords = useMemo(() => {
    if (mode === 'learning') {
      // In learning mode, exclude known words
      return topicWordsAll.filter((w) => !isFullyKnown([w.id]));
    }
    // In repetition mode, only known words
    return topicWordsAll.filter((w) => isFullyKnown([w.id]));
  }, [topicWordsAll, mode, isFullyKnown]);

  const currentWord = topicWords[currentCardIndex] ?? null;

  // Progress data for modules
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

  // Progress data for topics
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

  const handleSwipeRight = () => {
    if (currentWord) {
      setCardStatus(currentWord.id, 'known');
    }
    goToNextCard();
  };

  const handleSwipeLeft = () => {
    if (currentWord) {
      setCardStatus(currentWord.id, 'learning');
    }
    goToNextCard();
  };

  const goToNextCard = () => {
    if (currentCardIndex < topicWords.length - 1) {
      setCurrentCardIndex((i) => i + 1);
    } else {
      setScreen('topics');
      setCurrentCardIndex(0);
    }
  };

  const handleStartLearning = () => {
    setMode('learning');
    setScreen('modules');
  };

  const handleStartRepetition = () => {
    setMode('repetition');
    setScreen('modules');
  };

  const handleModuleSelect = (moduleName: string) => {
    setSelectedModule(moduleName);
    setScreen('topics');
  };

  const handleTopicSelect = (topicName: string) => {
    setSelectedTopic(topicName);
    setCurrentCardIndex(0);
    setScreen('cards');
  };

  const handleBackToModules = () => setScreen('modules');
  const handleBackToTopics = () => setScreen('topics');
  const handleBackToMain = () => setScreen('main');

  return (
    <div className="app">
      {screen === 'main' && (
        <MainScreen
          words={words}
          knownCount={knownCount}
          onStartLearning={handleStartLearning}
          onStartRepetition={handleStartRepetition}
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
          mode={mode}
          onSelect={handleTopicSelect}
          onBack={handleBackToModules}
        />
      )}

      {screen === 'cards' && currentWord && (
        <div className="screen">
          <button className="btn btn-back" onClick={handleBackToTopics}>
            ← Назад
          </button>
          <div className="card-mode-label">
            {mode === 'learning' ? 'Изучение' : 'Повторение'}
          </div>
          <div className="card-counter">
            {currentCardIndex + 1} / {topicWords.length}
          </div>
          <SwipeableCard
            key={currentWord.id}
            word={currentWord}
            onSwipeLeft={handleSwipeLeft}
            onSwipeRight={handleSwipeRight}
          />
        </div>
      )}
    </div>
  );
}
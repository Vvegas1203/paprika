import { useMemo, useState } from 'react';
import { Word } from '../utils/types';
import { getTopics } from '../utils/csvParser';

interface Props {
  words: Word[];
  moduleName: string;
  knownCounts: Record<string, number>;
  totalCounts: Record<string, number>;
  isFullyKnown: Record<string, boolean>;
  onSelect: (topic: string) => void;
  onBack: () => void;
}

// Topics display names with emoji
const TOPIC_DISPLAY: Record<string, { emoji: string; label: string }> = {
  'People & Family': { emoji: '👨‍👩‍👧‍👦', label: 'People & Family' },
  'Home & Living': { emoji: '🏠', label: 'Home & Living' },
  'Food & Drinks': { emoji: '🍽️', label: 'Food & Drinks' },
  'Transport & Travel': { emoji: '🚗', label: 'Transport & Travel' },
  'Work & Career': { emoji: '💼', label: 'Work & Career' },
  'School & Learning': { emoji: '📚', label: 'School & Learning' },
  'Shopping & Money': { emoji: '🛒', label: 'Shopping & Money' },
  'Health & Body': { emoji: '🏥', label: 'Health & Body' },
  'Clothing & Style': { emoji: '👕', label: 'Clothing & Style' },
  'Nature & Weather': { emoji: '🌤️', label: 'Nature & Weather' },
  'Communication': { emoji: '📱', label: 'Communication' },
  'Leisure & Sport': { emoji: '⚽', label: 'Leisure & Sport' },
  'Time & Dates': { emoji: '📅', label: 'Time & Dates' },
  'Places & Directions': { emoji: '📍', label: 'Places & Directions' },
  'Emotions & Feelings': { emoji: '😊', label: 'Emotions & Feelings' },
  'Adjectives & Description': { emoji: '🎨', label: 'Adjectives & Description' },
  'Verbs & Actions': { emoji: '🏃', label: 'Verbs & Actions' },
  'Grammar Basics': { emoji: '📖', label: 'Grammar Basics' },
  'Numbers & Quantities': { emoji: '🔢', label: 'Numbers & Quantities' },
  'Questions & Conjunctions': { emoji: '❓', label: 'Questions & Conjunctions' },
};

function getTopicDisplay(topic: string) {
  return TOPIC_DISPLAY[topic] ?? { emoji: '📝', label: topic };
}

type TopicStatus = 'not_started' | 'in_progress' | 'completed';

function getTopicStatus(known: number, isDone: boolean): TopicStatus {
  if (isDone) return 'completed';
  if (known > 0) return 'in_progress';
  return 'not_started';
}

export default function TopicList({ words, moduleName, knownCounts, totalCounts, isFullyKnown, onSelect, onBack }: Props) {
  const topics = getTopics(words, moduleName);
  const [isMoreExpanded, setIsMoreExpanded] = useState(false);
  const [isCompletedExpanded, setIsCompletedExpanded] = useState(false);

  // Sort and group topics
  const { activeTopics, completedTopics } = useMemo(() => {
    const active = topics.filter((t) => !isFullyKnown[t]);
    const completed = topics.filter((t) => isFullyKnown[t]);

    // Sort active topics: in_progress first (by % descending), then not_started
    const sortedActive = [...active].sort((a, b) => {
      const statusA = getTopicStatus(knownCounts[a] ?? 0, false);
      const statusB = getTopicStatus(knownCounts[b] ?? 0, false);
      
      // in_progress comes before not_started
      if (statusA !== statusB) {
        return statusA === 'in_progress' ? -1 : 1;
      }
      
      // Within in_progress, sort by percentage descending
      if (statusA === 'in_progress') {
        const percentA = knownCounts[a] ?? 0;
        const totalA = totalCounts[a] ?? 1;
        const percentB = knownCounts[b] ?? 0;
        const totalB = totalCounts[b] ?? 1;
        return (percentB / totalB) - (percentA / totalA);
      }
      
      // For not_started, keep original order (stable sort)
      return 0;
    });

    return { activeTopics: sortedActive, completedTopics: completed };
  }, [topics, knownCounts, totalCounts, isFullyKnown]);

  const INITIAL_VISIBLE_COUNT = 2;
  const primaryTopics = activeTopics.slice(0, INITIAL_VISIBLE_COUNT);
  const extraTopics = activeTopics.slice(INITIAL_VISIBLE_COUNT);

  return (
    <div className="screen topic-list-screen">
      <button className="btn btn-nav-back" onClick={onBack}>
        ← Назад
      </button>
      <h2 className="topic-list-title">{moduleName} — Topics</h2>

      {/* Main visible topics (first 2) */}
      <div className="topic-tile-grid">
        {primaryTopics.map((t) => {
          const display = getTopicDisplay(t);
          const known = knownCounts[t] ?? 0;
          const total = totalCounts[t] ?? 0;
          const percent = total > 0 ? Math.round((known / total) * 100) : 0;
          
          return (
            <div key={t} className="topic-tile" onClick={() => onSelect(t)}>
              <div className="topic-tile-emoji">{display.emoji}</div>
              <div className="topic-tile-name">{display.label}</div>
              <div className="topic-tile-progress">
                <div className="topic-tile-bar">
                  <div className="topic-tile-fill" style={{ width: `${percent}%` }} />
                </div>
                <span className="topic-tile-count">{known}/{total}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* More topics accordion */}
{extraTopics.length > 0 && (
        <div className="topic-collapsible">
          <button
            className="topic-collapsible-header"
            onClick={() => setIsMoreExpanded((v) => !v)}
          >
            <span>Ещё темы ({extraTopics.length})</span>
            <span className="topic-collapsible-icon">{isMoreExpanded ? '▲' : '▼'}</span>
          </button>
          <div className={`topic-collapsible-content ${isMoreExpanded ? 'expanded' : ''}`}>
            {isMoreExpanded && extraTopics.length > 6 && (
              <div className="topic-collapsible-scroll-hint">↕ Потяните для прокрутки</div>
            )}
            <div className="topic-tile-grid">
              {extraTopics.map((t) => {
                const display = getTopicDisplay(t);
                const known = knownCounts[t] ?? 0;
                const total = totalCounts[t] ?? 0;
                const percent = total > 0 ? Math.round((known / total) * 100) : 0;
                
                return (
                  <div key={t} className="topic-tile" onClick={() => onSelect(t)}>
                    <div className="topic-tile-emoji">{display.emoji}</div>
                    <div className="topic-tile-name">{display.label}</div>
                    <div className="topic-tile-progress">
                      <div className="topic-tile-bar">
                        <div className="topic-tile-fill" style={{ width: `${percent}%` }} />
                      </div>
                      <span className="topic-tile-count">{known}/{total}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {isMoreExpanded && extraTopics.length > 6 && (
              <div className="topic-collapsible-scroll-hint">↕ Потяните для прокрутки</div>
            )}
          </div>
        </div>
      )}

      {/* Completed topics accordion - only show if there are completed topics */}
{completedTopics.length > 0 && (
        <div className="topic-collapsible">
          <button
            className="topic-collapsible-header"
            onClick={() => setIsCompletedExpanded((v) => !v)}
          >
            <span>Пройдено ({completedTopics.length})</span>
            <span className="topic-collapsible-icon">{isCompletedExpanded ? '▲' : '▼'}</span>
          </button>
          <div className={`topic-collapsible-content ${isCompletedExpanded ? 'expanded' : ''}`}>
            {isCompletedExpanded && completedTopics.length > 6 && (
              <div className="topic-collapsible-scroll-hint">↕ Потяните для прокрутки</div>
            )}
            <div className="topic-tile-grid">
              {completedTopics.map((t) => {
                const display = getTopicDisplay(t);
                
                return (
                  <div key={t} className="topic-tile topic-tile-done" onClick={() => onSelect(t)}>
                    <div className="topic-tile-emoji">{display.emoji}</div>
                    <div className="topic-tile-name">{display.label}</div>
                    <div className="topic-tile-check">✓</div>
                  </div>
                );
              })}
            </div>
            {isCompletedExpanded && completedTopics.length > 6 && (
              <div className="topic-collapsible-scroll-hint">↕ Потяните для прокрутки</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
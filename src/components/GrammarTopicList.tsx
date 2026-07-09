import { useMemo, useState } from 'react';
import type { GrammarTopic } from '../grammar';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  topics: GrammarTopic[];
  levelName: string;
  lessonsByTopic: Record<string, any[]>;
  lessonProgress: Record<string, { completed: boolean }>;
  onSelect: (topicId: string) => void;
  onBack: () => void;
}

const getText = (localized: any, lang: string): string => {
  if (!localized) return '';
  return localized[lang] ?? localized.ru ?? Object.values(localized)[0] ?? '';
};

type TopicStatus = 'not_started' | 'in_progress' | 'completed';

function getTopicStatus(completed: number, total: number): TopicStatus {
  if (completed === total && total > 0) return 'completed';
  if (completed > 0) return 'in_progress';
  return 'not_started';
}

export default function GrammarTopicList({ topics, levelName, lessonsByTopic, lessonProgress, onSelect, onBack }: Props) {
  const { t, language } = useLanguage();
  const [isMoreExpanded, setIsMoreExpanded] = useState(false);
  const [isCompletedExpanded, setIsCompletedExpanded] = useState(false);

  // Sort and group topics
  const { activeTopics, completedTopics } = useMemo(() => {
    const active: GrammarTopic[] = [];
    const completed: GrammarTopic[] = [];

    topics.forEach((topic) => {
      const lessons = lessonsByTopic[topic.id] ?? [];
      const completedLessons = lessons.filter(l => lessonProgress[l.id]?.completed).length;
      
      if (completedLessons === lessons.length && lessons.length > 0) {
        completed.push(topic);
      } else {
        active.push(topic);
      }
    });

    // Sort active topics: in_progress first (by % descending), then not_started
    const sortedActive = [...active].sort((a, b) => {
      const lessonsA = lessonsByTopic[a.id] ?? [];
      const lessonsB = lessonsByTopic[b.id] ?? [];
      const completedA = lessonsA.filter(l => lessonProgress[l.id]?.completed).length;
      const completedB = lessonsB.filter(l => lessonProgress[l.id]?.completed).length;
      
      const statusA = getTopicStatus(completedA, lessonsA.length);
      const statusB = getTopicStatus(completedB, lessonsB.length);
      
      // in_progress comes before not_started
      if (statusA !== statusB) {
        return statusA === 'in_progress' ? -1 : 1;
      }
      
      // Within in_progress, sort by percentage descending
      if (statusA === 'in_progress') {
        const percentA = lessonsA.length > 0 ? completedA / lessonsA.length : 0;
        const percentB = lessonsB.length > 0 ? completedB / lessonsB.length : 0;
        return percentB - percentA;
      }
      
      // For not_started, keep original order (stable sort)
      return 0;
    });

    return { activeTopics: sortedActive, completedTopics: completed };
  }, [topics, lessonsByTopic, lessonProgress]);

  const INITIAL_VISIBLE_COUNT = 2;
  const primaryTopics = activeTopics.slice(0, INITIAL_VISIBLE_COUNT);
  const extraTopics = activeTopics.slice(INITIAL_VISIBLE_COUNT);

  return (
    <div className="screen topic-list-screen">
      <button className="btn btn-nav-back" onClick={onBack}>
        {t.back}
      </button>
      <h2 className="topic-list-title">{levelName} — {t.topics}</h2>

      {/* Main visible topics (first 2) */}
      <div className="topic-tile-grid">
        {primaryTopics.map((topic) => {
          const lessons = lessonsByTopic[topic.id] ?? [];
          const completed = lessons.filter(l => lessonProgress[l.id]?.completed).length;
          const total = lessons.length;
          const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
          const title = getText(topic.title, language);
          
          return (
            <div key={topic.id} className="topic-tile" onClick={() => onSelect(topic.id)}>
              <div className="topic-tile-name">{title}</div>
              <div className="topic-tile-progress">
                <div className="topic-tile-bar">
                  <div className="topic-tile-fill" style={{ width: `${percent}%` }} />
                </div>
                <span className="topic-tile-count">{completed}/{total}</span>
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
            <span>{t.moreTopics} ({extraTopics.length})</span>
            <span className="topic-collapsible-icon">{isMoreExpanded ? '▲' : '▼'}</span>
          </button>
          <div className={`topic-collapsible-content ${isMoreExpanded ? 'expanded' : ''}`}>
            {isMoreExpanded && extraTopics.length > 6 && (
              <div className="topic-collapsible-scroll-hint">{t.scrollForMore}</div>
            )}
            <div className="topic-tile-grid">
              {extraTopics.map((topic) => {
                const lessons = lessonsByTopic[topic.id] ?? [];
                const completed = lessons.filter(l => lessonProgress[l.id]?.completed).length;
                const total = lessons.length;
                const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
                const title = getText(topic.title, language);
                
                return (
                  <div key={topic.id} className="topic-tile" onClick={() => onSelect(topic.id)}>
                    <div className="topic-tile-name">{title}</div>
                    <div className="topic-tile-progress">
                      <div className="topic-tile-bar">
                        <div className="topic-tile-fill" style={{ width: `${percent}%` }} />
                      </div>
                      <span className="topic-tile-count">{completed}/{total}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {isMoreExpanded && extraTopics.length > 6 && (
              <div className="topic-collapsible-scroll-hint">{t.scrollForMore}</div>
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
            <span>{t.completed} ({completedTopics.length})</span>
            <span className="topic-collapsible-icon">{isCompletedExpanded ? '▲' : '▼'}</span>
          </button>
          <div className={`topic-collapsible-content ${isCompletedExpanded ? 'expanded' : ''}`}>
            {isCompletedExpanded && completedTopics.length > 6 && (
              <div className="topic-collapsible-scroll-hint">{t.scrollForMore}</div>
            )}
            <div className="topic-tile-grid">
              {completedTopics.map((topic) => {
                const title = getText(topic.title, language);
                return (
                  <div key={topic.id} className="topic-tile topic-tile-done" onClick={() => onSelect(topic.id)}>
                    <div className="topic-tile-name">{title}</div>
                    <div className="topic-tile-check">✓</div>
                  </div>
                );
              })}
            </div>
            {isCompletedExpanded && completedTopics.length > 6 && (
              <div className="topic-collapsible-scroll-hint">{t.scrollForMore}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
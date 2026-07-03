import { getTopics } from '../utils/csvParser';
import { Word } from '../utils/types';
import ProgressCircle from './ProgressCircle';

interface Props {
  words: Word[];
  moduleName: string;
  knownCounts: Record<string, number>;
  totalCounts: Record<string, number>;
  isFullyKnown: Record<string, boolean>;
  mode: 'learning' | 'repetition';
  onSelect: (topic: string) => void;
  onBack: () => void;
}

export default function TopicList({ words, moduleName, knownCounts, totalCounts, isFullyKnown, mode, onSelect, onBack }: Props) {
  const topics = getTopics(words, moduleName);

  // In learning mode: show topics that have at least one word not yet known
  // In repetition mode: show only topics that have at least one known word
  const visibleTopics = mode === 'learning'
    ? topics.filter((t) => !isFullyKnown[t] && knownCounts[t] < totalCounts[t])
    : topics.filter((t) => knownCounts[t] > 0);

  const knownTopics = visibleTopics.filter((t) => isFullyKnown[t]);
  const learningTopics = visibleTopics.filter((t) => !isFullyKnown[t]);

  return (
    <div className="screen">
      <button className="btn btn-back" onClick={onBack}>
        ← Назад
      </button>
      <h2>{moduleName} — темы</h2>

      {learningTopics.length > 0 && (
        <>
          <h3 className="section-title">В изучении</h3>
          <div className="list">
            {learningTopics.map((t) => (
              <button key={t} className="btn btn-list-item" onClick={() => onSelect(t)}>
                <span className="list-item-label">{t}</span>
                <ProgressCircle known={knownCounts[t] ?? 0} total={totalCounts[t] ?? 0} />
              </button>
            ))}
          </div>
        </>
      )}

      {knownTopics.length > 0 && (
        <>
          <h3 className="section-title">Изучено</h3>
          <div className="list">
            {knownTopics.map((t) => (
              <button key={t} className="btn btn-list-item btn-list-item-known" onClick={() => onSelect(t)}>
                <span className="list-item-label">
                  {t} <span className="checkmark">✓</span>
                </span>
                <ProgressCircle known={totalCounts[t] ?? 0} total={totalCounts[t] ?? 0} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
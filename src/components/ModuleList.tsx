import { getModules } from '../utils/csvParser';
import { Word } from '../utils/types';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  words: Word[];
  knownCounts: Record<string, number>;
  totalCounts: Record<string, number>;
  onSelect: (module: string) => void;
  onBack: () => void;
}

// Module display names with emoji
const MODULE_DISPLAY: Record<string, { emoji: string; label: string }> = {
  'A1': { emoji: '🌱', label: 'A1 - Beginner' },
  'A2': { emoji: '🌿', label: 'A2 - Elementary' },
  'B1': { emoji: '🌳', label: 'B1 - Intermediate' },
  'B2': { emoji: '🌲', label: 'B2 - Upper' },
  'C1': { emoji: '🎋', label: 'C1 - Advanced' },
  'C2': { emoji: '🎍', label: 'C2 - Mastery' },
};

function getModuleDisplay(module: string) {
  return MODULE_DISPLAY[module] ?? { emoji: '📚', label: module };
}

export default function ModuleList({ words, knownCounts, totalCounts, onSelect, onBack }: Props) {
  const { t } = useLanguage();
  const modules = getModules(words);

  return (
    <div className="screen">
      <button className="btn btn-nav-back" onClick={onBack}>
        {t.back}
      </button>
      <h2>{t.selectModule}</h2>
      
      {/* Module grid — square tiles */}
      <div className="module-tile-grid">
        {modules.map((m) => {
          const display = getModuleDisplay(m);
          const known = knownCounts[m] ?? 0;
          const total = totalCounts[m] ?? 0;
          const percent = total > 0 ? Math.round((known / total) * 100) : 0;
          
          return (
            <div key={m} className="module-tile" onClick={() => onSelect(m)}>
              <div className="module-tile-icon">{display.emoji}</div>
              <div className="module-tile-name">{display.label}</div>
              <div className="module-tile-progress">
                <div className="module-tile-bar">
                  <div className="module-tile-fill" style={{ width: `${percent}%` }} />
                </div>
                <span className="module-tile-count">{known}/{total}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

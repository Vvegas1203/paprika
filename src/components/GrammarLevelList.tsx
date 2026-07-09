import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  knownCounts: Record<string, { known: number; total: number }>;
  totalCounts: Record<string, number>;
  levels: string[];
  onSelect: (level: string) => void;
  onBack: () => void;
}

// Level display names with emoji
const LEVEL_DISPLAY: Record<string, { emoji: string; label: Record<string, string> }> = {
  'A1': { emoji: '🌱', label: { ru: 'A1 — Начальный', en: 'A1 - Beginner', ar: 'A1 — مبتدئ' } },
  'A2': { emoji: '🌿', label: { ru: 'A2 — Базовый', en: 'A2 - Elementary', ar: 'A2 — ابتدائي' } },
  'B1': { emoji: '🌳', label: { ru: 'B1 — Средний', en: 'B1 - Intermediate', ar: 'B1 — متوسط' } },
  'B2': { emoji: '🌲', label: { ru: 'B2 — Выше среднего', en: 'B2 - Upper', ar: 'B2 — متقدم' } },
  'C1': { emoji: '🎋', label: { ru: 'C1 — Продвинутый', en: 'C1 - Advanced', ar: 'C1 — متقدم جداً' } },
  'C2': { emoji: '🎍', label: { ru: 'C2 — Владение', en: 'C2 - Mastery', ar: 'C2 — إتقان' } },
};

const getText = (localized: Record<string, string> | undefined, lang: string): string => {
  if (!localized) return '';
  return localized[lang] ?? localized.ru ?? Object.values(localized)[0] ?? '';
};

export default function GrammarLevelList({ knownCounts, totalCounts, levels, onSelect, onBack }: Props) {
  const { t, language } = useLanguage();

  return (
    <div className="screen">
      <button className="btn btn-nav-back" onClick={onBack}>
        {t.back}
      </button>
      <h2>{t.learning}</h2>
      
      {/* Level grid — square tiles */}
      <div className="module-tile-grid">
        {levels.map((level) => {
          const display = LEVEL_DISPLAY[level];
          const known = knownCounts[level]?.known ?? 0;
          const total = totalCounts[level] ?? 0;
          const percent = total > 0 ? Math.round((known / total) * 100) : 0;
          
          return (
            <div key={level} className="module-tile" onClick={() => onSelect(level)}>
              <div className="module-tile-icon">{display?.emoji ?? '📚'}</div>
              <div className="module-tile-name">{display ? getText(display.label, language) : level}</div>
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

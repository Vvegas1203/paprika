import { DayStats } from '../utils/types';
import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  date: string;
  stats: DayStats | null;
  onClose: () => void;
}

export default function DayStatsModal({ date, stats, onClose }: Props) {
  const { t } = useLanguage();
  const DAY_LETTERS = [t.sun, t.mon, t.tue, t.wed, t.thu, t.fri, t.sat];

  // Format date for display
  const formatDate = (dateStr: string): string => {
    const parts = dateStr.split('-');
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  };

  // Get day name from date
  const getDayName = (dateStr: string): string => {
    const date = new Date(dateStr);
    return DAY_LETTERS[date.getDay()];
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content day-stats-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        
        <h2>{getDayName(date)} {formatDate(date)}</h2>
        
        {stats ? (
          <div className="day-stats-content">
            <div className="day-stat-item">
              <span className="day-stat-label">{t.wordsLearned}</span>
              <span className="day-stat-value">{stats.wordsLearned}</span>
            </div>
            <div className="day-stat-item">
              <span className="day-stat-label">{t.cardsViewed}</span>
              <span className="day-stat-value">{stats.cardsViewed}</span>
            </div>
            <div className="day-stat-item">
              <span className="day-stat-label">{t.knownMarked}</span>
              <span className="day-stat-value">{stats.cardsKnown}</span>
            </div>
            <div className="day-stat-item">
              <span className="day-stat-label">{t.blitzTestsPassed}</span>
              <span className="day-stat-value">{stats.blitzCompleted}</span>
            </div>
          </div>
        ) : (
          <div className="day-stats-empty">
            {t.noActivity}
          </div>
        )}
      </div>
    </div>
  );
}

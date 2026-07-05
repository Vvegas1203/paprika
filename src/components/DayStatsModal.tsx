import { DayStats } from '../utils/types';

interface Props {
  date: string;
  stats: DayStats | null;
  onClose: () => void;
}

export default function DayStatsModal({ date, stats, onClose }: Props) {
  // Format date for display
  const formatDate = (dateStr: string): string => {
    const parts = dateStr.split('-');
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  };

  // Get day name from date
  const getDayName = (dateStr: string): string => {
    const date = new Date(dateStr);
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return days[date.getDay()];
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
              <span className="day-stat-label">Выучено слов</span>
              <span className="day-stat-value">{stats.wordsLearned}</span>
            </div>
            <div className="day-stat-item">
              <span className="day-stat-label">Просмотрено карточек</span>
              <span className="day-stat-value">{stats.cardsViewed}</span>
            </div>
            <div className="day-stat-item">
              <span className="day-stat-label">Отмечено "Знаю"</span>
              <span className="day-stat-value">{stats.cardsKnown}</span>
            </div>
            <div className="day-stat-item">
              <span className="day-stat-label">Пройдено Blitz тестов</span>
              <span className="day-stat-value">{stats.blitzCompleted}</span>
            </div>
          </div>
        ) : (
          <div className="day-stats-empty">
            Нет активности за этот день
          </div>
        )}
      </div>
    </div>
  );
}
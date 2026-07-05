interface Props {
  total: number;
  correct: number;
  onRetry: () => void;
  onRetryTopicTest?: () => void;
  onBackToModules: () => void;
}

export default function BlitzResult({ total, correct, onRetry, onRetryTopicTest, onBackToModules }: Props) {
  const incorrect = total - correct;
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="screen blitz-result-screen">
      <h2>Результаты теста</h2>

      <div className="blitz-result-circle">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="60" fill="none" stroke="#2d2d4a" strokeWidth="10" />
          <circle
            cx="70"
            cy="70"
            r="60"
            fill="none"
            stroke="#4ecca3"
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 60}
            strokeDashoffset={2 * Math.PI * 60 * (1 - percent / 100)}
            strokeLinecap="round"
            transform="rotate(-90 70 70)"
            style={{ transition: 'stroke-dashoffset 0.8s ease' }}
          />
        </svg>
        <span className="blitz-result-percent">{percent}%</span>
      </div>

      <div className="blitz-result-stats">
        <div className="blitz-stat">
          <span className="blitz-stat-label">Всего слов</span>
          <span className="blitz-stat-value">{total}</span>
        </div>
        <div className="blitz-stat blitz-stat-correct">
          <span className="blitz-stat-label">Правильно</span>
          <span className="blitz-stat-value">{correct}</span>
        </div>
        <div className="blitz-stat blitz-stat-incorrect">
          <span className="blitz-stat-label">Неправильно</span>
          <span className="blitz-stat-value">{incorrect}</span>
        </div>
      </div>

<div className="blitz-result-buttons">
        <button className="btn btn-start" onClick={onRetry}>
          Пройти еще раз
        </button>
        {onRetryTopicTest && (
          <button className="btn btn-nav-back" onClick={onRetryTopicTest}>
            Перепройти тему
          </button>
        )}
        <button className="btn btn-nav-back" onClick={onBackToModules}>
          К модулям
        </button>
      </div>
    </div>
  );
}
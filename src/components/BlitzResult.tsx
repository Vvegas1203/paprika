import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  total: number;
  correct: number;
  onRetry: () => void;
  onBackToModules: () => void;
}

export default function BlitzResult({ total, correct, onRetry, onBackToModules }: Props) {
  const { t } = useLanguage();
  const incorrect = total - correct;
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="screen blitz-result-screen">
      <h2>{t.testResults}</h2>

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
          <span className="blitz-stat-label">{t.totalWords}</span>
          <span className="blitz-stat-value">{total}</span>
        </div>
        <div className="blitz-stat blitz-stat-correct">
          <span className="blitz-stat-label">{t.correct}</span>
          <span className="blitz-stat-value">{correct}</span>
        </div>
        <div className="blitz-stat blitz-stat-incorrect">
          <span className="blitz-stat-label">{t.incorrect}</span>
          <span className="blitz-stat-value">{incorrect}</span>
        </div>
      </div>

      <div className="blitz-result-buttons">
        <button className="btn btn-start" onClick={onRetry}>
          {t.retry}
        </button>
        <button className="btn btn-nav-back" onClick={onBackToModules}>
          {t.backToModules}
        </button>
      </div>
    </div>
  );
}
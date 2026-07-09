import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  topicName: string;
  known: number;
  unknown: number;
  total: number;
  sessionTotal?: number;
  onBackToTopics: () => void;
  onBackToModules: () => void;
  onStartTest?: () => void;
  isComplete?: boolean;
}

export default function TopicResult({ topicName, known, unknown, total, sessionTotal, onBackToTopics, onBackToModules, onStartTest, isComplete }: Props) {
  const { t } = useLanguage();
  // Use sessionTotal for percentage if available, otherwise use total
  const actualTotal = sessionTotal ?? total;
  const percent = actualTotal > 0 ? Math.round((known / actualTotal) * 100) : 0;

  return (
    <div className="screen topic-result-screen">
      <h2>{t.topicCompleted}</h2>
      
      <div className="topic-result-name">{topicName}</div>
      
      <div className="topic-result-stats">
        <div className="topic-result-percent">{percent}%</div>
        
        <div className="topic-result-details">
          <div className="topic-result-stat">
            <span className="topic-result-label">{t.iKnow}</span>
            <span className="topic-result-value topic-result-known">{known}</span>
          </div>
          <div className="topic-result-stat">
            <span className="topic-result-label">{t.iDontKnow}</span>
            <span className="topic-result-value topic-result-unknown">{unknown}</span>
          </div>
          <div className="topic-result-stat">
            <span className="topic-result-label">{t.total}</span>
            <span className="topic-result-value">{total}</span>
          </div>
        </div>
      </div>

      <div className="topic-result-buttons">
        {isComplete && onStartTest && (
          <button className="btn btn-start" onClick={onStartTest}>
            {t.test}
          </button>
        )}
        <button className="btn btn-nav-back" onClick={onBackToTopics}>
          {t.backToTopics}
        </button>
        <button className="btn btn-nav-back" onClick={onBackToModules}>
          {t.backToModules}
        </button>
      </div>
    </div>
  );
}
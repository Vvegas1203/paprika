import { useState, useEffect } from 'react';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showDetails, setShowDetails] = useState(false);
  // Use sessionTotal for percentage if available, otherwise use total
  const actualTotal = sessionTotal ?? total;
  const percent = actualTotal > 0 ? Math.round((known / actualTotal) * 100) : 0;

  // useEffect удален - не используется
  void showDetails;

  return (
    <div className="screen topic-result-screen">
      <h2>Тема завершена!</h2>
      
      <div className="topic-result-name">{topicName}</div>
      
      <div className="topic-result-stats">
        <div className="topic-result-percent">{percent}%</div>
        
        <div className="topic-result-details">
          <div className="topic-result-stat">
            <span className="topic-result-label">Знаю:</span>
            <span className="topic-result-value topic-result-known">{known}</span>
          </div>
          <div className="topic-result-stat">
            <span className="topic-result-label">Не знаю:</span>
            <span className="topic-result-value topic-result-unknown">{unknown}</span>
          </div>
          <div className="topic-result-stat">
            <span className="topic-result-label">Всего:</span>
            <span className="topic-result-value">{total}</span>
          </div>
        </div>
      </div>

      <div className="topic-result-buttons">
        {isComplete && onStartTest && (
          <button className="btn btn-start" onClick={onStartTest}>
            Тест
          </button>
        )}
        <button className="btn btn-nav-back" onClick={onBackToTopics}>
          К темам
        </button>
        <button className="btn btn-nav-back" onClick={onBackToModules}>
          К модулям
        </button>
      </div>
    </div>
  );
}
import { Word } from '../utils/types';

interface Props {
  words: Word[];
  knownCount: number;
  onStartLearning: () => void;
  onStartRepetition: () => void;
}

export default function MainScreen({ words, knownCount, onStartLearning, onStartRepetition }: Props) {
  const total = words.length;
  const percent = total > 0 ? Math.round((knownCount / total) * 100) : 0;

  return (
    <div className="screen main-screen">
      <h1>Language Learning</h1>

      <div className="progress-bar-container">
        <div className="progress-bar-label">
          {knownCount} / {total} слов изучено
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="progress-bar-percent">{percent}%</div>
      </div>

      <div className="main-buttons">
        <button className="btn btn-start" onClick={onStartLearning}>
          Изучение
        </button>
        <button className="btn btn-repetition" onClick={onStartRepetition} disabled={knownCount === 0}>
          Повторение
        </button>
      </div>
    </div>
  );
}
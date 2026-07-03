import { getModules } from '../utils/csvParser';
import { Word } from '../utils/types';
import ProgressCircle from './ProgressCircle';

interface Props {
  words: Word[];
  knownCounts: Record<string, number>;
  totalCounts: Record<string, number>;
  onSelect: (module: string) => void;
  onBack: () => void;
}

export default function ModuleList({ words, knownCounts, totalCounts, onSelect, onBack }: Props) {
  const modules = getModules(words);

  return (
    <div className="screen">
      <button className="btn btn-back" onClick={onBack}>
        ← Назад
      </button>
      <h2>Выберите модуль</h2>
      <div className="list">
        {modules.map((m) => (
          <button key={m} className="btn btn-list-item" onClick={() => onSelect(m)}>
            <span className="list-item-label">{m}</span>
            <ProgressCircle known={knownCounts[m] ?? 0} total={totalCounts[m] ?? 0} />
          </button>
        ))}
      </div>
    </div>
  );
}
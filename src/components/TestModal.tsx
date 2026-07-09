import { useLanguage } from '../contexts/LanguageContext';

interface Props {
  topicName: string;
  onStartTest: () => void;
  onRepeat: () => void;
  onClose: () => void;
}

export default function TestModal({ topicName, onStartTest, onRepeat, onClose }: Props) {
  const { t } = useLanguage();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>{t.topicStudied}</h2>
        <p>{t.topicStudiedDesc} "{topicName}"</p>
        <p>{t.whatToDo}</p>
        <div className="modal-buttons">
          <button className="btn btn-start" onClick={onStartTest}>
            {t.takeTest}
          </button>
          <button className="btn btn-back" onClick={onRepeat}>
            {t.repeatCards}
          </button>
        </div>
      </div>
    </div>
  );
}
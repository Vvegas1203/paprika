// eslint-disable-next-line @typescript-eslint/no-unused-vars
// useState и useEffect удалены - они не используются в этом компоненте

interface Props {
  topicName: string;
  onStartTest: () => void;
  onRepeat: () => void;
  onClose: () => void;
}

export default function TestModal({ topicName, onStartTest, onRepeat, onClose }: Props) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        <h2>Тема изучена!</h2>
        <p>Вы полностью изучили тему "{topicName}"</p>
        <p>Что хотите сделать?</p>
        <div className="modal-buttons">
          <button className="btn btn-start" onClick={onStartTest}>
            Пройти тест
          </button>
          <button className="btn btn-back" onClick={onRepeat}>
            Повторить карточки
          </button>
        </div>
      </div>
    </div>
  );
}

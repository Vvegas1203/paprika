import { useState } from 'react';
import { Word } from '../utils/types';

interface Props {
  word: Word;
  total: number;
  index: number;
  result: 'pending' | 'correct' | 'incorrect';
  onAnswer: (answer: string) => void;
  onDontKnow: () => void;
  onFinish: () => void;
}

export default function BlitzTest({ word, total, index, result, onAnswer, onDontKnow, onFinish }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAnswer(input.trim());
  };

  const getStatusClass = () => {
    if (result === 'correct') return 'blitz-correct';
    if (result === 'incorrect') return 'blitz-incorrect';
    return '';
  };

  return (
    <div className="screen blitz-test-screen">
      <div className="blitz-progress">
        {index + 1} / {total}
      </div>

      <div className={`blitz-card ${getStatusClass()}`}>
        <img
          className="card-image"
          src={word.image}
          alt={word.translation}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="blitz-translation">{word.translation}</div>

        {result === 'incorrect' && (
          <div className="blitz-correct-answer">
            Правильный ответ: <strong>{word.word}</strong>
          </div>
        )}
      </div>

      <div className="blitz-input-area">
        {result === 'pending' ? (
          <form onSubmit={handleSubmit} className="blitz-form">
            <input
              className="blitz-input"
              type="text"
              placeholder="Введите слово на иностранном языке..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              autoComplete="off"
            />
            <div className="blitz-buttons">
              <button type="submit" className="btn btn-start">
                Ответить
              </button>
              <button type="button" className="btn btn-dont-know" onClick={onDontKnow}>
                Не знаю
              </button>
            </div>
          </form>
        ) : (
          <div className="blitz-waiting">
            {result === 'correct' ? '✅ Верно!' : `❌ ${word.word}`}
          </div>
        )}
      </div>

      <button className="btn btn-finish" onClick={onFinish}>
        Завершить
      </button>
    </div>
  );
}
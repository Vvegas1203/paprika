import { useState } from 'react';
import { Word } from '../utils/types';
import { useLanguage } from '../contexts/LanguageContext';

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
  const { t, getTranslation } = useLanguage();
  const localizedTranslation = getTranslation(word.id, word.translation);
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
        <div className="blitz-translation">{localizedTranslation}</div>

        {result === 'incorrect' && (
          <div className="blitz-correct-answer">
            {t.correctAnswer} <strong>{word.word}</strong>
          </div>
        )}
      </div>

      <div className="blitz-input-area">
        {result === 'pending' ? (
          <form onSubmit={handleSubmit} className="blitz-form">
            <input
              className="blitz-input"
              type="text"
              placeholder={t.enterWordPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              autoComplete="off"
            />
            <div className="blitz-buttons">
              <button type="submit" className="btn btn-start">
                {t.answer}
              </button>
              <button type="button" className="btn btn-dont-know" onClick={onDontKnow}>
                {t.dontKnow}
              </button>
            </div>
          </form>
        ) : (
          <div className="blitz-waiting">
            {result === 'correct' ? t.correctEmoji : `❌ ${word.word}`}
          </div>
        )}
      </div>

      <button className="btn btn-finish" onClick={onFinish}>
        {t.finish}
      </button>
    </div>
  );
}
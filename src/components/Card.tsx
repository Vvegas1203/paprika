import { useState } from 'react';
import { Word } from '../utils/types';

interface Props {
  word: Word;
}

export default function Card({ word }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="card-container" onClick={() => setFlipped(!flipped)}>
      <div className={`card ${flipped ? 'card-flipped' : ''}`}>
        <div className="card-front">
          <img
            className="card-image"
            src={word.image}
            alt={word.word}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="card-word">{word.word}</div>
        </div>
        <div className="card-back">
          <img
            className="card-image"
            src={word.image}
            alt={word.word}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div className="card-word">{word.translation}</div>
        </div>
      </div>
    </div>
  );
}
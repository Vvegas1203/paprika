import { useRef, useState, useCallback } from 'react';
import { Word } from '../utils/types';
import Card from './Card';

interface Props {
  word: Word;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
}

const SWIPE_THRESHOLD = 80;

export default function SwipeableCard({ word, onSwipeLeft, onSwipeRight }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setSwiping(true);
    setExitDirection(null);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!swiping) return;
    const diff = e.touches[0].clientX - startX;
    setOffsetX(diff);
  }, [swiping, startX]);

  const handleTouchEnd = useCallback(() => {
    setSwiping(false);
    if (offsetX > SWIPE_THRESHOLD) {
      setExitDirection('right');
      setTimeout(() => {
        onSwipeRight();
        setOffsetX(0);
        setExitDirection(null);
      }, 200);
    } else if (offsetX < -SWIPE_THRESHOLD) {
      setExitDirection('left');
      setTimeout(() => {
        onSwipeLeft();
        setOffsetX(0);
        setExitDirection(null);
      }, 200);
    } else {
      setOffsetX(0);
    }
  }, [offsetX, onSwipeRight, onSwipeLeft]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setStartX(e.clientX);
    setSwiping(true);
    setExitDirection(null);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!swiping) return;
    const diff = e.clientX - startX;
    setOffsetX(diff);
  }, [swiping, startX]);

  const handleMouseUp = useCallback(() => {
    handleTouchEnd();
  }, [handleTouchEnd]);

  const rotation = offsetX * 0.05;
  const exitClass = exitDirection ? `swipe-exit-${exitDirection}` : '';
  const exitOpacity = exitDirection ? 0 : 1;

  return (
    <div className="swipeable-card-wrapper">
      <div className="swipe-hint swipe-hint-left">Учу</div>
      <div className="swipe-hint swipe-hint-right">Знаю</div>
      <div
        ref={containerRef}
        className={`swipeable-card ${exitClass}`}
        style={{
          transform: exitDirection
            ? `translateX(${exitDirection === 'right' ? 200 : -200}%) rotate(${exitDirection === 'right' ? 30 : -30}deg)`
            : `translateX(${offsetX}px) rotate(${rotation}deg)`,
          opacity: exitOpacity,
          transition: exitDirection ? 'transform 0.2s ease-out, opacity 0.2s ease-out' : undefined,
          cursor: 'grab',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="swipe-overlay swipe-overlay-left"
          style={{ opacity: Math.max(0, -offsetX / SWIPE_THRESHOLD) }}
        >
          Учу
        </div>
        <div
          className="swipe-overlay swipe-overlay-right"
          style={{ opacity: Math.max(0, offsetX / SWIPE_THRESHOLD) }}
        >
          Знаю
        </div>
        <Card word={word} />
      </div>
    </div>
  );
}
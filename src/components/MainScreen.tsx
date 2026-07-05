import { Word } from '../utils/types';
import AppleWatchProgress from './AppleWatchProgress';

interface WeekStats {
  completedDays: number;
  totalDays: number;
}

const DAILY_GOAL = 20;
const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']; // Sunday=0 to Saturday=6

interface Props {
  words: Word[];
  knownCount: number;
  modulePercent: number;
  dailyGoalPercent: number;
  streak: number;
  weekStats: WeekStats;
  onDayClick: (date: string) => void;
  onStartLearning: () => void;
  onExit: () => void;
  onBlitz: () => void;
}

function getDateDaysAgo(days: number): { dateStr: string; dayLetter: string } {
  const now = new Date();
  const date = new Date(now);
  date.setDate(date.getDate() - days);
  const dayLetter = DAY_LETTERS[date.getDay()];
  return {
    dateStr: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
    dayLetter
  };
}

export default function MainScreen({ 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  words, 
  knownCount, 
  modulePercent, 
  dailyGoalPercent, 
  streak,
  weekStats,
  onDayClick,
  onStartLearning, 
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onExit, 
  onBlitz 
}: Props) {
  return (
    <div className="screen main-screen">
      {/* Orange Banner with nested circles badge */}
      <div className="banner-with-badge">
        <div className="orange-banner">
          <div className="banner-text-area">
            <div className="banner-title">Daily Progress</div>
            {knownCount >= DAILY_GOAL ? (
              <>
                <div className="banner-subtitle goal-complete">Goal completed ✓</div>
                <div className="banner-extra">+{knownCount - DAILY_GOAL} words above today</div>
              </>
            ) : (
              <div className="banner-subtitle">{knownCount}/{DAILY_GOAL} words today</div>
            )}
          </div>
        </div>

        {/* Nested (Matryoshka) Progress Circles - badge on banner */}
        <div className="nested-circles-badge">
          {/* Daily Goal - outer ring */}
          <div className="badge-circle-abs" style={{ zIndex: 3 }}>
            <AppleWatchProgress percent={dailyGoalPercent} size={100} color="#ff6b35" />
          </div>

          {/* Module Progress - middle ring */}
          <div className="badge-circle-abs" style={{ zIndex: 2 }}>
            <AppleWatchProgress percent={modulePercent} size={72} color="#ffa94d" />
          </div>

          {/* Paprika Logo - center */}
          <div className="badge-circle-abs" style={{ zIndex: 1 }}>
            <div className="paprika-logo-badge">
              <span className="paprika-logo-text">P</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row below circles */}
      <div className="nested-stats-row">
        <div className="stat-item">
          <span className="stat-value">{dailyGoalPercent}%</span>
          <span className="stat-label">Daily Goal</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{streak}</span>
          <span className="stat-label">Day Streak</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{modulePercent}%</span>
          <span className="stat-label">Module</span>
        </div>
      </div>

      <div className="quick-actions">
        <div className="action-card" onClick={onBlitz}>
          <div className="action-card-icon">⚡</div>
          <div className="action-card-title">Blitz Test</div>
          <div className="action-card-subtitle">10 words · 2 min</div>
        </div>

        <div className="action-card" onClick={onStartLearning}>
          <div className="action-card-icon">📚</div>
          <div className="action-card-title">Изучение</div>
        </div>
      </div>

      {/* This Week section */}
      <div className="weekly-section">
        <div className="weekly-title">This Week</div>
        <div className="weekly-grid">
          {[6, 5, 4, 3, 2, 1, 0].map((daysAgo) => {
            const { dateStr, dayLetter } = getDateDaysAgo(daysAgo);
            const isCompleted = daysAgo < weekStats.completedDays;
            
            return (
              <div 
                key={daysAgo} 
                className={`weekly-day-new ${isCompleted ? 'completed' : 'inactive'}`}
                onClick={() => onDayClick(dateStr)}
              >
                {dayLetter}
                {isCompleted ? (
                  <span className="day-check">✓</span>
                ) : (
                  <span className="day-cross">✗</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
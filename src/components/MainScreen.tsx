import { Word } from '../utils/types';
import AppleWatchProgress from './AppleWatchProgress';
import { useLanguage } from '../contexts/LanguageContext';

interface WeekStats {
  completedDays: number;
  totalDays: number;
}

const DAILY_GOAL = 20;

interface Props {
  words: Word[];
  knownCount: number;
  modulePercent: number;
  dailyGoalPercent: number;
  streak: number;
  weekStats: WeekStats;
  grammarProgress: number; // 0-100
  onDayClick: (date: string) => void;
  onStartLearning: () => void;
  onGrammar: () => void;
  onExit: () => void;
  onBlitz: () => void;
}

function getDateDaysAgo(days: number, dayLetters: string[]): { dateStr: string; dayLetter: string } {
  const now = new Date();
  const date = new Date(now);
  date.setDate(date.getDate() - days);
  const dayLetter = dayLetters[date.getDay()];
  return {
    dateStr: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
    dayLetter
  };
}

export default function MainScreen({ 
  knownCount, 
  modulePercent, 
  dailyGoalPercent, 
  streak,
  weekStats,
  grammarProgress,
  onDayClick,
  onStartLearning,
  onGrammar,
  onBlitz 
}: Props) {
  const { t } = useLanguage();
  const DAY_LETTERS = [t.sun, t.mon, t.tue, t.wed, t.thu, t.fri, t.sat];

  return (
    <div className="screen main-screen">
      {/* Orange Banner with nested circles badge */}
      <div className="banner-with-badge">
        <div className="orange-banner">
          <div className="banner-text-area">
            <div className="banner-title">{t.dailyProgress}</div>
            {knownCount >= DAILY_GOAL ? (
              <>
                <div className="banner-subtitle goal-complete">{t.goalCompleted}</div>
                <div className="banner-extra">+{knownCount - DAILY_GOAL} {t.wordsAboveToday}</div>
              </>
            ) : (
              <div className="banner-subtitle">{knownCount}/{DAILY_GOAL} {t.wordsToday}</div>
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
          <span className="stat-label">{t.dailyGoal}</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{streak}</span>
          <span className="stat-label">{t.dayStreak}</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{modulePercent}%</span>
          <span className="stat-label">{t.module}</span>
        </div>
      </div>

      <div className="quick-actions">
        <div className="action-card" onClick={onBlitz}>
          <div className="action-card-icon">⚡</div>
          <div className="action-card-title">{t.blitzTest}</div>
          <div className="action-card-subtitle">{t.blitzSubtitle}</div>
        </div>

        <div className="action-card" onClick={onStartLearning}>
          <div className="action-card-icon">📚</div>
          <div className="action-card-title">{t.study}</div>
        </div>
      </div>

      {/* Grammar Card */}
      <div className="grammar-action-card" onClick={onGrammar}>
        <div className="action-card-icon">📖</div>
        <div className="action-card-title">{t.grammar}</div>
        <div className="action-card-subtitle">{t.grammarSubtitle}</div>
        <div className="grammar-progress-bar">
          <div className="grammar-progress-fill" style={{ width: `${grammarProgress}%` }} />
        </div>
        <span className="grammar-progress-text">{grammarProgress}%</span>
      </div>

      {/* This Week section */}
      <div className="weekly-section">
        <div className="weekly-title">{t.thisWeek}</div>
        <div className="weekly-grid">
          {[6, 5, 4, 3, 2, 1, 0].map((daysAgo) => {
            const { dateStr, dayLetter } = getDateDaysAgo(daysAgo, DAY_LETTERS);
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
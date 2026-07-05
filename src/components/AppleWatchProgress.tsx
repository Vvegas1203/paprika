// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { DailyStats } from '../utils/types';

interface Props {
  percent: number;
  size?: number;
  color?: string;
  children?: React.ReactNode;
}

export default function AppleWatchProgress({ percent, size = 120, color = '#ff6b35', children }: Props) {
  // Cap at 100% for the ring — ring is always full when >= 100
  const clampedPercent = Math.min(percent, 100);
  const radius = (size - 4) / 2;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clampedPercent / 100) * circumference;
  const isComplete = percent >= 100;
  
  const ringColor = isComplete ? '#4ecca3' : color;

  return (
    <div className="apple-watch-progress" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#3d2b1f"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress ring - starts from 12 o'clock, fills clockwise like hour hand */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.25, 0.1, 0.25, 1)' }}
        />
      </svg>
      <div className="apple-watch-content">
        {children}
      </div>
    </div>
  );
}
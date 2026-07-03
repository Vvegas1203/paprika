interface Props {
  known: number;
  total: number;
  size?: number;
}

export default function ProgressCircle({ known, total, size = 40 }: Props) {
  const percent = total > 0 ? Math.round((known / total) * 100) : 0;
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="progress-circle" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#2d2d4a"
          strokeWidth={3}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#4ecca3"
          strokeWidth={3}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.4s ease' }}
        />
      </svg>
      <span className="progress-circle-text">{percent}%</span>
    </div>
  );
}
import type { RatingCircleProps } from '../../types/movie.types';
import { UI_CONFIG, THEME } from '../../config/constants';

const calculateCircleMetrics = (value: number, size: number, strokeWidth: number) => {
  const percent = Math.round((value / 10) * 100);
  const radius = size / 2 - 4;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = (percent / 100) * circumference;

  return {
    percent,
    normalizedRadius,
    circumference,
    progress,
  };
};

export const RatingCircle = ({
  value,
  size = 120,
  strokeWidth = UI_CONFIG.RATING.STROKE_WIDTH,
  primaryColor = THEME.COLORS.primary,
  secondaryColor = THEME.COLORS.secondary,
}: RatingCircleProps) => {
  const {
    percent,
    normalizedRadius,
    circumference,
    progress,
  } = calculateCircleMetrics(value, size, strokeWidth);

  return (
    <svg 
      width={size} 
      height={size} 
      className="transition-all duration-300 ease-in-out"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={normalizedRadius}
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={normalizedRadius}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="butt"
        className="transition-all duration-300"
      />
      <text
        x="50%"
        y="52%"
        textAnchor="middle"
        fontFamily={THEME.FONTS.primary}
        alignmentBaseline="middle"
      >
        <tspan
          fontSize="24px"
          fontWeight="600"
          fill={THEME.COLORS.primary}
          alignmentBaseline="middle"
        >
          {percent}
        </tspan>
        <tspan
          dx={2}
          fontSize="14px"
          fontWeight="600"
          fill="#FFFFFF"
          alignmentBaseline="middle"
        >
          %
        </tspan>
      </text>
    </svg>
  );
};

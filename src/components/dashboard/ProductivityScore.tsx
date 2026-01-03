import React from 'react';
import { cn } from '@/lib/utils';

interface ProductivityScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const ProductivityScore: React.FC<ProductivityScoreProps> = ({
  score,
  size = 'md',
  showLabel = true,
  className,
}) => {
  const getColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-primary';
    if (score >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const getStrokeColor = (score: number) => {
    if (score >= 80) return 'stroke-success';
    if (score >= 60) return 'stroke-primary';
    if (score >= 40) return 'stroke-warning';
    return 'stroke-destructive';
  };

  const sizes = {
    sm: { container: 'w-16 h-16', text: 'text-lg', label: 'text-xs' },
    md: { container: 'w-24 h-24', text: 'text-2xl', label: 'text-sm' },
    lg: { container: 'w-32 h-32', text: 'text-3xl', label: 'text-base' },
  };

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className={cn('relative', sizes[size].container)}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            className={cn('transition-all duration-1000 ease-out', getStrokeColor(score))}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn('font-bold', sizes[size].text, getColor(score))}>
            {score}%
          </span>
        </div>
      </div>
      {showLabel && (
        <span className={cn('text-muted-foreground font-medium', sizes[size].label)}>
          Productivity Score
        </span>
      )}
    </div>
  );
};

export default ProductivityScore;

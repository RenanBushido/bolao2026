'use client';

import clsx from 'clsx';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  centered?: boolean;
}

export const LoadingSpinner = ({ size = 'md', label, centered = false }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const spinner = (
    <div
      className={clsx(
        sizeClasses[size],
        'border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin'
      )}
      role="status"
      aria-label={label || 'Loading'}
    />
  );

  if (centered) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        {spinner}
        {label && <p className="text-sm text-neutral-600">{label}</p>}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {spinner}
      {label && <p className="text-sm text-neutral-600">{label}</p>}
    </div>
  );
};

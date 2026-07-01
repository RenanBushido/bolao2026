import React from 'react';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'info', size = 'md', children, className = '' }, ref) => {
    const variantStyles = {
      success: 'bg-primary-100 text-primary-700 border border-primary-200',
      warning: 'bg-accent-100 text-accent-700 border border-accent-200',
      danger: 'bg-red-100 text-red-700 border border-red-200',
      info: 'bg-secondary-100 text-secondary-700 border border-secondary-200',
      neutral: 'bg-neutral-100 text-neutral-700 border border-neutral-200',
    };

    const sizeStyles = {
      sm: 'px-2 py-1 text-xs font-medium rounded',
      md: 'px-3 py-1 text-small font-medium rounded',
      lg: 'px-4 py-2 text-body font-medium rounded-lg',
    };

    return (
      <span
        ref={ref}
        className={`inline-block ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;

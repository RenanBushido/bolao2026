import React from 'react';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'neutral';
  text?: string;
  className?: string;
  fullScreen?: boolean;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ size = 'md', variant = 'primary', text, className = '', fullScreen = false }, ref) => {
    const sizeClasses = {
      sm: 'h-6 w-6',
      md: 'h-10 w-10',
      lg: 'h-16 w-16',
    };

    const colorClasses = {
      primary: 'border-primary-300 border-t-primary-600',
      secondary: 'border-secondary-300 border-t-secondary-600',
      neutral: 'border-neutral-300 border-t-neutral-600',
    };

    const container = fullScreen ? (
      <div
        ref={ref}
        className={`fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50 ${className}`}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className={`
              animate-spin rounded-full border-4
              ${sizeClasses[size]}
              ${colorClasses[variant]}
            `}
          />
          {text && <p className="text-body text-neutral-600">{text}</p>}
        </div>
      </div>
    ) : (
      <div ref={ref} className={`flex flex-col items-center gap-4 ${className}`}>
        <div
          className={`
            animate-spin rounded-full border-4
            ${sizeClasses[size]}
            ${colorClasses[variant]}
          `}
        />
        {text && <p className="text-body text-neutral-600">{text}</p>}
      </div>
    );

    return container;
  }
);

Loading.displayName = 'Loading';

export default Loading;

import React from 'react';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  className?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  ({
    title,
    subtitle,
    description,
    backgroundImage,
    children,
    className = '',
    textAlign = 'center',
  }, ref) => {
    const textAlignClass = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    };

    const contentAlignClass = {
      left: 'items-start',
      center: 'items-center',
      right: 'items-end',
    };

    return (
      <div
        ref={ref}
        className={`
          relative w-full min-h-screen flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-8
          ${className}
        `}
        style={
          backgroundImage
            ? {
                backgroundImage: `url('${backgroundImage}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : {
                backgroundImage: `linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)`,
              }
        }
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        {/* Content */}
        <div
          className={`
            relative z-10 max-w-4xl w-full flex flex-col gap-6
            ${contentAlignClass[textAlign]}
          `}
        >
          {subtitle && (
            <div className={`text-accent-300 font-semibold uppercase tracking-wider text-sm`}>
              {subtitle}
            </div>
          )}

          <h1 className={`text-h1 md:text-5xl text-white font-bold drop-shadow-lg ${textAlignClass[textAlign]}`}>
            {title}
          </h1>

          {description && (
            <p className={`text-lg md:text-xl text-white/90 drop-shadow-md ${textAlignClass[textAlign]} max-w-2xl`}>
              {description}
            </p>
          )}

          {children && <div className={contentAlignClass[textAlign]}>{children}</div>}
        </div>
      </div>
    );
  }
);

Hero.displayName = 'Hero';

export default Hero;

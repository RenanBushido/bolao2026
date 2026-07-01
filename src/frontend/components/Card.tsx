import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = '' }, ref) => (
    <div ref={ref} className={`px-6 py-4 border-b border-neutral-200 ${className}`}>
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

const CardBody = React.forwardRef<HTMLDivElement, CardBodyProps>(
  ({ children, className = '' }, ref) => (
    <div ref={ref} className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  )
);

CardBody.displayName = 'CardBody';

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = '' }, ref) => (
    <div ref={ref} className={`px-6 py-4 border-t border-neutral-200 bg-neutral-50 ${className}`}>
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

interface CardComponent extends React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', hover = true }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          bg-white rounded-lg border border-neutral-200 shadow-base
          ${hover ? 'hover:shadow-lg hover:-translate-y-1 transition-all duration-300' : ''}
          ${className}
        `}
      >
        {children}
      </div>
    );
  }
) as CardComponent;

Card.displayName = 'Card';

// Attach subcomponents
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;

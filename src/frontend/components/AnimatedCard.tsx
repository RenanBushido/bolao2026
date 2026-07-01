'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ children, className = '', hover = true, delay = 0, direction = 'up' }, ref) => {
    const getInitialPosition = () => {
      switch (direction) {
        case 'up':
          return { opacity: 0, y: 40 };
        case 'down':
          return { opacity: 0, y: -40 };
        case 'left':
          return { opacity: 0, x: -40 };
        case 'right':
          return { opacity: 0, x: 40 };
        default:
          return { opacity: 0, y: 40 };
      }
    };

    return (
      <motion.div
        ref={ref}
        initial={getInitialPosition()}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <Card hover={hover} className={className}>
          {children}
        </Card>
      </motion.div>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';

export default AnimatedCard;

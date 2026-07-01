'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';

interface AnimatedHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
  className?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const AnimatedHero = React.forwardRef<HTMLDivElement, AnimatedHeroProps>(
  (props, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <Hero {...props}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {props.children}
          </motion.div>
        </Hero>
      </motion.div>
    );
  }
);

AnimatedHero.displayName = 'AnimatedHero';

export default AnimatedHero;

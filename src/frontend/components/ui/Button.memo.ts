/**
 * Button component memoization helpers
 * Re-exports Button with memo for performance optimization
 */

import { memo } from 'react';
import { Button as ButtonComponent } from './Button';

export const Button = memo(ButtonComponent);
Button.displayName = 'Button';

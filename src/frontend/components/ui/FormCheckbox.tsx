'use client';

import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface FormCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const FormCheckbox = ({
  label,
  error,
  disabled = false,
  className,
  id,
  ...props
}: FormCheckboxProps) => {
  const checkboxId = id || props.name;

  const checkboxClassName = clsx(
    'w-4 h-4 rounded transition-colors cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'accent-primary-500',
    error && 'border-red-500',
    className
  );

  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          type="checkbox"
          id={checkboxId}
          className={checkboxClassName}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${checkboxId}-error` : undefined}
          {...props}
        />
      </div>

      {label && (
        <div className="ml-3">
          <label
            htmlFor={checkboxId}
            className={clsx(
              'text-sm font-medium',
              disabled ? 'text-neutral-500 cursor-not-allowed' : 'text-neutral-700 cursor-pointer'
            )}
          >
            {label}
          </label>

          {error && (
            <p id={`${checkboxId}-error`} className="mt-1 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

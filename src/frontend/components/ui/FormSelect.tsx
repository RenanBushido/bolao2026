'use client';

import { SelectHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: Array<{ value: string | number; label: string }> | Array<{ value: string; label: string; disabled?: boolean }>;
  icon?: ReactNode;
}

export const FormSelect = ({
  label,
  error,
  helperText,
  options,
  icon,
  disabled = false,
  className,
  id,
  ...props
}: FormSelectProps) => {
  const selectId = id || props.name;

  const selectClassName = clsx(
    'w-full px-4 py-2 border rounded-lg transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    'disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-500',
    'appearance-none cursor-pointer',
    icon && 'pl-10',
    'pr-8',
    error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500',
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-neutral-700 mb-1"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 pointer-events-none">
            {icon}
          </div>
        )}

        <select
          id={selectId}
          className={selectClassName}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
          {...props}
        >
          {options.map((option) => (
            <option
              key={`${option.value}`}
              value={option.value}
              disabled={'disabled' in option ? option.disabled : false}
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-neutral-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      {error && (
        <p id={`${selectId}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p id={`${selectId}-helper`} className="mt-1 text-sm text-neutral-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

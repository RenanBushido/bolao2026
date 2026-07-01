'use client';

import { InputHTMLAttributes, memo, useCallback } from 'react';
import clsx from 'clsx';

interface InputPalpiteProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  value?: number | string;
  onChange?: (value: number) => void;
  label?: string;
  error?: string;
  team?: string;
}

const InputPalpiteComponent = ({
  value = '',
  onChange,
  label,
  error,
  team,
  disabled = false,
  ...props
}: InputPalpiteProps) => {
  const numValue = typeof value === 'number' ? value : value ? parseInt(value, 10) : '';

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Allow only numbers 0-10
      if (inputValue === '' || (!/\D/.test(inputValue) && Number(inputValue) <= 10)) {
        onChange?.(inputValue === '' ? NaN : Number(inputValue));
      }
    },
    [onChange]
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent non-numeric keys
    if (!/[0-9]|Backspace|Delete|ArrowLeft|ArrowRight|Tab/.test(e.key)) {
      e.preventDefault();
    }
  }, []);

  return (
    <div className="flex flex-col gap-1">
      {(label || team) && (
        <label className="text-xs font-medium text-neutral-700">
          {label || team}
        </label>
      )}

      <input
        type="number"
        min="0"
        max="10"
        value={typeof numValue === 'number' && !isNaN(numValue) ? numValue : ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={clsx(
          'w-16 px-2 py-2 border rounded-lg text-center text-lg font-semibold',
          'focus:outline-none focus:ring-2 focus:ring-offset-0',
          'disabled:bg-neutral-100 disabled:cursor-not-allowed disabled:text-neutral-500',
          error
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-500'
        )}
        aria-label={`Palpite para ${team}`}
        aria-invalid={!!error}
        aria-describedby={error ? 'palpite-error' : undefined}
        {...props}
      />

      {error && (
        <p id="palpite-error" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export const InputPalpite = memo(InputPalpiteComponent);
InputPalpite.displayName = 'InputPalpite';

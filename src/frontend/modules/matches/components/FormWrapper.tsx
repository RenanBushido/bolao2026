'use client';

import { FormHTMLAttributes, ReactNode, memo, useCallback, useState } from 'react';
import clsx from 'clsx';
import { LoadingSpinner, ErrorAlert } from '@/components/ui';

interface FormWrapperProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  children: ReactNode;
  onSubmit?: (formData: FormData) => Promise<void> | void;
  submitLabel?: string;
  isSubmitting?: boolean;
  error?: string;
  success?: string;
  onError?: (error: Error) => void;
  onSuccess?: () => void;
  layout?: 'inline' | 'block';
}

const FormWrapperComponent = ({
  children,
  onSubmit,
  submitLabel = 'Enviar',
  isSubmitting = false,
  error: externalError,
  success: externalSuccess,
  onError,
  onSuccess,
  layout = 'inline',
  className,
  ...props
}: FormWrapperProps) => {
  const [localError, setLocalError] = useState<string | null>(null);
  const [localSuccess, setLocalSuccess] = useState<string | null>(null);
  const [internalLoading, setInternalLoading] = useState(false);

  const isLoading = isSubmitting || internalLoading;
  const error = externalError || localError;
  const success = externalSuccess || localSuccess;

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLocalError(null);
      setLocalSuccess(null);

      if (!onSubmit) return;

      try {
        setInternalLoading(true);
        const formData = new FormData(e.currentTarget);
        await onSubmit(formData);
        setLocalSuccess('Salvo com sucesso!');
        onSuccess?.();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Ocorreu um erro';
        setLocalError(errorMessage);
        onError?.(err instanceof Error ? err : new Error(errorMessage));
      } finally {
        setInternalLoading(false);
      }
    },
    [onSubmit, onError, onSuccess]
  );

  const wrapperClassName = clsx(
    'w-full',
    layout === 'inline' && 'flex gap-2 items-end',
    className
  );

  const contentClassName = clsx(
    layout === 'inline' && 'flex-1'
  );

  return (
    <div className="w-full space-y-2">
      {error && (
        <ErrorAlert
          variant="error"
          message={error}
          onDismiss={() => setLocalError(null)}
        />
      )}

      {success && (
        <ErrorAlert
          variant="info"
          message={success}
          onDismiss={() => setLocalSuccess(null)}
        />
      )}

      <form className={wrapperClassName} onSubmit={handleSubmit} {...props}>
        <div className={contentClassName}>
          {children}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={clsx(
            'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg',
            'bg-primary-500 text-white font-medium',
            'hover:bg-primary-600 transition-colors',
            'disabled:bg-primary-300 disabled:cursor-not-allowed',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            layout === 'inline' && 'flex-shrink-0'
          )}
        >
          {isLoading && <LoadingSpinner size="sm" />}
          {isLoading ? 'Enviando...' : submitLabel}
        </button>
      </form>
    </div>
  );
};

export const FormWrapper = memo(FormWrapperComponent);
FormWrapper.displayName = 'FormWrapper';

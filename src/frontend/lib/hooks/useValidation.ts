'use client';

import { useState, useCallback } from 'react';

export interface ValidationErrors {
  [fieldName: string]: string;
}

interface UseValidationOptions {
  onValidate?: (fieldName: string, value: any) => string | null;
}

export const useValidation = (options?: UseValidationOptions) => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = useCallback(
    (fieldName: string, value: any): boolean => {
      if (options?.onValidate) {
        const error = options.onValidate(fieldName, value);
        if (error) {
          setErrors((prev) => ({ ...prev, [fieldName]: error }));
          return false;
        } else {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[fieldName];
            return newErrors;
          });
          return true;
        }
      }
      return true;
    },
    [options]
  );

  const clearError = useCallback((fieldName: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  const setFieldError = useCallback((fieldName: string, error: string) => {
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  }, []);

  const hasError = useCallback(
    (fieldName: string): boolean => {
      return Boolean(errors[fieldName]);
    },
    [errors]
  );

  const getError = useCallback(
    (fieldName: string): string | null => {
      return errors[fieldName] || null;
    },
    [errors]
  );

  const hasErrors = useCallback((): boolean => {
    return Object.values(errors).some((error) => error.length > 0);
  }, [errors]);

  return {
    errors,
    validateField,
    clearError,
    clearAllErrors,
    setFieldError,
    hasError,
    getError,
    hasErrors,
  };
};

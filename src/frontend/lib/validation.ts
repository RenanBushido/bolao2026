/**
 * Form validation utilities
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Email validation
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return { isValid: false, error: 'Email é obrigatório' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Email inválido' };
  }

  return { isValid: true };
};

/**
 * Password validation
 */
export const validatePassword = (password: string, minLength = 8): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Senha é obrigatória' };
  }

  if (password.length < minLength) {
    return { isValid: false, error: `Senha deve ter pelo menos ${minLength} caracteres` };
  }

  if (!/[A-Z]/.test(password)) {
    return { isValid: false, error: 'Senha deve conter pelo menos uma letra maiúscula' };
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, error: 'Senha deve conter pelo menos um número' };
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return { isValid: false, error: 'Senha deve conter pelo menos um caractere especial (!@#$%^&*)' };
  }

  return { isValid: true };
};

/**
 * Password confirmation validation
 */
export const validatePasswordMatch = (
  password: string,
  confirmation: string
): ValidationResult => {
  if (!confirmation) {
    return { isValid: false, error: 'Confirmação de senha é obrigatória' };
  }

  if (password !== confirmation) {
    return { isValid: false, error: 'As senhas não correspondem' };
  }

  return { isValid: true };
};

/**
 * Name validation
 */
export const validateName = (name: string, minLength = 2): ValidationResult => {
  if (!name) {
    return { isValid: false, error: 'Nome é obrigatório' };
  }

  if (name.length < minLength) {
    return { isValid: false, error: `Nome deve ter pelo menos ${minLength} caracteres` };
  }

  if (!/^[a-záéíóúãõàâêôçñ\s'-]+$/i.test(name)) {
    return { isValid: false, error: 'Nome contém caracteres inválidos' };
  }

  return { isValid: true };
};

/**
 * Score validation (0-10)
 */
export const validateScore = (score: any): ValidationResult => {
  const parsed = parseInt(score, 10);

  if (isNaN(parsed)) {
    return { isValid: false, error: 'Placar deve ser um número' };
  }

  if (parsed < 0 || parsed > 10) {
    return { isValid: false, error: 'Placar deve estar entre 0 e 10' };
  }

  return { isValid: true };
};

/**
 * Match prediction validation
 */
export const validatePrediction = (
  scoreCasa: any,
  scoreVisitante: any
): ValidationResult => {
  const casaValidation = validateScore(scoreCasa);
  if (!casaValidation.isValid) {
    return { isValid: false, error: `Placar do time da casa: ${casaValidation.error}` };
  }

  const visitanteValidation = validateScore(scoreVisitante);
  if (!visitanteValidation.isValid) {
    return { isValid: false, error: `Placar do time visitante: ${visitanteValidation.error}` };
  }

  return { isValid: true };
};

/**
 * Login form validation
 */
export interface LoginFormData {
  email: string;
  password: string;
}

export const validateLoginForm = (data: LoginFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error || '';
  }

  const passwordValidation = validatePassword(data.password, 6);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error || '';
  }

  return errors;
};

/**
 * Signup form validation
 */
export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const validateSignupForm = (data: SignupFormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  const nameValidation = validateName(data.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.error || '';
  }

  const emailValidation = validateEmail(data.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error || '';
  }

  const passwordValidation = validatePassword(data.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error || '';
  }

  const matchValidation = validatePasswordMatch(data.password, data.passwordConfirmation);
  if (!matchValidation.isValid) {
    errors.passwordConfirmation = matchValidation.error || '';
  }

  return errors;
};

/**
 * Check if object has any validation errors
 */
export const hasErrors = (errors: Record<string, string>): boolean => {
  return Object.values(errors).some((error) => error.length > 0);
};

/**
 * Get error message for a field
 */
export const getFieldError = (errors: Record<string, string>, fieldName: string): string | null => {
  return errors[fieldName] || null;
};

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { ErrorAlert } from '@/components/ui/ErrorAlert';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { signup } from '@/modules/auth/actions/authActions';
import { validateSignupForm } from '@/lib/validation';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (field: string, value: string) => {
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'passwordConfirmation':
        setPasswordConfirm(value);
        break;
    }
    // Clear field error when user starts typing
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validate form
      const errors = validateSignupForm({
        name,
        email,
        password,
        passwordConfirmation: passwordConfirm,
      });
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        setIsLoading(false);
        return;
      }

      await signup(email, password, name);
      router.push('/palpites');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar conta';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">⚽</div>
            <h1 className="text-2xl font-bold text-neutral-900">Bolão 2026</h1>
            <p className="text-neutral-600 mt-2">Criar uma nova conta</p>
          </div>

          {/* Error alert */}
          {error && (
            <ErrorAlert
              message={error}
              variant="error"
              onDismiss={() => setError(null)}
            />
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <FormInput
              label="Nome Completo"
              type="text"
              value={name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              placeholder="Seu nome"
              disabled={isLoading}
              error={fieldErrors.name}
            />

            <FormInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              placeholder="seu@email.com"
              disabled={isLoading}
              error={fieldErrors.email}
            />

            <FormInput
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              placeholder="Mínimo 8 caracteres"
              disabled={isLoading}
              error={fieldErrors.password}
              helperText="Deve conter letra maiúscula, número e caractere especial (!@#$%^&*)"
            />

            <FormInput
              label="Confirmar Senha"
              type="password"
              value={passwordConfirm}
              onChange={(e) => handleFieldChange('passwordConfirmation', e.target.value)}
              placeholder="Confirme sua senha"
              disabled={isLoading}
              error={fieldErrors.passwordConfirmation}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  Criando conta...
                </>
              ) : (
                'Criar Conta'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">Já tem conta?</span>
            </div>
          </div>

          {/* Sign in link */}
          <Link href="/login">
            <Button variant="outline" size="lg" fullWidth>
              Entrar
            </Button>
          </Link>

          {/* Terms */}
          <p className="text-center text-xs text-neutral-500 mt-6">
            Ao criar uma conta, você concorda com nossos{' '}
            <button className="text-primary-600 hover:text-primary-700">Termos de Uso</button> e{' '}
            <button className="text-primary-600 hover:text-primary-700">Política de Privacidade</button>
          </p>
        </div>
      </div>
    </div>
  );
}

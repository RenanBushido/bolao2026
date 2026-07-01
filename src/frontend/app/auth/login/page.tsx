'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { FormInput } from '@/components/ui/FormInput';
import { ErrorAlert } from '@/components/ui/ErrorAlert';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { login } from '@/modules/auth/actions/authActions';
import { validateLoginForm } from '@/lib/validation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (field: string, value: string) => {
    if (field === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
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
      const errors = validateLoginForm({ email, password });
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        setIsLoading(false);
        return;
      }

      await login(email, password);
      router.push('/palpites');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao fazer login';
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
            <p className="text-neutral-600 mt-2">Entrar na sua conta</p>
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
              placeholder="Sua senha"
              disabled={isLoading}
              error={fieldErrors.password}
              helperText="Mínimo 6 caracteres"
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
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500">Novo por aqui?</span>
            </div>
          </div>

          {/* Sign up link */}
          <Link href="/signup">
            <Button variant="outline" size="lg" fullWidth>
              Criar Conta
            </Button>
          </Link>

          {/* Help text */}
          <p className="text-center text-sm text-neutral-600 mt-6">
            Problemas ao entrar?{' '}
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              Redefinir senha
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

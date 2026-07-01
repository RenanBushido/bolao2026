'use client';

import { ReactNode } from 'react';
import { LayoutShell } from '@/components/layout/LayoutShell';
import { useAuth } from '@/modules/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Redirecionando para login...</p>
      </div>
    );
  }

  return (
    <LayoutShell
      isAuthenticated={isAuthenticated}
      userEmail={user?.email}
      onLogout={() => {
        // Logout will be handled by button click
      }}
    >
      {children}
    </LayoutShell>
  );
}

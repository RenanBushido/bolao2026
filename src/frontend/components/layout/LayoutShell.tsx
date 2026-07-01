'use client';

import { ReactNode, useState, useCallback } from 'react';
import clsx from 'clsx';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutShellProps {
  children: ReactNode;
  isAuthenticated?: boolean;
  userEmail?: string;
  onLogout?: () => void;
}

export const LayoutShell = ({
  children,
  isAuthenticated = false,
  userEmail,
  onLogout,
}: LayoutShellProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <Navbar
        isAuthenticated={isAuthenticated}
        userEmail={userEmail}
        onLogout={onLogout}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={toggleMobileMenu}
        onCloseMobileMenu={closeMobileMenu}
      />

      {/* Main Content */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

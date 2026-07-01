'use client';

import Link from 'next/link';
import { useCallback, memo } from 'react';
import clsx from 'clsx';
import { Button } from '../ui/Button';

interface NavbarProps {
  isAuthenticated?: boolean;
  userEmail?: string;
  onLogout?: () => void;
  mobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
  onCloseMobileMenu?: () => void;
}

const NavbarComponent = ({
  isAuthenticated = false,
  userEmail,
  onLogout,
  mobileMenuOpen = false,
  onToggleMobileMenu,
  onCloseMobileMenu,
}: NavbarProps) => {
  const handleLogout = useCallback(() => {
    onLogout?.();
  }, [onLogout]);

  const navLinks = [
    { href: '/', label: 'Início' },
    { href: '/palpites', label: 'Palpites', protected: true },
    { href: '/leaderboard', label: 'Ranking', protected: true },
  ];

  const visibleLinks = isAuthenticated
    ? navLinks
    : navLinks.filter((link) => !link.protected);

  return (
    <nav className="bg-white border-b border-neutral-200 sticky top-0 z-40">
      <div className="container-base">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-primary-600 hover:text-primary-700 transition-colors"
          >
            <span>⚽</span>
            <span className="hidden sm:inline">Bolão 2026</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {visibleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-neutral-700 hover:text-primary-600 transition-colors font-medium text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-neutral-600">{userEmail}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                >
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Entrar</Link>
                </Button>
                <Button variant="primary" size="sm" asChild>
                  <Link href="/signup">Cadastrar</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4 space-y-3">
            {visibleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-neutral-700 hover:text-primary-600 hover:bg-neutral-50 rounded-lg transition-colors"
                onClick={onCloseMobileMenu}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 px-4 border-t border-neutral-200 space-y-2">
              {isAuthenticated ? (
                <>
                  <p className="text-sm text-neutral-600 mb-2">{userEmail}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    fullWidth
                    onClick={handleLogout}
                  >
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" fullWidth asChild>
                    <Link href="/login" onClick={onCloseMobileMenu}>
                      Entrar
                    </Link>
                  </Button>
                  <Button variant="primary" size="sm" fullWidth asChild>
                    <Link href="/signup" onClick={onCloseMobileMenu}>
                      Cadastrar
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export const Navbar = memo(NavbarComponent);
Navbar.displayName = 'Navbar';

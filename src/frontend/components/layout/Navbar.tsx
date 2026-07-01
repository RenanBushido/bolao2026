'use client';

import Link from 'next/link';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#' },
    { label: 'Jogos', href: '#games' },
    { label: 'Grupos', href: '#groups' },
    { label: 'Equipes', href: '#teams' },
    { label: 'Ranking', href: '#ranking' },
    { label: 'Simulador', href: '#simulator' },
  ];

  return (
    <nav className="h-20 bg-[#060B16] border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Globe className="w-8 h-8 text-[#D4AF37]" />
          <span className="text-white font-bold text-xl tracking-wider">Portal Copa26</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#A0AEC0] hover:text-[#D4AF37] transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 bg-[#D4AF37] text-[#060B16] px-4 py-2 rounded-full font-bold hover:bg-[#E5C158] transition-colors">
            <Globe className="w-4 h-4" />
            <span className="text-sm">FIFA 2026</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-[#D4AF37] transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#101826] border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-[#A0AEC0] hover:text-[#D4AF37] transition-colors text-sm font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button className="w-full flex items-center justify-center gap-2 bg-[#D4AF37] text-[#060B16] px-4 py-2 rounded-full font-bold hover:bg-[#E5C158] transition-colors mt-4">
              <Globe className="w-4 h-4" />
              <span className="text-sm">FIFA 2026</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

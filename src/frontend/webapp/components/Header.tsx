'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import HeaderMenu from './HeaderMenu'
import Button from './ui/Button'
import Logo from './Logo'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="fixed w-full z-50 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <Logo />
                    <HeaderMenu className="hidden md:flex items-center gap-8" />
                    <Button className="hidden sm:block px-4 py-2 text-sm">REGISTRE-SE</Button>
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
                {mobileMenuOpen && (
                    <>
                        <HeaderMenu className="md:hidden mt-4 pb-4 flex flex-col gap-3" />
                        <Button className="w-full mt-3">REGISTRE-SE</Button>
                    </>
                )}
            </div>
        </header>
    )
}

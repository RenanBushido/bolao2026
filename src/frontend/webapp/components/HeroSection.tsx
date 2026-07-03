'use client'

import { Play } from 'lucide-react'
import Button from './ui/Button'
import { twMerge } from 'tailwind-merge'

interface HeroSectionProps {
    eyebrow?: string
    titulo?: string
    tituloDestaque?: string
    descricao?: string
    ctaPrimario?: { label: string; onClick?: () => void }
    ctaSecundario?: { label: string; onClick?: () => void }
    className?: string
}

export default function HeroSection({
    eyebrow = 'ONE TEAM, ONE DREAM',
    titulo = 'LIVE FOR',
    tituloDestaque = 'FOOTBALL',
    descricao = 'We are more than a club. We are a family. Professional player development and training since 1995.',
    ctaPrimario = { label: 'JOIN OUR CLUB' },
    ctaSecundario = { label: 'WATCH VIDEO' },
    className,
}: HeroSectionProps) {
    return (
        <section className={twMerge('relative pt-24 pb-12 overflow-hidden', className)}>
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0f18]" />
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'radial-gradient(circle at 30% 40%, rgba(204, 255, 0, 0.03) 0%, transparent 50%)',
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Left Content */}
                    <div className="text-white">
                        <div className="inline-block mb-4">
                            <p className="text-primary text-sm font-bold tracking-widest">{eyebrow}</p>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
                            {titulo}
                            <span className="text-primary block">{tituloDestaque}</span>
                        </h1>

                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">{descricao}</p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button onClick={ctaPrimario.onClick}>{ctaPrimario.label}</Button>
                            <Button
                                variant="outline"
                                icon={<Play size={18} fill="currentColor" />}
                                onClick={ctaSecundario.onClick}
                            >
                                {ctaSecundario.label}
                            </Button>
                        </div>
                    </div>

                    {/* Right Content - Player Image Area */}
                    <div className="relative h-96 md:h-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-2xl" />
                        <div className="absolute inset-0 flex items-center justify-center text-gray-600">
                            <div className="text-center">
                                <p className="text-sm">Featured Player Section</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

import { twMerge } from 'tailwind-merge'

interface LogoProps {
    className?: string
}

export default function Logo({ className }: LogoProps) {
    return (
        <div className={twMerge('flex items-center gap-2', className)}>
            <div className="flex items-center justify-center">
                <a href="/Home">
                    <img
                        src="/assets/fifa-world-cup-2026-logo.png"
                        width="32px"
                        height="48px"
                        alt="Copa do Mundo de 2026"
                    />
                </a>
            </div>
            <span className="text-white font-bold text-lg hidden sm:inline">
                BOLÃO
            </span>
            <span className="text-gray-400 text-xs hidden sm:inline">
                COPA DO MUNDO 2026
            </span>
        </div>
    )
}

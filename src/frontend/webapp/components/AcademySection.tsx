import { twMerge } from 'tailwind-merge'
import FeatureCard from './FeatureCard'

interface AcademySectionProps {
    className?: string
}

const ACADEMY_CARDS = [
    {
        id: '1',
        titulo: 'WORLD CLASS ACADEMY',
        descricao: 'Professional coaching and state of the art training facilities',
        rotulo: 'LEARN MORE',
        href: '#',
        icon: (
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
            </svg>
        ),
    },
    {
        id: '2',
        titulo: 'ELITE TEAMS',
        descricao: 'Compete at the highest level with international tournaments',
        rotulo: 'VIEW TEAMS',
        href: '#',
        icon: (
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
            </svg>
        ),
    },
    {
        id: '3',
        titulo: 'MATCH FIXTURES',
        descricao: 'Upcoming matches and tournament schedule',
        rotulo: 'VIEW FIXTURES',
        href: '#',
        icon: (
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        ),
    },
]

export default function AcademySection({ className }: AcademySectionProps) {
    return (
        <section className={twMerge('py-12 px-4 sm:px-6 lg:px-8', className)}>
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-6">
                    {ACADEMY_CARDS.map((card) => (
                        <FeatureCard
                            key={card.id}
                            icon={card.icon}
                            titulo={card.titulo}
                            descricao={card.descricao}
                            rotulo={card.rotulo}
                            href={card.href}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

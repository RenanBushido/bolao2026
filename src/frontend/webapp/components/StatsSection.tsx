import { twMerge } from 'tailwind-merge'
import StatItem from './StatItem'

interface StatsSectionProps {
    className?: string
}

const STATS = [
    { valor: '18', rotulo: 'YEARS SINCE' },
    { valor: '250+', rotulo: 'PLAYERS DEVELOPED' },
    { valor: '25K+', rotulo: 'FANS WORLDWIDE' },
    { valor: '10', rotulo: 'TROPHY CONNECTIONS' },
]

export default function StatsSection({ className }: StatsSectionProps) {
    return (
        <section className={twMerge('py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-transparent', className)}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {STATS.map((stat, idx) => (
                        <StatItem key={idx} valor={stat.valor} rotulo={stat.rotulo} />
                    ))}
                </div>
            </div>
        </section>
    )
}

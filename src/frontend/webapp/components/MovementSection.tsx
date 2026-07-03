import { twMerge } from 'tailwind-merge'
import FeatureListItem from './FeatureListItem'

interface MovementSectionProps {
    className?: string
}

const MOVEMENT_ITEMS = [
    {
        titulo: 'Professional Development',
        descricao: 'World-class coaching from industry experts',
    },
    {
        titulo: 'Community Impact',
        descricao: 'Building stronger communities through sports',
    },
    {
        titulo: 'Global Opportunities',
        descricao: 'International tournaments and partnerships',
    },
]

export default function MovementSection({ className }: MovementSectionProps) {
    return (
        <section className={twMerge('py-16 px-4 sm:px-6 lg:px-8 relative', className)}>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="bg-gradient-to-r from-[#1a2f4a]/50 to-[#0f1a28]/50 border border-primary/10 rounded-2xl p-8 md:p-12">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        MORE THAN A CLUB,
                        <span className="text-primary block">A MOVEMENT</span>
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                        <div>
                            <p className="text-gray-300 text-base leading-relaxed">
                                We believe in transforming lives through football. Our academy provides not just
                                training, but a holistic development program that shapes future champions and
                                responsible citizens.
                            </p>
                        </div>
                        <div className="space-y-4">
                            {MOVEMENT_ITEMS.map((item, idx) => (
                                <FeatureListItem
                                    key={idx}
                                    titulo={item.titulo}
                                    descricao={item.descricao}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

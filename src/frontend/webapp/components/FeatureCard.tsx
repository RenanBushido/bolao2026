import { twMerge } from 'tailwind-merge'

interface FeatureCardProps {
    icon: React.ReactNode
    titulo: string
    descricao: string
    rotulo: string
    href: string
    className?: string
}

export default function FeatureCard({
    icon,
    titulo,
    descricao,
    rotulo,
    href,
    className,
}: FeatureCardProps) {
    return (
        <div
            className={twMerge(
                'bg-gradient-to-br from-[#1a2f4a] to-[#0f1a28] border border-primary/10 rounded-xl p-8 hover:border-primary/30 transition group',
                className
            )}
        >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                {icon}
            </div>
            <h3 className="text-white text-xl font-bold mb-2">{titulo}</h3>
            <p className="text-gray-400 text-sm mb-4">{descricao}</p>
            <a href={href} className="text-primary font-bold text-sm hover:text-white transition">
                {rotulo} →
            </a>
        </div>
    )
}

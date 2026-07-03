import { twMerge } from 'tailwind-merge'

interface StatItemProps {
    valor: string
    rotulo: string
    className?: string
}

export default function StatItem({ valor, rotulo, className }: StatItemProps) {
    return (
        <div className={twMerge('text-center', className)}>
            <div className="text-4xl md:text-5xl font-black text-primary mb-2">{valor}</div>
            <p className="text-gray-400 text-sm">{rotulo}</p>
        </div>
    )
}

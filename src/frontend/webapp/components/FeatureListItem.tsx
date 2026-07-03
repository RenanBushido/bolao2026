import { twMerge } from 'tailwind-merge'

interface FeatureListItemProps {
    titulo: string
    descricao: string
    className?: string
}

export default function FeatureListItem({ titulo, descricao, className }: FeatureListItemProps) {
    return (
        <div className={twMerge('flex items-start gap-4', className)}>
            <div className="w-6 h-6 bg-primary rounded-full mt-1 flex-shrink-0" />
            <div>
                <p className="text-white font-bold">{titulo}</p>
                <p className="text-gray-400 text-sm">{descricao}</p>
            </div>
        </div>
    )
}

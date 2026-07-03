import { twMerge } from 'tailwind-merge'
import type { MenuItem } from './types'

interface FooterLinkColumnProps {
    titulo: string
    links: MenuItem[]
    className?: string
}

export default function FooterLinkColumn({ titulo, links, className }: FooterLinkColumnProps) {
    return (
        <div className={twMerge('', className)}>
            <h4 className="text-white font-bold mb-4">{titulo}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
                {links.map((link) => (
                    <li key={link.id}>
                        <a href={link.href} className="hover:text-primary transition">
                            {link.nome}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

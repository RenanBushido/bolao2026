import { twMerge } from 'tailwind-merge'
import type { MenuItem } from './types'
import Logo from './Logo'
import FooterLinkColumn from './FooterLinkColumn'

interface FooterProps {
    className?: string
}

const FOOTER_COLUMNS: Array<{ titulo: string; links: MenuItem[] }> = [
    {
        titulo: 'ACADEMY',
        links: [
            { id: '1', nome: 'Programs', href: '#' },
            { id: '2', nome: 'Coaching Staff', href: '#' },
            { id: '3', nome: 'Facilities', href: '#' },
        ],
    },
    {
        titulo: 'TEAMS',
        links: [
            { id: '1', nome: 'U-12 to U-17', href: '#' },
            { id: '2', nome: 'Elite Teams', href: '#' },
            { id: '3', nome: 'Professional', href: '#' },
        ],
    },
    {
        titulo: 'CONNECT',
        links: [
            { id: '1', nome: 'Facebook', href: '#' },
            { id: '2', nome: 'Instagram', href: '#' },
            { id: '3', nome: 'Twitter', href: '#' },
        ],
    },
]

export default function Footer({ className }: FooterProps) {
    return (
        <footer
            className={twMerge(
                'border-t border-primary/10 bg-gradient-to-b from-[#0f1a28] to-[#0a0f18] py-12 px-4 sm:px-6 lg:px-8',
                className
            )}
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="mb-4">
                            <Logo />
                        </div>
                        <p className="text-gray-400 text-sm">Building champions on and off the field</p>
                    </div>
                    {FOOTER_COLUMNS.map((column) => (
                        <FooterLinkColumn
                            key={column.titulo}
                            titulo={column.titulo}
                            links={column.links}
                        />
                    ))}
                </div>

                <div className="border-t border-primary/10 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
                        <p>&copy; 2024 Football For Life Academy. All rights reserved.</p>
                        <div className="flex gap-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-primary transition">
                                Privacy Policy
                            </a>
                            <a href="#" className="hover:text-primary transition">
                                Terms of Service
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

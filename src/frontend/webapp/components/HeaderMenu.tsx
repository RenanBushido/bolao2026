import { useMenus } from '@/app/context/MenuContext'
import { twMerge } from 'tailwind-merge'

interface HeaderProps {
    className?: string
}

export default function HeaderMenu({ className }: HeaderProps) {
    const menus = useMenus()
    return (
        <nav className={twMerge(className)}>
            {menus.map((m) => (
                <a
                    id={m.id}
                    key={m.id}
                    href={m.href}
                    className="text-gray-300 hover:text-white text-sm font-medium"
                >
                    {m.nome}
                </a>
            ))}
        </nav>
    )
}

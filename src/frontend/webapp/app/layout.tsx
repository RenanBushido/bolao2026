import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CarregarMenus } from './actions/menu-app'
import { MenuProvider } from './context/MenuContext'

const inter = Inter({
    variable: '--font-inter',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'Copa 2026 - Simulador Oficial FIFA World Cup',
    description:
        'Portal oficial de simulação e palpites da Copa do Mundo FIFA 2026',
    keywords: [
        'FIFA 2026',
        'World Cup',
        'Copa do Mundo',
        'Simulador',
        'Palpites',
    ],
}

export const dynamic = 'force-dynamic'

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const menus = await CarregarMenus()

    return (
        <html lang="en" className={`${inter.variable} antialiased`}>
            <body>
                <MenuProvider initialMenus={menus}>
                    <Header />
                    {children}
                    <Footer />
                </MenuProvider>
            </body>
        </html>
    )
}

'use client'

import { MenuItem } from '@/components/types'
import React, { createContext, useContext } from 'react'

const MenuContext = createContext<MenuItem[] | undefined>(undefined)

export function MenuProvider({
    children,
    initialMenus,
}: {
    children: React.ReactNode
    initialMenus: MenuItem[]
}) {
    return (
        <MenuContext.Provider value={initialMenus}>
            {children}
        </MenuContext.Provider>
    )
}

export function useMenus() {
    const context = useContext(MenuContext)

    if(context === undefined) {
        throw new Error("useMenus deve ser usado dentro de um MenuProvider")
    }

    return context
}

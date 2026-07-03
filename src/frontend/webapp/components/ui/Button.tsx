'use client'

import { twMerge } from 'tailwind-merge'
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'solid' | 'outline'
    icon?: React.ReactNode
}

export default function Button({
    variant = 'solid',
    icon,
    className,
    children,
    ...props
}: ButtonProps) {
    const variantClasses = {
        solid: 'bg-primary text-black hover:bg-[#b8e600]',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-black',
    }

    const baseClasses = 'px-8 py-3 rounded-lg font-bold transition'

    return (
        <button
            className={twMerge(baseClasses, variantClasses[variant], className)}
            {...props}
        >
            {icon && <span className="inline-flex items-center gap-2">{icon}{children}</span>}
            {!icon && children}
        </button>
    )
}

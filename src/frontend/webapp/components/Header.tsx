import Image from "next/image";
import HeaderMenu from "./HeaderMenu";

export default function Header() {
    return (
        <header className="fixed w-full z-50 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center">
                            <Image src={"/assets/fifa-world-cup-2026-logo.png"} alt={"Copa do Mundo de 20026"} width={32} height={48} />
                        </div>
                        <span className="text-white font-bold text-lg hidden sm:inline">BOLÃO </span>
                        <span className="text-gray-400 text-xs hidden sm:inline">COPA DO MUNDO 2026</span>
                    </div>
                    {/* Desktop Menu */}
                    <HeaderMenu />
                </div>
            </div>
        </header>
    )
}

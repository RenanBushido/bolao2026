import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Copa 2026 - Simulador Oficial FIFA World Cup",
  description: "Portal oficial de simulação e palpites da Copa do Mundo FIFA 2026",
  keywords: ["FIFA 2026", "World Cup", "Copa do Mundo", "Simulador", "Palpites"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-gradient-to-b from-[#1a2f4a] via-[#0f1a28] to-[#0a0f18]">
        <Header />
        {children}</body>
    </html>
  );
}

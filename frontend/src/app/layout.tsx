// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema de Notificação Judicial",
  description: "Sistema para gerenciamento de notificações judiciais",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <h1 className="text-xl font-bold text-gray-800">Lawgic - Sistema Judicial</h1>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
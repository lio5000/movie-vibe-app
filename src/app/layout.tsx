import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Film, Search, Heart, Home } from "lucide-react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MovieVibe - AI Vibe Coding",
  description:
    "Aplicación de películas construida con Next.js 16 y Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen flex flex-col`}
      >
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-indigo-400"
            >
              <Film className="w-6 h-6 text-indigo-500" />
              <span>MovieVibe</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link
                href="/"
                className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
              >
                <Home className="w-4 h-4" /> Inicio
              </Link>
              <Link
                href="/search"
                className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
              >
                <Search className="w-4 h-4" /> Buscar
              </Link>
              <Link
                href="/favorites"
                className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
              >
                <Heart className="w-4 h-4" /> Favoritos
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6">
          {children}
        </main>
        <footer className="border-t border-slate-800 text-center py-4 text-xs text-slate-500">
          Desarrollado con Next.js 16 • Vibe Coding AI Workflow
        </footer>
      </body>
    </html>
  );
}

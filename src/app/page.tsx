import { getTrendingMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import { TrendingUp } from "lucide-react";

export default async function HomePage() {
  const movies = await getTrendingMovies();

  return (
    <div className="space-y-6">
      <section className="bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 md:p-10">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">
          Explora el Cine con <span className="text-indigo-400">MovieVibe</span>
        </h1>
        <p className="text-slate-300 max-w-2xl text-sm md:text-base">
          Aplicación moderna construida con Next.js 16 (App Router), Server
          Components y Tailwind CSS mediante la metodología Vibe Coding.
        </p>
      </section>

      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          <h2 className="text-xl font-bold text-slate-100">
            Películas en Tendencia
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { searchMovies, Movie } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import { Search as SearchIcon, Loader2 } from "lucide-react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const results = await searchMovies(query);
      setMovies(results);
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="max-w-xl mx-auto space-y-2">
        <h1 className="text-2xl font-bold text-center">
          Buscador de Películas
        </h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Escribe el nombre de una película..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-11 pr-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <SearchIcon className="w-5 h-5 text-slate-500 absolute left-3.5 top-3.5" />
        </div>
      </div>

      {loading && (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
        </div>
      )}

      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {!loading && query && movies.length === 0 && (
        <p className="text-center text-slate-400 py-12">
          No se encontraron resultados para "{query}".
        </p>
      )}
    </div>
  );
}

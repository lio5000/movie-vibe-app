"use client";

import { useState, useEffect } from "react";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/lib/tmdb";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("movie_favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
        <h1 className="text-2xl font-bold">Mis Películas Favoritas</h1>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
          <p className="text-slate-400">
            Aún no has guardado películas en favoritos.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

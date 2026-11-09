"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, Heart } from "lucide-react";
import { Movie, IMAGE_BASE } from "@/lib/tmdb";

export default function MovieCard({ movie }: { movie: Movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("movie_favorites");
    if (saved) {
      try {
        const favs: Movie[] = JSON.parse(saved);
        setIsFavorite(favs.some((m) => m.id === movie.id));
      } catch {
        setIsFavorite(false);
      }
    }
  }, [movie.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const saved = localStorage.getItem("movie_favorites");
    let favs: Movie[] = saved ? JSON.parse(saved) : [];

    if (isFavorite) {
      favs = favs.filter((m) => m.id !== movie.id);
      setIsFavorite(false);
    } else {
      favs.push(movie);
      setIsFavorite(true);
    }

    localStorage.setItem("movie_favorites", JSON.stringify(favs));
    window.dispatchEvent(new Event("storage"));
  };

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 flex flex-col relative"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-800">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Botón para guardar en Favoritos */}
        <button
          onClick={toggleFavorite}
          className="absolute top-2 left-2 p-2 rounded-full bg-slate-950/70 backdrop-blur text-white hover:scale-110 transition-transform z-10"
          title={isFavorite ? "Quitar de favoritos" : "Guardar en favoritos"}
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "text-rose-500 fill-rose-500" : "text-slate-300"
            }`}
          />
        </button>

        <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-amber-400 flex items-center gap-1">
          <Star className="w-3 h-3 fill-amber-400" />
          {movie.vote_average?.toFixed(1) || "N/A"}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <h3 className="font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">
          {movie.title}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          {movie.release_date
            ? new Date(movie.release_date).getFullYear()
            : "S/D"}
        </p>
      </div>
    </Link>
  );
}

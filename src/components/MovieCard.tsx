import Link from "next/link";
import { Star } from "lucide-react";
import { Movie, IMAGE_BASE } from "@/lib/tmdb";

export default function MovieCard({ movie }: { movie: Movie }) {
  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-slate-800">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
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

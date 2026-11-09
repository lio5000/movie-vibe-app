import { getMovieDetails, IMAGE_BASE } from "@/lib/tmdb";
import { notFound } from "next/navigation";
import { Star, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MovieDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const movie = await getMovieDetails(resolvedParams.id);

  if (!movie) notFound();

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al inicio
      </Link>

      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
        {backdropUrl && (
          <div className="absolute inset-0 z-0 opacity-20">
            <img
              src={backdropUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="relative z-10 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
          <img
            src={
              movie.poster_path
                ? `${IMAGE_BASE}${movie.poster_path}`
                : "https://via.placeholder.com/500x750"
            }
            alt={movie.title}
            className="w-48 md:w-64 rounded-xl shadow-lg border border-slate-700 mx-auto md:mx-0"
          />

          <div className="space-y-4 flex-1">
            <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-4 h-4 fill-amber-400" />
                {movie.vote_average?.toFixed(1)} / 10
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Calendar className="w-4 h-4" />
                {movie.release_date}
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-indigo-400">
                Sinopsis
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                {movie.overview || "Sin sinopsis disponible."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

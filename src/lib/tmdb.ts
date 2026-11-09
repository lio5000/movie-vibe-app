const BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_BASE_URL || "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "demo_key";
export const IMAGE_BASE =
  process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE || "https://image.tmdb.org/t/p/w500";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

export async function getTrendingMovies(): Promise<Movie[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`,
      {
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) throw new Error("Error al obtener películas");
    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
}

export async function getMovieDetails(id: string): Promise<Movie | null> {
  try {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query) return [];
  try {
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
}

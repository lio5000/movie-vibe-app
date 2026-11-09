export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

export const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const DEMO_MOVIES: Movie[] = [
  {
    id: 550,
    title: "Fight Club",
    overview:
      "Un empleado de oficina insomne y un fabricante de jabón descuidado forman un club de lucha subterráneo.",
    poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    backdrop_path: "/hZk2yOoVYUvd2KHYxRKhhVJ4kMm.jpg",
    vote_average: 8.4,
    release_date: "1999-10-15",
  },
  {
    id: 157336,
    title: "Interstellar",
    overview:
      "Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por garantizar la supervivencia de la humanidad.",
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/xJHokMbljvjADYdit5fKSuV0yEG.jpg",
    vote_average: 8.4,
    release_date: "2014-11-05",
  },
  {
    id: 27205,
    title: "Inception",
    overview:
      "Un ladrón que roba secretos corporativos a través del uso de la tecnología de intercambio de sueños recibe la tarea inversa.",
    poster_path: "/lF2WZq2z4juUuXxTXlYZB1uYjh9.jpg",
    backdrop_path: "/8ZTVqvKDQ8emSGUEMjsS4yHAuKQ.jpg",
    vote_average: 8.3,
    release_date: "2010-07-15",
  },
  {
    id: 155,
    title: "The Dark Knight",
    overview:
      "Batman levanta las apuestas en su guerra contra el crimen con la ayuda del teniente Jim Gordon y el fiscal de distrito Harvey Dent.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/dqK9Hag1054yghRQSqAwh5WvA95.jpg",
    vote_average: 8.5,
    release_date: "2008-07-16",
  },
  {
    id: 680,
    title: "Pulp Fiction",
    overview:
      "Las vidas de dos sicarios de la mafia, un boxeador, un gánster y su esposa se entrelazan en cuatro historias de violencia y redención.",
    poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cf4p3.jpg",
    vote_average: 8.5,
    release_date: "1994-09-10",
  },
  {
    id: 19995,
    title: "Avatar",
    overview:
      "En el siglo 22, un parapléjico enviado a la luna Pandora se encuentra desgarrado entre seguir sus órdenes y proteger el mundo que siente como su hogar.",
    poster_path: "/kyeqWdyUXW608qlYkR30mRjweBD.jpg",
    backdrop_path: "/vL5LR6WdxWPjUnFRiayjGJmG2sY.jpg",
    vote_average: 7.6,
    release_date: "2009-12-15",
  },
  {
    id: 299536,
    title: "Avengers: Infinity War",
    overview:
      "Los Vengadores y sus aliados deben estar dispuestos a sacrificarlo todo en un intento de derrotar al poderoso Thanos.",
    poster_path: "/7WsyChvLEzGlWv2S9GODv9ywem1.jpg",
    backdrop_path: "/bOGkgRGdhrBYJSLpGeghCjaUMj7.jpg",
    vote_average: 8.3,
    release_date: "2018-04-25",
  },
];

export async function getTrendingMovies(): Promise<Movie[]> {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=f81980cf9e32014022c95b00c3b00609",
      {
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return DEMO_MOVIES;
    const data = await res.json();
    return data.results && data.results.length > 0 ? data.results : DEMO_MOVIES;
  } catch {
    return DEMO_MOVIES;
  }
}

export async function getMovieDetails(id: string): Promise<Movie | null> {
  const found = DEMO_MOVIES.find((m) => m.id.toString() === id);
  if (found) return found;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=f81980cf9e32014022c95b00c3b00609`,
    );
    if (!res.ok) return DEMO_MOVIES[0];
    return await res.json();
  } catch {
    return DEMO_MOVIES[0];
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) return [];

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=f81980cf9e32014022c95b00c3b00609&query=${encodeURIComponent(cleanQuery)}`,
    );
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        return data.results;
      }
    }
  } catch {
    // Si falla la API externa, pasa al filtro local abajo
  }

  // Filtro flexible local por título o sinopsis
  return DEMO_MOVIES.filter(
    (m) =>
      m.title.toLowerCase().includes(cleanQuery) ||
      m.overview.toLowerCase().includes(cleanQuery),
  );
}

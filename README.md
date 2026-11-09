# MovieVibe - Next.js 16 Vibe Coding App

Aplicación web moderna para la búsqueda y exploración de películas desarrollada con **Next.js 16 (App Router)**, **TypeScript** y **Tailwind CSS**, guiada bajo la metodología de **Vibe Coding con IA**.

## Enlace al Proyecto Desplegado

- **URL de Producción:** `[PEGA_AQUÍ_TU_LINK_DE_NETLIFY]`

## Tecnologías Utilizadas

- **Framework:** Next.js 16 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Iconos:** Lucide React
- **API:** TMDB (The Movie Database API)
- **Despliegue:** Netlify

## Funcionalidades Principales

1. **Inicio (`/`):** Banner principal y listado en tiempo real de películas en tendencia utilizando _Server Components_.
2. **Buscador (`/search`):** Búsqueda interactiva con debounce optimizado usando _Client Components_ (`useState` y `useEffect`).
3. **Detalle (`/movie/[id]`):** Vista dinámica de información completa y sinopsis.
4. **Favoritos (`/favorites`):** Colección persistente en el navegador vía `localStorage`.
5. **Manejadores de UI:** Esqueletos de carga (`loading.tsx`) y pantallas de manejo de errores (`error.tsx`).

## Instrucciones de Instalación Local

```bash
# 1. Clonar el repositorio
git clone [https://github.com/TU_USUARIO/movie-vibe-app.git](https://github.com/TU_USUARIO/movie-vibe-app.git)

# 2. Entrar a la carpeta del proyecto
cd movie-vibe-app

# 3. Instalar dependencias
npm install

# 4. Configurar variables de entorno (.env.local)
NEXT_PUBLIC_TMDB_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_TMDB_BASE_URL=[https://api.themoviedb.org/3](https://api.themoviedb.org/3)
NEXT_PUBLIC_TMDB_IMAGE_BASE=[https://image.tmdb.org/t/p/w500](https://image.tmdb.org/t/p/w500)

# 5. Iniciar el servidor de desarrollo
npm run dev
```

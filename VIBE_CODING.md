# Informe de Proceso de Vibe Coding

Este documento registra la metodología, prompts, decisiones técnicas y la interacción con asistentes de Inteligencia Artificial como copilotos de desarrollo para la creación de **MovieVibe**.

---

## 1. Prompts Principales Utilizados

### Prompt 1: Arquitectura e Inicialización

> _"Genera la estructura modular de una app Next.js 16 (App Router) con TypeScript y Tailwind CSS para consultar películas desde la API de TMDB. Incluye consumo en Server Components y un Navbar responsivo."_

### Prompt 2: Lógica de Buscador Interactivo (Client Component)

> _"Crea una página de búsqueda en Client Component (`/search`) con Next.js 16. Utiliza los hooks `useState` y `useEffect` con un timer de debounce para consumir la API de búsqueda de TMDB sin saturar el servidor."_

### Prompt 3: Manejo de Estados UI

> _"Genera los componentes `loading.tsx` y `error.tsx` con estilizado en Tailwind CSS e iconos de Lucide React para renderizarse automáticamente en App Router."_

---

## 2. Iteraciones y Decisión de Componentes (Server vs Client)

- **Server Components:** Se emplearon en la raíz (`/`) y en el detalle de películas (`/movie/[id]`) para optimizar el SEO, renderizar el HTML desde el servidor y reducir el JS enviado al cliente.
- **Client Components:** Se asignaron a `/search` y `/favorites` debido a la necesidad de capturar entradas del usuario en vivo (`useState`) e interactuar con el almacenamiento del navegador (`localStorage`).

---

## 3. Desafíos Resueltos con Apoyo de IA

1. **Gestión de Promesas en Params de Next.js 16:**
   - _Desafío:_ En Next.js 16, los `params` de las rutas dinámicas deben tratarse como promesas desestructuradas.
   - _Solución con IA:_ Se implementó `const resolvedParams = await params;` en la ruta `/movie/[id]/page.tsx` evitando errores de tipado e hidratación.

2. **Optimización de llamadas a la API:**
   - _Desafío:_ Evitar peticiones redundantes en el input de búsqueda.
   - _Solución con IA:_ Uso de un `setTimeout` de 400ms dentro del `useEffect` para limpiar la petición activa si el usuario continúa escribiendo.

---

## 4. Lecciones Aprendidas

El flujo de **Vibe Coding** acelera drásticamente la creación de prototipos y aplicaciones listas para producción, permitiendo mantener el enfoque en la arquitectura, validación de tipos y calidad de interfaz mientras la IA asiste en el maquetado y boilerplate.

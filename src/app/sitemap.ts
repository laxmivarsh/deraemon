import { MetadataRoute } from 'next';
import { initialCharacters } from '@/data/characters';
import { initialMovies } from '@/data/movies';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://doraemon-universe.vercel.app';

  const staticRoutes = [
    '',
    '/characters',
    '/gadgets',
    '/movies',
    '/episodes',
    '/timeline',
    '/games',
    '/world',
    '/gallery',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const characterRoutes = initialCharacters.map((char) => ({
    url: `${baseUrl}/characters/${char.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const movieRoutes = initialMovies.map((movie) => ({
    url: `${baseUrl}/movies/${movie.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...characterRoutes, ...movieRoutes];
}

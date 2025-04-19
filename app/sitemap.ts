import { MetadataRoute } from 'next';
import { locations } from '@/types/locations';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://olive-tree.cy';
  const routes = ['', '/about', '/baskets', '/faq', '/order'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }));

  const locationRoutes = locations.flatMap((location) =>
    routing.locales.map((locale) => ({
      url: `${baseUrl}/${locale}/locations/${location.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  return [...routes, ...locationRoutes];
} 
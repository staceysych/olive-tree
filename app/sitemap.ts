import { MetadataRoute } from 'next';
import { locations } from '@/utils/defaults';
import { routing } from '@/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://olivetree.cy';
  
  // Home page routes for each locale
  const homeRoutes = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }));

  // Location routes for each locale
  const locationRoutes = locations.flatMap((location) =>
    routing.locales.map((locale) => ({
      url: `${baseUrl}/${locale}/locations/${location.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  return [...homeRoutes, ...locationRoutes];
} 
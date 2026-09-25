import type { MetadataRoute } from 'next';
import { isProductionDeployment, siteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeployment) {
    return { rules: { userAgent: '*', disallow: '/' } };
  }

  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/studio', '/api'] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

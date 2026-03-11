import type { APIRoute } from 'astro';
import { getPages } from '../utils/getPages';

export const GET: APIRoute = async () => {
  const pages = await getPages();
  const buildDate = new Date().toISOString().split('T')[0];

  const urls = pages.map(p => `
  <url>
    <loc>${p.url}</loc>
    <lastmod>${buildDate}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority.toFixed(1)}</priority>
  </url>`).join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400',
      },
    }
  );
};
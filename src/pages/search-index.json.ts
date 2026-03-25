import type { APIRoute } from 'astro';
import { getSearchIndex } from '../utils/getPages';

export const GET: APIRoute = () =>
  new Response(JSON.stringify(getSearchIndex()), {
    headers: { 'Content-Type': 'application/json' },
  });

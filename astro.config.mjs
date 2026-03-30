import { defineConfig } from 'astro/config';

export default defineConfig({
  trailingSlash: 'never',
  site: 'https://calculations.tools',
  redirects: {
    '/percentage-calculator':                           '/math/percentage-calculator',
    '/compare-text':                                    '/compare/text',
    '/compare-text/compare-excel':                      '/compare/excel',
  },
});

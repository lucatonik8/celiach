import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://lucatonik8.github.io',
  base: '/celiach',
  // La V2 es ahora la portada; los enlaces antiguos a /v2/ siguen funcionando
  redirects: { '/v2': '/celiach/' },
});

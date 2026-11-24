import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://celiachx.com',
  // La V2 es ahora la portada; los enlaces antiguos a /v2/ siguen funcionando
  redirects: { '/v2': '/' },
});

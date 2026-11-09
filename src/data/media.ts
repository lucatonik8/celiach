import type { ImageMetadata } from 'astro';

// Fotos públicas de cada proyecto, descargadas de la publicación original (ver `source`).
const all = import.meta.glob<{ default: ImageMetadata }>('../assets/media/*/*.{jpg,webp}', { eager: true });

const byDir = (dir: string) =>
  Object.entries(all)
    .filter(([p]) => p.includes(`/media/${dir}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, m]) => m.default);

export type Extra = { dir: string; source: string; url: string };

const extras: Record<string, Extra> = {
  AmadecaZa: { dir: 'amadecaza', source: 'Folie Magazine', url: 'https://www.folie.es/post/editorial-amadecaza' },
  'Beer Real': { dir: 'beerreal', source: 'Folie Magazine', url: 'https://www.folie.es/post/editorial-beer-real' },
  'Ca7riel & Paco Amoroso — Supersónicos': { dir: 'ca7riel', source: 'ACERO Magazine', url: 'https://acero.metalmagazine.eu/post/ca7riel-paco-amoroso-acero-vol-9' },
  Deleusse: { dir: 'deleusse', source: 'FUCKING YOUNG!', url: 'https://fuckingyoung.es/deleusse/' },
  'Tiago PZK — Ser y estar, no parecer': { dir: 'tiago', source: 'ACERO Magazine', url: 'https://acero.metalmagazine.eu/post/tiago-pzk-acero-vol-11' },
  'L0rna — El peso de ser tan joven y molar tanto': { dir: 'l0rna', source: 'ACERO Magazine', url: 'https://acero.metalmagazine.eu/post/l0rna-acero-vol-11' },
};

export const extraFor = (title: string) => extras[title];
export const mediaFor = (title: string) => (extras[title] ? byDir(extras[title].dir) : []);

export const ytId = (url?: string) => url?.match(/(?:youtu\.be\/|[?&]v=)([\w-]{11})/)?.[1];
export const ytThumb = (id: string) =>
  Object.entries(all).find(([p]) => p.includes(`/media/yt/${id}.`))?.[1].default;

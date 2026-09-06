import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const prerender = false;

if (!(globalThis as any).self) {
  (globalThis as any).self = globalThis;
}
if (!(globalThis as any).self.location) {
  Object.defineProperty((globalThis as any).self, 'location', {
    value: new URL('https://vincentmugondora.com/'),
    writable: true,
    configurable: true,
  });
}

let wasmInitialized = false;
let satoriLib: typeof import('satori') | undefined;
let resvgLib: typeof import('@resvg/resvg-wasm') | undefined;

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map((entry) => ({
    params: { slug: entry.id },
    props: { title: entry.data.title, category: entry.data.category?.replace('-', ' ') ?? 'Writing' },
  }));
}

async function ensureImageRuntime() {
  if (!satoriLib) {
    satoriLib = await import('satori');
  }
  if (!resvgLib) {
    resvgLib = await import('@resvg/resvg-wasm');
  }
}

export const GET: APIRoute = async ({ props }) => {
  await ensureImageRuntime();
  const satori = (satoriLib as any).default ?? satoriLib;
  const { Resvg, initWasm } = resvgLib as typeof import('@resvg/resvg-wasm');

  if (!wasmInitialized) {
    try {
      const wasmBuffer = await fetch('https://unpkg.com/@resvg/resvg-wasm/index_bg.wasm').then((res) => res.arrayBuffer());
      await initWasm(wasmBuffer);
      wasmInitialized = true;
    } catch (e) {
      console.warn('WASM already initialized or failed');
    }
  }

  const { title, category } = props as { title: string; category: string };

  const fontData = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.woff',
  ).then((res) => res.arrayBuffer());

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0a',
          padding: '60px 80px',
          color: '#ffffff',
          fontFamily: 'Inter',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: 24,
                color: '#10b981',
                textTransform: 'uppercase',
                letterSpacing: '2px',
              },
              children: category,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                fontSize: 54,
                fontWeight: 700,
                lineHeight: 1.2,
                color: '#f3f4f6',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #27272a',
                paddingTop: '24px',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: { fontSize: 24, color: '#e4e4e7' },
                    children: 'Vincent Mugondora',
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: { fontSize: 20, color: '#71717a' },
                    children: 'vincentmugondora.com',
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  );

  const resvg = new Resvg(svg);
  const pngBuffer = resvg.render().asPng();

  return new Response(pngBuffer as any, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};

SYSTEM SPECIFICATION: ARCHITECTURE, PERFORMANCE & ON-PAGE SEO DIRECTIVES
Target Domain: vincemugondora.com
Primary Stack: Astro (Hybrid Mode), Cloudflare Pages, Cloudflare D1/Workers (or Supabase af-south-1), Tailwind CSS, MDX
Target Region: Southern Africa (Harare & Johannesburg Edge Nodes)
Primary Goal: Sub-50ms TTFB regional delivery, 100/100 Core Web Vitals, sub-second LCP, zero client-side hydration waste, maximum Google Entity/Knowledge Graph indexing.
1. INFRASTRUCTURE & BACKEND ARCHITECTURE SPECS
1.1 Deployment & Edge Hosting
 * Hosting Platform: Cloudflare Pages with Git integration (push-to-deploy on main).
 * Edge Regions: Rely on Cloudflare's African edge network (Harare, Johannesburg, Cape Town) for caching and Workers execution.
 * Protocol Enforcements: Enforce HTTP/3, Brotli compression, Early Hints (103), and Smart Tiered Caching in the Cloudflare Dashboard.
1.2 Data, Form & API Layer
 * Database Placement:
   * If using Supabase, host exclusively in the af-south-1 (Johannesburg) AWS region to minimize regional database query latency.
   * If using Cloudflare D1 (Serverless SQLite), access bindings natively inside Astro via Astro.locals.runtime.env.DB.
 * Form Submissions: Handle contact and lead forms via serverless endpoints (src/pages/api/contact.ts) or zero-JS form providers (e.g., Web3Forms). Never load heavy client-side form libraries.
 * Analytics: Use Cloudflare Web Analytics (injected at the edge) or ultra-lightweight solutions (Plausible/Umami <1 KB). DO NOT embed standard gtag.js / Google Analytics scripts.
2. FRONTEND ENGINEERING & ON-PAGE PERFORMANCE SPECS
2.1 Styling & Typography (Tailwind + Self-Hosted Fonts)
 * Styling Engine: Tailwind CSS compiled at build time. Zero runtime JavaScript.
 * Font Delivery Rule: STRICTLY PROHIBITED: Linking external font stylesheets (e.g., fonts.googleapis.com).
 * Font Implementation: Self-host fonts locally via Fontsource packages (e.g., @fontsource-variable/inter) or .woff2 files stored in /public/fonts/.
 * Font Preloading: Include explicit <link rel="preload" href="..." as="font" type="font/woff2" crossorigin /> tags in the layout <head>.
2.2 Asset Optimization & Image Delivery
 * Native Components Only: ALWAYS import and use Astro’s <Image/> component from astro:assets. Never use standard <img> tags.
 * Priority Strategy:
   * Above-the-fold / Hero images MUST set loading="eager" and fetchpriority="high".
   * Below-the-fold images MUST use loading="lazy".
 * Formats & Sizing: Enforce WebP/AVIF generation. Specify explicit width and height dimensions on all images to eliminate Cumulative Layout Shift (CLS).
 * Edge Image Engine: Configure imageService: 'compile' or 'cloudflare-binding' in astro.config.mjs.
2.3 Astro Islands & Hydration Constraints
 * Default to zero JavaScript. Render static HTML on the server or at build time.
 * Hydration Rules:
   * client:load: Permitted ONLY for critical top-of-page UI (e.g., primary navigation toggle).
   * client:visible: Mandatory for lower-page heavy components (e.g., interactive widgets, charts, media players).
   * client:idle: Reserved for non-essential background interactive scripts.
   * PROHIBITED: Wrapping global layout roots in framework context providers.
2.4 Headers & Edge Caching
Output a public/_headers file containing strict cache rules:
/*
  Cache-Control: public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

3. TECHNICAL & ON-PAGE SEO SPECS
3.1 Metadata & Document Structure
 * Every layout and page MUST accept title, description, image, and canonicalURL props.
 * Title Tag: 50–60 characters max. Format: [Page Title] | Vincent Mugondora.
 * Description: 120–160 characters max.
 * Social Tags: Complete Open Graph (og:*) and Twitter Card (twitter:*) properties.
 * Canonical URLs: Absolute, trailing-slash-consistent URLs generated dynamically via Astro.site.
3.2 Sitemaps, Robots.txt & Fast Indexing
 * Use @astrojs/sitemap with site: '[https://vincemugondora.com](https://vincemugondora.com)' declared in astro.config.mjs.
 * Generate src/pages/robots.txt.ts dynamically to reference sitemap-index.xml.
 * Enable Cloudflare Crawler Hints / IndexNow protocol for automatic search engine notification on deploy.
3.3 Structured Data (JSON-LD Graph Architecture)
Every page MUST output a <script type="application/ld+json"> block utilizing Schema.org @graph.
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://vincemugondora.com/#person",
      "name": "Vincent Mugondora",
      "url": "https://vincemugondora.com",
      "jobTitle": "Software Engineer & Tech Entrepreneur",
      "worksFor": { "@id": "https://vincemugondora.com/#organization" },
      "founder": { "@id": "https://vincemugondora.com/#organization" },
      "knowsAbout": [
        "Software Engineering",
        "System Architecture",
        "Web Performance Optimization",
        "Astro.js",
        "Svelte",
        "Cloudflare Edge Infrastructure"
      ],
      "sameAs": [
        "https://github.com/vincemugondora",
        "https://www.linkedin.com/in/vincemugondora"
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://vincemugondora.com/#organization",
      "name": "Zimnovate",
      "url": "https://zimnovate.co.zw",
      "founder": { "@id": "https://vincemugondora.com/#person" },
      "areaServed": { "@type": "Country", "name": "Zimbabwe" }
    },
    {
      "@type": "WebSite",
      "@id": "https://vincemugondora.com/#website",
      "url": "https://vincemugondora.com",
      "name": "Vincent Mugondora",
      "publisher": { "@id": "https://vincemugondora.com/#person" }
    }
  ]
}

4. CODE GENERATION RULES FOR LLM / CLAUDE
When outputting code for this repository:
 * No CDN Imports: Never import CSS or JS from external CDNs (unpkg, cdnjs, googleapis).
 * Strict Type Safety: Use TypeScript interface definitions for all component props and content collection frontmatter (via Zod).
 * Semantic HTML5: Use <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer> appropriately.
 * Content Collections: Put all blog posts and case studies under src/content/ validated by src/content/config.ts.
 * Accessibility (a11y): Include required aria-* roles, form <label> associations, and descriptive alt texts on assets.
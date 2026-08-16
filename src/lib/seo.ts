import { siteConfig } from "@config/site";

export interface JsonLdPerson {
  "@type": "Person";
  "@id": string;
  name: string;
  url: string;
  jobTitle: string;
  worksFor: { "@id": string };
  founder: { "@id": string };
  knowsAbout: string[];
  sameAs: string[];
}

export interface JsonLdOrganization {
  "@type": "Organization";
  "@id": string;
  name: string;
  url: string;
  founder: { "@id": string };
  areaServed: { "@type": "Country"; name: string };
}

export interface JsonLdWebSite {
  "@type": "WebSite";
  "@id": string;
  url: string;
  name: string;
  publisher: { "@id": string };
}

export function getBaseJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: "Vincent Mugondora",
        url: siteConfig.url,
        image: `${siteConfig.url}/vincent.avif`,
        jobTitle: "Software Developer, AI Builder & Technology Educator",
        description: siteConfig.description,
        worksFor: { "@id": `${siteConfig.url}/#organization` },
        founder: { "@id": `${siteConfig.url}/#organization` },
        knowsAbout: [
          "Software Development",
          "Artificial Intelligence",
          "AI Agents",
          "Web Development",
          "React",
          "Next.js",
          "Python",
          "Django",
          "TypeScript",
          "System Architecture",
          "Technology Education",
          "AI Automation",
        ],
        sameAs: [
          "https://github.com/vincemugondora",
          "https://www.linkedin.com/in/vincemugondora",
        ],
        address: {
          "@type": "PostalAddress",
          addressCountry: "ZW",
          addressLocality: "Zimbabwe",
        },
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: "Zimnovate",
        url: "https://zimnovate.co.zw",
        founder: { "@id": `${siteConfig.url}/#person` },
        areaServed: { "@type": "Country", name: "Zimbabwe" },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#person` },
      },
    ],
  };
}

export function getProfilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: { "@id": `${siteConfig.url}/#person` },
    name: `About ${siteConfig.name}`,
    url: `${siteConfig.url}/about`,
    description: siteConfig.description,
  };
}

export function getArticleJsonLd(article: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.publishedAt,
    ...(article.updatedAt && { dateModified: article.updatedAt }),
    ...(article.image && { image: article.image }),
    author: { "@id": `${siteConfig.url}/#person` },
    publisher: { "@id": `${siteConfig.url}/#person` },
  };
}

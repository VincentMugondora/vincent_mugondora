import { siteConfig } from "@config/site";

export interface JsonLdPerson {
  "@type": "Person";
  "@id": string;
  name: string;
  url: string;
  email: string;
  telephone: string;
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
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: {
      "@type": "Person",
      name: "Vincent Mugondora",
      url: siteConfig.url,
      image: `${siteConfig.url}/vincent.avif`,
      jobTitle: "Software Developer, AI Builder & Technology Educator",
      email: siteConfig.email,
      telephone: siteConfig.phone,
      sameAs: [siteConfig.githubUrl, siteConfig.linkedinUrl, siteConfig.twitterUrl],
    },
    author: {
      "@type": "Person",
      name: "Vincent Mugondora",
      url: siteConfig.url,
    },
  };
}

export function getProfilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Vincent Mugondora",
      url: siteConfig.url,
      image: `${siteConfig.url}/vincent.avif`,
      jobTitle: "Software Developer, AI Builder & Technology Educator",
      description: siteConfig.description,
      sameAs: [siteConfig.githubUrl, siteConfig.linkedinUrl, siteConfig.twitterUrl],
    },
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
    author: {
      "@type": "Person",
      name: "Vincent Mugondora",
      url: siteConfig.url,
      sameAs: [siteConfig.githubUrl, siteConfig.linkedinUrl, siteConfig.twitterUrl],
    },
    publisher: {
      "@type": "Person",
      name: "Vincent Mugondora",
      url: siteConfig.url,
    },
  };
}

export function getFAQJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

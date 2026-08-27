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
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: "Vincent Mugondora",
        url: siteConfig.url,
        image: `${siteConfig.url}/vincent.avif`,
        description:
          "Zimbabwean software developer and AI builder creating intelligent solutions for businesses in Africa. Educator and entrepreneur based in Harare.",
        jobTitle: "Software Developer & AI Builder",
        email: siteConfig.email,
        telephone: siteConfig.phone,
        worksFor: { "@id": `${siteConfig.url}/#organization` },
        founder: { "@id": `${siteConfig.url}/#organization` },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Harare",
          addressCountry: "ZW",
        },
        nationality: { "@type": "Country", name: "Zimbabwe" },
        knowsAbout: [
          "Software Engineering",
          "Artificial Intelligence",
          "AI Agents",
          "Machine Learning",
          "Web Development",
          "Python",
          "JavaScript",
          "TypeScript",
          "RAG Systems",
          "System Design",
          "Technology Education",
          "AI Automation",
          "Technology in Africa",
          "Software Development in Zimbabwe",
          "African Technology",
        ],
        alumniOf: { "@type": "Organization", name: "Uncommon.org", url: "https://uncommon.org" },
        sameAs: [
          siteConfig.githubUrl,
          siteConfig.linkedinUrl,
          siteConfig.twitterUrl,
        ],
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
        inLanguage: "en",
        publisher: { "@id": `${siteConfig.url}/#person` },
      },
    ],
  };
}

export function getProfilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@id": `${siteConfig.url}/#person`,
      "@type": "Person",
      name: "Vincent Mugondora",
      url: siteConfig.url,
      image: `${siteConfig.url}/vincent.avif`,
      jobTitle: "Software Developer, AI Builder & Technology Educator",
      description:
        "Zimbabwean software developer and AI builder creating intelligent solutions for businesses in Africa. Educator and entrepreneur based in Harare.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Harare",
        addressCountry: "ZW",
      },
      nationality: { "@type": "Country", name: "Zimbabwe" },
      alumniOf: { "@type": "Organization", name: "Uncommon.org", url: "https://uncommon.org" },
      knowsAbout: [
        "Software Engineering",
        "Artificial Intelligence",
        "AI Agents",
        "Machine Learning",
        "Web Development",
        "Technology Education",
        "African Technology",
      ],
      sameAs: [
        siteConfig.githubUrl,
        siteConfig.linkedinUrl,
        siteConfig.twitterUrl,
      ],
    },
    name: `About ${siteConfig.name}`,
    url: `${siteConfig.url}/about`,
    description:
      "About Vincent Mugondora — software engineer, AI builder, educator and entrepreneur from Zimbabwe building intelligent solutions and teaching developers.",
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

export function getCollectionPageJsonLd(collection: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.name,
    description: collection.description,
    url: collection.url,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    author: { "@id": `${siteConfig.url}/#person` },
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

export function getHowToJsonLd(howTo: {
  name: string;
  description: string;
  url: string;
  steps: Array<{ name: string; text: string }>;
  totalTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: howTo.name,
    description: howTo.description,
    url: howTo.url,
    ...(howTo.totalTime && { totalTime: howTo.totalTime }),
    step: howTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
    author: {
      "@type": "Person",
      name: "Vincent Mugondora",
      url: "https://vincentmugondora.com",
    },
  };
}

export function getSpeakableJsonLd(article: {
  url: string;
  title: string;
  cssSelectors?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: article.title,
    url: article.url,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: article.cssSelectors ?? [
        "article h1",
        "[data-speakable]",
        "article > p:first-of-type",
      ],
    },
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

export function getServiceJsonLd(service: {
  name: string;
  description: string;
  url: string;
  serviceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    serviceType: service.serviceType,
    provider: { "@id": `${siteConfig.url}/#person` },
    areaServed: [
      { "@type": "Country", name: "Zimbabwe" },
      { "@type": "Continent", name: "Africa" },
    ],
  };
}

export function getServiceCatalogJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Vincent Mugondora Services",
    description:
      "Software development, AI solutions, and automation services for businesses in Zimbabwe and Africa.",
    url: `${siteConfig.url}/services`,
    provider: { "@id": `${siteConfig.url}/#person` },
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Software Development",
          url: `${siteConfig.url}/services/software-development`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Web Development",
          url: `${siteConfig.url}/services/web-development`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Solutions for Businesses",
          url: `${siteConfig.url}/services/ai-solutions`,
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Automation Services",
          url: `${siteConfig.url}/services/ai-automation`,
        },
      },
    ],
  };
}

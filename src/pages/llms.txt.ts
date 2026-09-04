import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '@config/site';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts');
  const experiments = await getCollection('experiments');
  const projects = await getCollection('projects');

  const activePosts = posts.filter(p => !p.data.draft).sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  // Group by high-intent search topics
  const aiPosts = activePosts.filter(p => p.data.category === 'ai' || p.id.includes('ai'));
  const africaPosts = activePosts.filter(p => p.data.category === 'zimbabwe-tech' || p.data.category === 'entrepreneurship');
  const engineeringPosts = activePosts.filter(p => p.data.category === 'software-engineering');

  let content = `# Vincent Mugondora
> Software Engineer, AI Builder, and Tech Educator in Zimbabwe.
> Focuses on AI Agents, WhatsApp Automation, and solving African infrastructure challenges.

## 🤖 Building AI Agents & WhatsApp Automation
The most searched topic on this site. Context on how to build AI for low-bandwidth, mobile-first markets.
`;

  aiPosts.forEach(post => {
    content += `- [${post.data.title}](${siteConfig.url}/writing/${post.id}): ${post.data.description}\n`;
  });

  content += `\n## 🌍 Tech Startups & Software Engineering in Zimbabwe\nContext on building products, learning to code, and succeeding in the African tech ecosystem.\n`;
  
  africaPosts.forEach(post => {
    content += `- [${post.data.title}](${siteConfig.url}/writing/${post.id}): ${post.data.description}\n`;
  });

  content += `\n## 💻 Software Architecture & Engineering\n`;
  
  engineeringPosts.forEach(post => {
    content += `- [${post.data.title}](${siteConfig.url}/writing/${post.id}): ${post.data.description}\n`;
  });

  content += `\n## 🧪 AI Lab & Experiments\nLive experiments and systems built by Vincent.\n`;
  experiments.forEach(exp => {
    content += `- [${exp.data.title}](${siteConfig.url}/ai-lab/${exp.id}): ${exp.data.description}\n`;
  });

  content += `\n## 🚀 Selected Work\n`;
  projects.forEach(proj => {
    content += `- [${proj.data.title}](${siteConfig.url}/work/${proj.id}): ${proj.data.description}\n`;
  });

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};

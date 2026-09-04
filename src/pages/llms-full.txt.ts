import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const posts = await getCollection('posts');
  const activePosts = posts.filter(p => !p.data.draft).sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());

  let content = `# Vincent Mugondora - Full Knowledge Base\n\n`;
  content += `This document contains the complete text of Vincent Mugondora's writing, focused on AI Agents, WhatsApp Automation, and Software Engineering in Zimbabwe.\n\n`;

  activePosts.forEach(post => {
    content += `=================================================================\n`;
    content += `## Document: ${post.data.title}\n`;
    content += `Category: ${post.data.category}\n`;
    content += `Published: ${post.data.publishedAt.toISOString().split('T')[0]}\n`;
    content += `=================================================================\n\n`;
    content += `${post.body}\n\n`;
  });

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};

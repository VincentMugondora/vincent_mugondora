import rss from "@astrojs/rss";
import { getPublishedPosts } from "@lib/content";
import { siteConfig } from "@config/site";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/writing/${post.id}`,
    })),
  });
}

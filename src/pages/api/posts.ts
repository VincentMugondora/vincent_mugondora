import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { getDb } from "@lib/db";
import { posts } from "../../../db/schema";

export const prerender = false;

export const GET: APIRoute = async () => {
  const db = getDb(env.DB);
  const all = await db.select().from(posts).all();
  return Response.json(all);
};

export const POST: APIRoute = async ({ request }) => {
  const db = getDb(env.DB);
  const body = await request.json() as Record<string, unknown>;
  const values = {
    title: body.title as string,
    slug: body.slug as string,
    description: body.description as string,
    content: body.content as string,
    category: body.category as string,
    publishedAt: body.published_at as string,
    image: (body.image as string) || null,
    featured: Boolean(body.featured),
    draft: Boolean(body.draft),
    createdAt: new Date().toISOString(),
  };
  const result = await db.insert(posts).values(values).returning();
  return Response.json(result[0], { status: 201 });
};

export const PUT: APIRoute = async ({ request }) => {
  const db = getDb(env.DB);
  const body = await request.json() as Record<string, unknown>;
  const id = body.id as number;
  const data = {
    title: body.title as string,
    slug: body.slug as string,
    description: body.description as string,
    content: body.content as string,
    category: body.category as string,
    publishedAt: body.published_at as string,
    image: (body.image as string) || null,
    featured: body.featured as boolean,
    draft: body.draft as boolean,
  };
  const result = await db.update(posts).set(data).where(eq(posts.id, id)).returning();
  return Response.json(result[0]);
};

export const DELETE: APIRoute = async ({ request }) => {
  const db = getDb(env.DB);
  const { id } = await request.json() as { id: number };
  await db.delete(posts).where(eq(posts.id, id));
  return Response.json({ success: true });
};

import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";
import { getDb } from "@lib/db";
import { posts } from "../../../db/schema";
import { env } from "cloudflare:workers";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const d1 = (env as any).DB;
    if (!d1) return Response.json([]);
    const db = getDb(d1);
    const all = await db.select().from(posts).all();
    return Response.json(all);
  } catch (error: any) {
    console.error("GET /api/posts error:", error);
    return Response.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
};

export const POST: APIRoute = async (ctx) => {
  try {
    const d1 = (env as any).DB;
    if (!d1) return Response.json({ error: "DB not found" }, { status: 500 });
    const db = getDb(d1);
    const body = await ctx.request.json() as Record<string, unknown>;
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
  } catch (error: any) {
    console.error("POST /api/posts error:", error);
    return Response.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
};

export const PUT: APIRoute = async (ctx) => {
  const d1 = (env as any).DB;
  if (!d1) return Response.json({ error: "DB not found" }, { status: 500 });
  const db = getDb(d1);
  const body = await ctx.request.json() as Record<string, unknown>;
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

export const DELETE: APIRoute = async (ctx) => {
  const d1 = (env as any).DB;
  if (!d1) return Response.json({ error: "DB not found" }, { status: 500 });
  const db = getDb(d1);
  const { id } = await ctx.request.json() as { id: number };
  await db.delete(posts).where(eq(posts.id, id));
  return Response.json({ success: true });
};

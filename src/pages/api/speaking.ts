import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { getDb } from "@lib/db";
import { speakingEvents } from "../../../db/schema";

export const prerender = false;

export const GET: APIRoute = async () => {
  const db = getDb(env.DB);
  const all = await db.select().from(speakingEvents).all();
  return Response.json(all);
};

export const POST: APIRoute = async ({ request }) => {
  const db = getDb(env.DB);
  const body = await request.json() as Record<string, unknown>;
  const result = await db.insert(speakingEvents).values(body as any).returning();
  return Response.json(result[0], { status: 201 });
};

export const PUT: APIRoute = async ({ request }) => {
  const db = getDb(env.DB);
  const body = await request.json() as Record<string, unknown>;
  const { id, ...data } = body;
  const result = await db.update(speakingEvents).set(data).where(eq(speakingEvents.id, id as number)).returning();
  return Response.json(result[0]);
};

export const DELETE: APIRoute = async ({ request }) => {
  const db = getDb(env.DB);
  const { id } = await request.json() as { id: number };
  await db.delete(speakingEvents).where(eq(speakingEvents.id, id));
  return Response.json({ success: true });
};

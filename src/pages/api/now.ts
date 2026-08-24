import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { getDb } from "@lib/db";
import { nowEntries } from "../../../db/schema";

export const prerender = false;

export const GET: APIRoute = async () => {
  const db = getDb(env.DB);
  const all = await db.select().from(nowEntries).all();
  return Response.json(all);
};

export const POST: APIRoute = async ({ request }) => {
  const db = getDb(env.DB);
  const body = await request.json();
  const result = await db.insert(nowEntries).values(body).returning();
  return Response.json(result[0], { status: 201 });
};

export const PUT: APIRoute = async ({ request }) => {
  const db = getDb(env.DB);
  const body = await request.json();
  const { id, ...data } = body;
  const result = await db.update(nowEntries).set(data).where(eq(nowEntries.id, id)).returning();
  return Response.json(result[0]);
};

export const DELETE: APIRoute = async ({ request }) => {
  const db = getDb(env.DB);
  const { id } = await request.json();
  await db.delete(nowEntries).where(eq(nowEntries.id, id));
  return Response.json({ success: true });
};

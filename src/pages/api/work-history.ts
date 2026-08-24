import type { APIRoute } from "astro";
import { eq } from "drizzle-orm";
import { getDb } from "@lib/db";
import { workHistory } from "../../../db/schema";

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const db = getDb((locals as { runtime: { env: Env } }).runtime.env.DB);
  const all = await db.select().from(workHistory).all();
  return Response.json(all);
};

export const POST: APIRoute = async ({ request, locals }) => {
  const db = getDb((locals as { runtime: { env: Env } }).runtime.env.DB);
  const body = await request.json();
  const result = await db.insert(workHistory).values(body).returning();
  return Response.json(result[0], { status: 201 });
};

export const PUT: APIRoute = async ({ request, locals }) => {
  const db = getDb((locals as { runtime: { env: Env } }).runtime.env.DB);
  const body = await request.json();
  const { id, ...data } = body;
  const result = await db.update(workHistory).set(data).where(eq(workHistory.id, id)).returning();
  return Response.json(result[0]);
};

export const DELETE: APIRoute = async ({ request, locals }) => {
  const db = getDb((locals as { runtime: { env: Env } }).runtime.env.DB);
  const { id } = await request.json();
  await db.delete(workHistory).where(eq(workHistory.id, id));
  return Response.json({ success: true });
};

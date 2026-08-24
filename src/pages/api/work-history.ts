import type { APIRoute } from "astro";
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

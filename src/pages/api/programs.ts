import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { getDb } from "@lib/db";
import { programs } from "../../../db/schema";

export const prerender = false;

export const GET: APIRoute = async () => {
  const db = getDb(env.DB);
  const all = await db.select().from(programs).all();
  return Response.json(all);
};

export const POST: APIRoute = async ({ request }) => {
  const db = getDb(env.DB);
  const body = await request.json();
  const result = await db.insert(programs).values(body).returning();
  return Response.json(result[0], { status: 201 });
};

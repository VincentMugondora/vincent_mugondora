import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
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
  const body = await request.json();
  const result = await db.insert(speakingEvents).values(body).returning();
  return Response.json(result[0], { status: 201 });
};

import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { getDb } from "@lib/db";
import { siteConfig } from "../../../db/schema";

export const prerender = false;

export const GET: APIRoute = async () => {
  const db = getDb(env.DB);
  const all = await db.select().from(siteConfig).all();
  const config = Object.fromEntries(all.map((row) => [row.key, row.value]));
  return Response.json(config);
};

export const POST: APIRoute = async ({ request }) => {
  const db = getDb(env.DB);
  const body: { key: string; value: string } = await request.json();
  const result = await db
    .insert(siteConfig)
    .values(body)
    .onConflictDoUpdate({ target: siteConfig.key, set: { value: body.value } })
    .returning();
  return Response.json(result[0], { status: 201 });
};

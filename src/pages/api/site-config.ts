import type { APIRoute } from "astro";
import { getDb } from "@lib/db";
import { siteConfig } from "../../../db/schema";

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const db = getDb((locals as { runtime: { env: Env } }).runtime.env.DB);
  const all = await db.select().from(siteConfig).all();
  const config = Object.fromEntries(all.map((row) => [row.key, row.value]));
  return Response.json(config);
};

export const POST: APIRoute = async ({ request, locals }) => {
  const db = getDb((locals as { runtime: { env: Env } }).runtime.env.DB);
  const body: { key: string; value: string } = await request.json();
  const result = await db
    .insert(siteConfig)
    .values(body)
    .onConflictDoUpdate({ target: siteConfig.key, set: { value: body.value } })
    .returning();
  return Response.json(result[0], { status: 201 });
};

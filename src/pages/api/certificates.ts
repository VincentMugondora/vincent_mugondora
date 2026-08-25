import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { eq } from "drizzle-orm";
import { getDb } from "@lib/db";
import { certificates } from "../../../db/schema";

export const prerender = false;

export const GET: APIRoute = async () => {
  const db = getDb(env.DB);
  const all = await db.select().from(certificates).all();
  return Response.json(all);
};

export const POST: APIRoute = async ({ request }) => {
  const db = getDb(env.DB);
  const body = await request.json() as Record<string, unknown>;
  const values = {
    name: body.name as string,
    issuer: (body.issuer as string) || null,
    issuedDate: (body.issued_date as string) || null,
    fileKey: body.file_key as string,
    fileType: body.file_type as string,
  };
  const result = await db.insert(certificates).values(values).returning();
  return Response.json(result[0], { status: 201 });
};

export const PUT: APIRoute = async ({ request }) => {
  const db = getDb(env.DB);
  const body = await request.json() as Record<string, unknown>;
  const id = body.id as number;
  const data = {
    name: body.name as string,
    issuer: (body.issuer as string) || null,
    issuedDate: (body.issued_date as string) || null,
    fileKey: body.file_key as string,
    fileType: body.file_type as string,
  };
  const result = await db.update(certificates).set(data).where(eq(certificates.id, id)).returning();
  return Response.json(result[0]);
};

export const DELETE: APIRoute = async ({ request }) => {
  const db = getDb(env.DB);
  const { id } = await request.json() as { id: number };
  await db.delete(certificates).where(eq(certificates.id, id));
  return Response.json({ success: true });
};

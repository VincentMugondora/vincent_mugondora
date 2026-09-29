import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { getDb } from "@lib/db";
import { messages } from "../../../db/schema";

export const prerender = false;

export const POST: APIRoute = async (ctx) => {
  const request = ctx.request;
  console.log("ENV:", env, "DB:", (env as any).DB);
  try {
    const data = (await request.json()) as any;

    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

        let d1 = (env as any).DB;
    if (!d1 && ctx.locals.runtime?.env?.DB) {
      d1 = ctx.locals.runtime.env.DB;
    }
    if (!d1) throw new Error("D1 database binding DB is missing in Cloudflare environment.");
    const db = getDb(d1);
    await db.insert(messages).values({
      name: data.name,
      email: data.email,
      message: data.message,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return new Response(JSON.stringify({ error: String(error) + (error.stack ? "\n" + error.stack : "") }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

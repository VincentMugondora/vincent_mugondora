import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { getDb } from "@lib/db";
import { messages } from "../../../db/schema";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = (await request.json()) as any;

    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const db = getDb(env.DB);
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
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { signToken } from "@lib/auth";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const { password } = await request.json();
  const adminPassword = (env as typeof env & { ADMIN_PASSWORD?: string }).ADMIN_PASSWORD;

  if (!adminPassword) {
    return Response.json({ error: "Admin password not configured" }, { status: 500 });
  }

  if (password !== adminPassword) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const payload = btoa(`admin:${Date.now()}:${crypto.randomUUID()}`);
  const token = await signToken(payload, adminPassword);

  return Response.json({ token }, {
    status: 200,
    headers: {
      "Set-Cookie": `admin_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`,
    },
  });
};

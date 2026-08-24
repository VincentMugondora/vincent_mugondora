import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as { runtime: { env: Env } }).runtime.env;
  const { password } = await request.json();
  const adminPassword = (env as unknown as Record<string, string>).ADMIN_PASSWORD;

  if (!adminPassword) {
    return Response.json({ error: "Admin password not configured" }, { status: 500 });
  }

  if (password !== adminPassword) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const token = btoa(`admin:${Date.now()}:${crypto.randomUUID()}`);

  return Response.json({ token }, {
    status: 200,
    headers: {
      "Set-Cookie": `admin_token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`,
    },
  });
};

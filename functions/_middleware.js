export async function onRequest(context) {
  const response = await context.next();

  if (response.status === 404) {
    const url = new URL(context.request.url);
    const notFoundPage = await context.env.ASSETS.fetch(
      new URL("/404", url.origin)
    );
    const headers = new Headers(notFoundPage.headers);
    headers.set("Cache-Control", "no-store");
    return new Response(notFoundPage.body, {
      status: 404,
      headers,
    });
  }

  return response;
}

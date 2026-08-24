export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status === 404) {
      const url = new URL(request.url);
      const notFoundPage = await env.ASSETS.fetch(
        new Request(new URL("/404", url.origin), request)
      );
      return new Response(notFoundPage.body, {
        status: 404,
        headers: notFoundPage.headers,
      });
    }

    return response;
  },
};

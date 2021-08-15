/// <reference path="./typings.d.ts" />

export async function redirect(url: string): Promise<string> {
  const _url = new URL(url);
  const tagHint = _url.pathname.match(/@([^/]*)/)?.[1] || "";
  const [, pkg, path] = _url.pathname.match(
    /^\/(?:x\/)?([-_a-zA-Z0-9]+)(?:@[^/]*)?(.*)/,
  )!;
  const request = `https://cdn.deno.land/${pkg}/meta/versions.json`;
  const response = await fetch(request);
  const json = await response.json();
  const tags = json.versions.filter((tag: string) => tag.match("^" + tagHint));
  const latestTag = tags[0];
  return `https://deno.land/x/${pkg}${latestTag ? "@" + latestTag : ""}${path}`;
}

self.addEventListener("fetch", async (event) => {
  const dest = await redirect(event.request.url);
  event.respondWith(Response.redirect(dest, 302));
});

// Copyright 2021 TANIGUCHI Masaya. All rights reserved. git.io/mit-license
import * as semver from "https://deno.land/x/semver@v1.4.0/mod.ts";
// import 'https://deno.land/x/fetch_event_adapter/listen.ts';

const re_name = "[^/@]+";
const re_range = "[^/@]+";
const re_path = "|/.*";
const re_x = "(?:x/)?";
const re_pathname = new RegExp(
  `^/(${re_x})(${re_name})@(${re_range})(${re_path})$`,
);

type FetchTags = (name: string) => Promise<string[]>;

async function fetchTagsFromDenoLand(name: string): Promise<string[]> {
  const request = `https://cdn.deno.land/${name}/meta/versions.json`;
  try {
    const response = await fetch(request);
    const json = await response.json() as { versions: string[] };
    return json.versions;
  } catch {
    console.warn(`failed to fetch data from ${request}`);
    return [];
  }
}

async function redirect(url: string, fetchTags: FetchTags): Promise<string> {
  const loose = true;
  const _url = new URL(url);
  const match = decodeURIComponent(_url.pathname).match(re_pathname);
  if (match) {
    const [, x, name, range, path] = match;
    const tags = (await fetchTags(name))
      .filter((tag: string) => {
        return semver.valid(tag, loose) && semver.satisfies(tag, range, loose);
      }).sort((l, r) => {
        return semver.compare(l, r, loose);
      });
    if (tags.length > 0) {
      const tag = tags[tags.length - 1];
      return `https://deno.land/${x}${name}@${tag}${path}`;
    }
    if (range === "latest") {
      return `https://deno.land/${x}${name}${path}`;
    }
  }
  return `https://deno.land${_url.pathname}`;
}

export { re_pathname, redirect };

self.addEventListener("fetch", async (event) => {
  let dest = "https://github.com/tani/lib.deno.dev";
  if (new URL(event.request.url).pathname !== "/") {
    dest = await redirect(event.request.url, fetchTagsFromDenoLand);
  }
  const res = Response.redirect(dest, 302);
  event.respondWith(new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: [
      ...res.headers,
      ["Access-Control-Allow-Origin", "*"]
    ]
  }));
});

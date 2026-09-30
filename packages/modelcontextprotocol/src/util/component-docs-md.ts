import { DOCS_URL, USER_AGENT } from "../config.js";
import { cached } from "./cached.js";

/**
 * Retrieve the component documentation using the showcase shortlink url.
 */
export const retrieveComponentDocsMdFile = cached(async (component: string): Promise<string> => {
  const url = new URL(`/s/components/${component}.md`, DOCS_URL);
  const res = await fetch(new URL(url, DOCS_URL), {
    headers: { "User-Agent": USER_AGENT, Accept: "text/markdown" },
  });
  return res.text();
});

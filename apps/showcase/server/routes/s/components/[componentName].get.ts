import { basename, extname } from "node:path";
import type { H3Event } from "../../../../.nuxt/types/nitro-imports.js";

/**
 * Handle short links that provide a technical component name (e.g. `OnyxButton`) and redirects it
 * to the matching docs page. If the name ends with the `.md` extension, the redirect is performed
 * to the [raw markdown
 * endpoint](https://content.nuxt.com/docs/getting-started/configuration#llms).
 */
export default defineEventHandler(async (event) => {
  const componentParam = getRouterParam(event, "componentName");
  if (!componentParam) {
    return sendNotFound(event);
  }
  const extName = extname(componentParam);
  const componentName = basename(componentParam).replace(extName, "");
  const res = await queryCollection(event, "components_en")
    .where("componentName", "LIKE", componentName) // "LIKE" instead of "=" for case-**in**sensitivity
    .first();
  if (res) {
    const prefix = extName === ".md" ? "/raw" : "";
    const path = `${prefix}${res.path}${extName}`;
    return sendRedirect(event, path);
  }
  return sendNotFound(event);
});

const sendNotFound = async (event: H3Event<globalThis.EventHandlerRequest>) =>
  sendWebResponse(event, new Response(undefined, { status: 404, statusText: "NOT FOUND" }));

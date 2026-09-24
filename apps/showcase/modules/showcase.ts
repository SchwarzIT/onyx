import { hash } from "node:crypto";
import { access, constants, glob, mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { addComponent, defineNuxtModule, createResolver } from "nuxt/kit";
import { stringSplice } from "../utils/string.js";

const CUSTOM_CACHE = fileURLToPath(
  new URL("../node_modules/.cache/register-components/", import.meta.url),
);

/**
 * 1. Each line starting with "<<< "
 * 2. Put everything until the next linebreak into a group.
 * 3. g=global, m=each line, d=enable indices
 *
 * . . . . . . . . . . | 1. | 2. | 3. |
 */
const INLINE_MATCHER = /^<<< (.+?)$/dgm;

const registerExampleComponentsFromCache = async () => {
  try {
    // check if file does exist
    await access(CUSTOM_CACHE, constants.R_OK);
    const files = glob(join(CUSTOM_CACHE, "*.json"));
    const promises: Promise<unknown>[] = [];

    for await (const file of files) {
      promises.push(loadGlobalComponent(file));
    }

    await Promise.allSettled(promises);
  } catch (_) {
    // no cache file - nothing to do
  }
};

const loadGlobalComponent = async (file: string) => {
  const raw = await readFile(file, { encoding: "utf-8" });
  const { filePath, name } = JSON.parse(raw) as { filePath: string; name: string };
  try {
    await access(filePath, constants.R_OK);
    addComponent({ name, filePath, global: true, priority: 1 });
  } catch (_) {
    // file path to example doesn't exist? Then delete the cache file
    unlink(file).catch(() => {});
  }
};

let isReady = false;
export default defineNuxtModule({
  meta: {
    name: "@sit-onyx/showcase",
  },
  defaults: {},
  setup() {
    const globalComponents = ["OnyxTag", "OnyxHeadline"];

    addComponent({
      filePath: "../app/components/",
      name: "ProsePre",
      export: "ProsePre",
      global: true,
      priority: 0,
    });

    // register specific components globally so they can be used in markdown files
    globalComponents.forEach((component) => {
      addComponent({
        filePath: "sit-onyx",
        name: component,
        export: component,
        global: true,
        priority: 1,
      });
    });
  },
  hooks: {
    async "content:file:beforeParse"(ctx) {
      if (ctx.file.extension !== ".md") {
        return;
      }

      const { dirname = "." } = ctx.file;
      const regExpMatches = ctx.file.body.matchAll(INLINE_MATCHER);
      // We must handle the matches in reverse order, so that replacing content between indices does not invalidate other indices.
      const matches = Array.from(regExpMatches).reverse();
      // Ensure cache directory exists. With `recursive: true` it doesn't throw if it already exists
      await mkdir(CUSTOM_CACHE, { recursive: true });

      for (const match of matches) {
        const [path, ...parameters] = match[1]?.trim().split(" ") || [];
        if (!path) {
          continue;
        }
        const [complete] = match.indices || [];
        const [start, end] = complete || [];

        try {
          const { resolve } = createResolver(dirname);
          const filePath = resolve(path);
          const sourceCode = await readFile(filePath, "utf-8");
          if (parameters.includes("preview=true")) {
            const hashValue = hash("sha-1", sourceCode).substring(0, 8);
            const name = `Example${hashValue}`;
            await writeFile(
              join(CUSTOM_CACHE, `${hashValue}.json`),
              JSON.stringify({ name, filePath }),
            );
            isReady && addComponent({ name, filePath, global: true, priority: 1 });
            parameters.push(`previewComponent=${name}`);
          }
          const fileType = path.split(".").at(-1);
          const fileName = path.split("/").at(-1);
          const codeblock = `
\`\`\`${fileType} [${fileName}] ${parameters.join(" ")}
${sourceCode}
\`\`\`
`;
          ctx.file.body = stringSplice(ctx.file.body, start!, end!, codeblock);
        } catch (error) {
          // eslint-disable-next-line no-console -- We need to inform the developer here:
          console.warn(
            "Unable to inline component example in file '",
            ctx.file.id,
            "' because of\n",
            error,
          );
        }
      }
    },
    async ready() {
      isReady = true;
      /**
       * We cannot register the components inside of the "content:file:beforeParse", because that
       * hook only runs once and when templates are changed. Because we want to register the
       * components reliably (on every server restart) we need to perform this action in an extra
       * hook, e.g. "ready".
       */
      await registerExampleComponentsFromCache();
    },
  },
});

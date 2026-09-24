import { hash } from "node:crypto";
import { access, constants, readFile, unlink } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { addComponent, defineNuxtModule, createResolver } from "nuxt/kit";
import { stringSplice } from "../utils/string.js";

/**
 * 1. Each line starting with "<<< "
 * 2. Put everything until the next linebreak into a group.
 * 3. g=global, m=each line, d=enable indices
 *
 * . . . . . . . . . . | 1. | 2. | 3. |
 */
const INLINE_MATCHER = /^<<< (.+?)$/dgm;

const COLLECTION_DB = fileURLToPath(new URL("../.data/content/contents.sqlite", import.meta.url));
const deleteCollectionDb = async () => {
  try {
    await access(COLLECTION_DB, constants.W_OK);
    await unlink(COLLECTION_DB);
  } catch (_) {
    // ignore
  }
};

await deleteCollectionDb();

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
    async restart() {
      await deleteCollectionDb();
    },
    async "content:file:beforeParse"(ctx) {
      if (ctx.file.extension !== ".md") {
        return;
      }

      const { dirname = "." } = ctx.file;
      const regExpMatches = ctx.file.body.matchAll(INLINE_MATCHER);
      // We must handle the matches in reverse order, so that replacing content between indices does not invalidate other indices.
      const matches = Array.from(regExpMatches).reverse();
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
            addComponent({ name, filePath, global: true, priority: 1 });
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
  },
});

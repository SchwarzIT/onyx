import { hash } from "node:crypto";
import { access, constants, unlink } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { addComponent, defineNuxtModule } from "nuxt/kit";
import { inlineCodeExamples } from "./utils/inline-code-examples.js";

export const VUE_EXAMPLES_RENDER_PROP_NAME = "preview";
export const VUE_EXAMPLES_RENDER_COMPONENT_PROP = "previewComponent";

const COLLECTION_DB = fileURLToPath(new URL("../.data/content/contents.sqlite", import.meta.url));

/**
 * Delete collection db on server start and restart, otherwise "content:file:beforeParse" hook won't
 * be called again and we are unable to register the vue components.
 */
const deleteCollectionDb = async () => {
  try {
    await access(COLLECTION_DB, constants.W_OK);
    await unlink(COLLECTION_DB);
  } catch (_) {
    // ignore
  }
};

await deleteCollectionDb();

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

    /**
     * This component acts as proxy for the default `ProsePre` component. If a previewComponent is
     * defined it renders the example code with a preview using the `ComponentExample` component.
     */
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
      await inlineCodeExamples(ctx, {
        vue: async ({ filePath, fileName, fileType, parameters, getFileContent }) => {
          const sourceCode = await getFileContent();
          if (parameters.includes(`${VUE_EXAMPLES_RENDER_PROP_NAME}=true`)) {
            const hashValue = hash("sha-1", sourceCode).substring(0, 8);
            const name = `Example${hashValue}`;
            addComponent({ name, filePath, global: true, priority: 1 });
            parameters.push(`${VUE_EXAMPLES_RENDER_COMPONENT_PROP}=${name}`);
          }
          return `
\`\`\`${fileType} [${fileName}] ${parameters.join(" ")}
${sourceCode}
\`\`\`
`;
        },
      });
    },
  },
});

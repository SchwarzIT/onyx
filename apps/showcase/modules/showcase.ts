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

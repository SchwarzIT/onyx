import { readFile } from "node:fs/promises";
import { basename, extname } from "node:path";
import type { FileBeforeParseHook } from "@nuxt/content";
import { createResolver } from "nuxt/kit";
import { stringSplice } from "../../utils/string.js";

/**
 * 1. Each line starting with "<<< "
 * 2. Put everything until the next linebreak into a group.
 * 3. g=global, m=each line, d=enable indices
 *
 * . . . . . . . . . . | 1. | 2. | 3. |
 */
const INLINE_MATCHER = /^<<< (.+?)$/dgm;

export type CustomHandlerMeta = {
  getFileContent: () => Promise<string>;
  parameters: string[];
  filePath: string;
  /**
   * File extension without a leading dot.
   */
  fileType: string;
  /**
   * File name (with file extension) without path.
   */
  fileName: string;
};

const DEFAULT_HANDLER = async ({
  fileName,
  fileType,
  parameters,
  getFileContent,
}: CustomHandlerMeta): Promise<string> => {
  const sourceCode = await getFileContent();
  return `
\`\`\`${fileType} [${fileName}] ${parameters.join(" ")}
${sourceCode}
\`\`\`
`;
};

/**
 * Supports vitepress-like syntax to inline code snippets into markdown:
 *
 * ```md
 * # Markdown
 *
 * The next line will be replaced with a code block containing the contents of `../path/to/file.ts`.
 * <<< ../path/to/file.ts param=1
 * ```
 *
 * Must be called in the
 * [`content:file:beforeParse`](https://content.nuxt.com/docs/advanced/hooks#contentfilebeforeparse)
 * of the nuxt-content module.
 */
export const inlineCodeExamples = async (
  ctx: FileBeforeParseHook,
  customHandlers?: Record<string, (options: CustomHandlerMeta) => Promise<string>>,
) => {
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
      const getFileContent = () => readFile(filePath, "utf-8");
      const fileType = extname(path).slice(1); // remove leading dot
      const fileName = basename(path);
      const handler = customHandlers?.[fileType] ?? DEFAULT_HANDLER;
      const codeblock = await handler({ fileName, filePath, fileType, getFileContent, parameters });
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
};

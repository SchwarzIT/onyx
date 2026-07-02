import { Root, type RootContent } from "mdast";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import type { Plugin } from "vite";
import yaml from "yaml";
import type { SkillFrontmatter } from "./env.d.js";

const isValidSkillFrontmatter = (object: unknown): object is SkillFrontmatter => {
  if (typeof object !== "object" || object === null) {
    return false;
  }
  if (
    !("name" in object && typeof object.name === "string") ||
    !("description" in object && typeof object.description === "string")
  ) {
    return false;
  }
  return true;
};

const parseMarkdown = (raw: string) => unified().use(remarkParse).use(remarkFrontmatter).parse(raw);
const findAndRemoveFrontmatter = (root: Root) => {
  const frontmatterIndex = root.children.findIndex(({ type }) => type === "yaml");
  const [frontmatter] = root.children.splice(frontmatterIndex, 1);
  return frontmatter;
};
const parseFrontmatter = (node: RootContent) => {
  const parsed = yaml.parse((node as unknown as { value: string }).value);
  if (!isValidSkillFrontmatter(parsed)) {
    throw new Error(
      'Skill markdown file must define "name" and "description" attribute in their frontmatter yaml!',
    );
  }
  return parsed;
};
const toMarkdown = (root: Root) => unified().use(remarkStringify).stringify(root);

/**
 * Plugin for parsing markdown files as LLM skill definition.
 * Will error if the markdown doesn't have a yaml frontmatter or the frontmatter doesn't include the `name` or `description` property.
 *
 * @param include Optional regex for matching file imports.
 */
export const skillMdPlugin = (include: RegExp = /\.md$/): Plugin<undefined> => ({
  name: "skill-md-plugin",
  load: {
    filter: { id: { include } },
    async handler(id) {
      if (new RegExp(include).test(id)) {
        const markdown = await this.fs.readFile(id, { encoding: "utf8" });
        const file = parseMarkdown(markdown);
        const frontmatter = findAndRemoveFrontmatter(file);
        const data = parseFrontmatter(frontmatter);

        const content = toMarkdown(file);
        const frontMatterData = data && typeof data === "object" ? data : {};

        const code = `export default ${JSON.stringify(content)};
export const raw = ${JSON.stringify(markdown)};
export const frontmatter = ${JSON.stringify(frontMatterData)};`;

        return { moduleType: "js", moduleSideEffects: false, code };
      }
    },
  },
});

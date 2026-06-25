/// <reference types="vite/client" />

export type SkillFrontmatter = {
  name: string;
  description: string;
};

export type SkillMarkdown = {
  default: string;
  raw: string;
  frontmatter: SkillFrontmatter;
};

declare module "*.md" {
  const markdown: string;
  export default markdown;
  export const raw: string;
  export const frontmatter: SkillFrontmatter;
}

/// <reference types="vite/client" />

/**
 * Agent skills specification based on https://agentskills.io/specification
 */
export type SkillFrontmatter = {
  /**
   * 	Max 64 characters. Lowercase letters, numbers, and hyphens only. Must not start or end with a hyphen.
   */
  name: string;
  /**
   * Max 1024 characters. Non-empty. Describes what the skill does and when to use it.
   */
  description: string;
  /**
   * 	License name or reference to a bundled license file.
   */
  license?: string;
  /**
   * 	Max 500 characters. Indicates environment requirements (intended product, system packages, network access, etc.).
   */
  compatibility?: string;
  /**
   * 	Arbitrary key-value mapping for additional metadata.
   */
  metadata?: object;
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

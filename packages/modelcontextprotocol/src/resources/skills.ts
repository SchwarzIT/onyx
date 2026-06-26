import { log } from "node:console";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { SkillMarkdown } from "../../env.js";
import type { RegisterableResource } from "../types.js";

const skills = import.meta.glob<SkillMarkdown>("./skills/**/SKILL.md", { eager: true });

export const allSkills = Object.values(skills).map<RegisterableResource<false>>(
  ({ default: text, frontmatter: { description, name } }) => [
    name,
    `sit-onyx://skill/${name}`,
    {
      title: name,
      description,
      mimeType: "text/markdown",
    },
    (uri: URL) => ({
      contents: [
        {
          uri: uri.href,
          text,
          mimeType: "text/markdown",
        },
      ],
    }),
  ],
);

export const writeSkillFiles = async (skillsDirectory: string) => {
  const promises = Object.values(skills).map(async (skill) => {
    const directory = resolve(skillsDirectory, skill.frontmatter.name);
    await mkdir(directory, { recursive: true });
    const file = resolve(directory, "SKILL.md");
    await writeFile(file, skill.raw);
    log(`Skill ${skill.frontmatter.name} written to ${directory}`);
  });
  return Promise.all(promises);
};

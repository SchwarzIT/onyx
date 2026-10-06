import type { Endpoints } from "@octokit/types";

type GitHubContributor =
  Endpoints["GET /repos/{owner}/{repo}/contributors"]["response"]["data"][number];

type OnyxTeamMember = Pick<GitHubContributor, "login" | "avatar_url"> & {
  name: string;
  role: string;
};

export default defineEventHandler(() => {
  const members: OnyxTeamMember[] = [
    {
      name: "Martin Hofmann",
      login: "mj-hof",
      avatar_url: "https://github.com/mj-hof.png",
      role: "Product Owner",
    },
    {
      name: "Jonathan Leo Carle",
      login: "JoCa96",
      avatar_url: "https://github.com/JoCa96.png",
      role: "Tech Lead",
    },
    {
      name: "Jonas Gramling",
      login: "Jonas-Gramling-UX",
      avatar_url: "https://github.com/Jonas-Gramling-UX.png",
      role: "UX Expert",
    },
    {
      name: "Lars Rickert",
      login: "larsrickert",
      avatar_url: "https://github.com/larsrickert.png",
      role: "Engineer",
    },
    {
      name: "Christian Busshof",
      login: "ChristianBusshoff",
      avatar_url: "https://github.com/ChristianBusshoff.png",
      role: "Engineer",
    },
    {
      name: "Nadine Baranzew",
      login: "Guergchen",
      avatar_url: "https://github.com/Guergchen.png",
      role: "UX Expert",
    },
    {
      name: "Marko Kordic",
      login: "Marko-Kordic",
      avatar_url: "https://github.com/Marko-Kordic.png",
      role: "UX Expert",
    },
  ];

  return members.sort((a, b) => {
    return getLastName(a.name).localeCompare(getLastName(b.name));
  });
});

/**
 * Gets the last name from the given full name.
 */
function getLastName(fullName: string): string {
  return fullName.trim().split(/\s+/).at(-1) ?? fullName;
}

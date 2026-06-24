---
layout: page
---

<script lang="ts" setup>
import { data } from "./team.data";
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme';

const sortByContributions = (a, b) =>   b.contributions - a.contributions;
const sortByOverride = (a, b) => overrides.findIndex(o => o.login === a.login) - overrides.findIndex(o => o.login === b.login);

// https://vitepress.dev/reference/default-theme-team-page#show-team-members-in-a-page
// Add your full name here, if you want it to be shown
const overrides = [
  {
    login: "mj-hof",
    name: 'Martin Hofmann',
    core: true,
    title: 'Product Owner',
    org: "Schwarz Digits",
    orgLink: "https://schwarz-digits.de/"
  },
  {
    login: "jannick-ux",
    name: 'Jannick Keller',
    core: true,
    title: 'Design Lead',
    org: "Schwarz Digits",
    orgLink: "https://schwarz-digits.de/",
  },
  {
    login: "flubnau",
    name: 'Florian Lubnau',
    core: true,
    title: 'Designer',
    org: "Schwarz Digits",
    orgLink: "https://schwarz-digits.de/",
    links: [
      { icon: 'github', link: 'https://github.com/flubnau' },
    ],
  },
  {
    login: "Guergchen",
    name: 'Nadine Baranzew',
    core: true,
    title: 'Designer',
    org: "Schwarz Digits",
    orgLink: "https://schwarz-digits.de/",
    links: [
      { icon: 'github', link: 'https://github.com/Guergchen' },
    ],
  },
  {
    login: "JoCa96",
    name: 'Jonathan Leo Carle',
    core: true,
    title: 'Engineering Lead',
    org: "Schwarz Digits",
    orgLink: "https://schwarz-digits.de/",
  },
  {
    login: "BoppLi",
    name: 'Linda Bopp',
    core: false,
    org: "Schwarz Digits",
    orgLink: "https://schwarz-digits.de/",
    desc: "Former Core Member 🫡",
  },
  {
    login: "larsrickert",
    name: 'Lars Rickert',
    core: true,
    title: 'Engineer',
    org: "Schwarz Digits",
    orgLink: "https://schwarz-digits.de/",
  },
  {
    login: "MajaZarkova",
    name: 'Maja Zarkova',
    core: false,
    desc: "Former Core Member 🫡",
  },
    {
    login: "ChristianBusshoff",
    name: 'Christian Bußhoff',
    core: true,
    title: 'Engineer',
    org: "Schwarz Digits",
    orgLink: "https://schwarz-digits.de/",
  },
  {
    login: "rhoggs-bot-test-account",
    type: "Bot",
  },
  {
    login: "oemueller",
    name: "Oliver Müller",
    org: "Schwarz Digits",
    orgLink: "https://schwarz-digits.de/",
  },
  {
    login: "markbrockhoff",
    name: "Mark Brockhoff",
    org: "Schwarz Digits",
    orgLink: "https://schwarz-digits.de/",
  }
];

const mapped = data.contributors.map((c) => ({
  ...c,
  avatar: c.avatar_url,
  name: c.login,
  links: [
    { icon: 'github', link: c.html_url },
  ],
  ...overrides.find(n => c.login === n.login)
}));

// add overrides if they do not exist in the contributors
overrides.forEach(override => {
  if (!mapped.find(contributor => contributor.login === override.login)) {
    mapped.push({ avatar: `https://github.com/${override.login}.png`, ...override});
  }
})

const coreMembers = mapped.filter(m => m.core).sort(sortByOverride);
const bots = mapped.filter(m => m.type === "Bot").sort(sortByContributions);
const contributors = mapped.filter(m => !bots.includes(m) && !coreMembers.includes(m)).sort(sortByContributions);
</script>

<main>
  <VPTeamPage style="margin-top: 0;">
    <VPTeamPageTitle>
      <template #title>Meet the team 👋</template>
      <template #lead>
        onyx is maintained by a dedicated team at <a href="https://schwarz-digits.de">Schwarz Digits</a>. Below you will find the core members of our team.
        <br><br>
        Are you looking for a bug report or feature request?
        <br><br>
        Then please use our <a href="https://github.com/SchwarzIT/onyx/issues">GitHub issues</a>.
        For general Q&A, announcements and polls feel free to visit our community space via <a href="https://github.com/SchwarzIT/onyx/discussions/categories/q-a">GitHub discussions</a>.
      </template>
    </VPTeamPageTitle>
    <VPTeamMembers size="medium" :members="coreMembers" />
    <VPTeamPageSection>
      <template #title>Thank you to all contributors 🙏</template>
      <template #members>
        <VPTeamMembers size="small" :members="contributors" />
      </template>
    </VPTeamPageSection>
    <VPTeamPageSection>
      <template #title>Our hardworking bots 🤖</template>
      <template #members>
        <VPTeamMembers size="small" :members="bots" />
      </template>
    </VPTeamPageSection>
  </VPTeamPage>
</main>

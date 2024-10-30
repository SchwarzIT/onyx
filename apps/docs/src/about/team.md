---
layout: page
---

<script lang="ts" setup>
import { data } from "../index.data";
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

const shuffleArray = (array) =>
  array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

    
// https://vitepress.dev/reference/default-theme-team-page#show-team-members-in-a-page
// Add your full name here, if you want it to be shown
const overrides = [
  {
    login: "mj-hof",
    name: 'Martin Hofmann',
    core: true,
    title: 'Product Owner',
  },
  {
    login: "jannick-ux",
    name: 'Jannick Keller',
    core: true,
    title: 'Lead Designer',
  },
  {
    login: "flubnau",
    name: 'Florian Lubnau',
    core: true,
    title: 'Designer',
  },
  {
    login: "JoCa96",
    name: 'Jonathan Leo Carle',
    core: true,
    title: 'Engineering Lead',
  },
  {
    login: "BoppLi",
    name: 'Linda Bopp',
    core: true,
    title: 'Engineer',
  },
  {
    login: "larsrickert",
    name: 'Lars Rickert',
    core: true,
    title: 'Engineer',
  },
  {
    login: "MajaZarkova",
    name: 'Maja Zarkova',
    core: true,
    title: 'Engineer',
  },
    {
    login: "ChristianBusshoff",
    name: 'Christian Bußhoff',
    core: true,
    title: 'Engineer',
  },
  {
    login: "rhoggs-bot-test-account",
    type: "Bot",
  },
  {
    login: "oemueller",
    name: "Oliver Müller"
  },
  {
    login: "markbrockhoff",
    name: "Mark Brockhoff"
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

const coreMembers = mapped.filter(m => m.core);
const bots = mapped.filter(m => m.type === "Bot");
const contributors = mapped.filter(m => !bots.includes(m) && !coreMembers.includes(m));
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Meet the team 👋</template>
    <template #lead>
      onyx is maintained by a dedicated team at <a href="https://it.schwarz">Schwarz IT</a>. Below you will find the core members of our team.
      <br><br>
      Are you looking for a bug report or feature request?
      <br><br>
      Then please use our <a href="https://github.com/SchwarzIT/onyx/issues">GitHub issues</a>.
      For general Q&A, announcements and polls feel free to visit our community space via <a href="https://github.com/SchwarzIT/onyx/discussions/categories/q-a">GitHub discussions</a>.
    </template>

  </VPTeamPageTitle>
  
  <VPTeamMembers size="medium" :members="shuffleArray(coreMembers)" />
  <VPTeamPageSection>
    <template #title>Thank you to all contributors 🙏</template>
    <template #members>
      <VPTeamMembers size="small" :members="shuffleArray(contributors)" />
    </template>
  </VPTeamPageSection>
  <VPTeamPageSection>
    <template #title>Our hardworking bots 🤖</template>
    <template #members>
      <VPTeamMembers size="small" :members="shuffleArray(bots)" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>

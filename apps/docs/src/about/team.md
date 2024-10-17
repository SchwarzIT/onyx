<script lang="ts" setup>
import { VPTeamMembers } from 'vitepress/theme'

// https://vitepress.dev/reference/default-theme-team-page#show-team-members-in-a-page
const members = [
  {
    avatar: 'https://www.github.com/mj-hof.png',
    name: 'Martin Hofmann',
    title: 'Product Owner',
    links: [
      { icon: 'github', link: 'https://github.com/mj-hof' },
    ]
  },
  {
    avatar: 'https://www.github.com/jannick-ux.png',
    name: 'Jannick Keller',
    title: 'Lead Designer',
    links: [
      { icon: 'github', link: 'https://github.com/jannick-ux' },
    ]
  },
  {
    avatar: 'https://www.github.com/JoCa96.png',
    name: 'Jonathan Leo Carle',
    title: 'Lead Developer',
    links: [
      { icon: 'github', link: 'https://github.com/JoCa96' },
    ]
  },
  {
    avatar: 'https://www.github.com/BoppLi.png',
    name: 'Linda Bopp',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/BoppLi' },
    ]
  },
  {
    avatar: 'https://www.github.com/larsrickert.png',
    name: 'Lars Rickert',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/larsrickert' },
    ]
  },
  {
    avatar: 'https://www.github.com/MajaZarkova.png',
    name: 'Maja Zarkova',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/MajaZarkova' },
    ]
  },
    {
    avatar: 'https://www.github.com/ChristianBusshoff.png',
    name: 'Christian Bußhoff',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/ChristianBusshoff' },
    ]
  },
]
</script>

# Meet the team 👋

onyx is maintained by [Schwarz IT](https://it.schwarz). Below you will find the members of our Core Team.

Are you looking for a bug report or feature request? Then please use our [GitHub issues](https://github.com/SchwarzIT/onyx/issues).
For general Q&A, announcements and polls feel free to visit our community space via [GitHub discussions](https://github.com/SchwarzIT/onyx/discussions/categories/q-a).

<VPTeamMembers size="small" :members="members" />

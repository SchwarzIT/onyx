<script lang="ts" setup>
import bell from "@sit-onyx/icons/bell.svg?raw";
import logout from "@sit-onyx/icons/logout.svg?raw";
import search from "@sit-onyx/icons/search.svg?raw";
import { ref } from "vue";
import { DENSITIES, type Density } from "../../../composables/density";
import OnyxAppLayout from "../../OnyxAppLayout/OnyxAppLayout.vue";
import OnyxAvatar from "../../OnyxAvatar/OnyxAvatar.vue";
import OnyxAvatarStack from "../../OnyxAvatarStack/OnyxAvatarStack.vue";
import OnyxBadge from "../../OnyxBadge/OnyxBadge.vue";
import OnyxHeadline from "../../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../../OnyxIcon/OnyxIcon.vue";
import OnyxIconButton from "../../OnyxIconButton/OnyxIconButton.vue";
import type { ColorSchemeValue } from "../../OnyxNavBar/modules";
import OnyxColorSchemeMenuItem from "../../OnyxNavBar/modules/OnyxColorSchemeMenuItem/OnyxColorSchemeMenuItem.vue";
import OnyxMenuItem from "../../OnyxNavBar/modules/OnyxMenuItem/OnyxMenuItem.vue";
import OnyxNavButton from "../../OnyxNavBar/modules/OnyxNavButton/OnyxNavButton.vue";
import OnyxNavItem from "../../OnyxNavBar/modules/OnyxNavItem/OnyxNavItem.vue";
import OnyxUserMenu from "../../OnyxNavBar/modules/OnyxUserMenu/OnyxUserMenu.vue";
import OnyxNavBar from "../../OnyxNavBar/OnyxNavBar.vue";
import OnyxPageLayout from "../../OnyxPageLayout/OnyxPageLayout.vue";
import OnyxPagination from "../../OnyxPagination/OnyxPagination.vue";
import OnyxRadioGroup from "../../OnyxRadioGroup/OnyxRadioGroup.vue";
import type { SelectOption } from "../../OnyxSelect/types";
import OnyxTable from "../../OnyxTable/OnyxTable.vue";
import OnyxTag from "../../OnyxTag/OnyxTag.vue";

const colorScheme = ref<ColorSchemeValue>("light");
const density = ref<Density>("default");
const currentPage = ref(1);

const teamMembers = [
  {
    avatar: "https://www.github.com/mj-hof.png",
    name: "Martin Hofmann",
    title: "Product Owner",
    status: {
      label: "Offline",
      color: "neutral",
    },
  },
  {
    avatar: "https://www.github.com/jannick-ux.png",
    name: "Jannick Keller",
    title: "Lead Designer",
    status: {
      label: "Busy",
      color: "danger",
    },
  },
  {
    avatar: "https://www.github.com/JoCa96.png",
    name: "Jonathan Leo Carle",
    title: "Lead Developer",
    status: {
      label: "Online",
      color: "success",
    },
  },
  {
    avatar: "https://www.github.com/BoppLi.png",
    name: "Linda Bopp",
    title: "Developer",
    status: {
      label: "Away",
      color: "warning",
    },
  },
  {
    avatar: "https://www.github.com/larsrickert.png",
    name: "Lars Rickert",
    title: "Developer",
    status: {
      label: "Do not disturb",
      color: "danger",
    },
  },
  {
    avatar: "https://www.github.com/MajaZarkova.png",
    name: "Maja Zarkova",
    title: "Developer",
    status: {
      label: "Online",
      color: "success",
    },
  },
  {
    avatar: "https://www.github.com/ChristianBusshoff.png",
    name: "Christian Bußhoff",
    title: "Developer",
    status: {
      label: "Out of office",
      color: "info",
    },
  },
] as const;

const densityOptions: SelectOption[] = DENSITIES.map((density) => ({
  label: density,
  value: density,
}));
</script>

<template>
  <OnyxAppLayout :class="{ dark: colorScheme === 'dark', [`onyx-density-${density}`]: true }">
    <template #navBar>
      <OnyxNavBar app-name="Component Showcase" logo-url="/onyx-logo.svg">
        <OnyxNavButton label="Page 1" active />
        <OnyxNavButton label="Page 2">
          <template #children>
            <OnyxNavItem label="Subpage 1" />
            <OnyxNavItem label="Subpage 2" />
          </template>
        </OnyxNavButton>
        <OnyxNavButton label="Page 3" with-external-icon />
        <OnyxNavButton label="Page 4">
          Page 4
          <OnyxBadge color="warning" dot />
        </OnyxNavButton>

        <template #globalContextArea>
          <OnyxIconButton label="Search" :icon="search" color="neutral" />
          <OnyxIconButton label="Notifications" :icon="bell" color="neutral" />
        </template>

        <template #contextArea>
          <OnyxUserMenu username="Jane Doe" description="Company name">
            <OnyxColorSchemeMenuItem v-model="colorScheme" />

            <OnyxMenuItem color="danger">
              <OnyxIcon :icon="logout" />
              Logout
            </OnyxMenuItem>

            <template #footer>
              App version
              <span class="onyx-text--monospace">0.0.0</span>
            </template>
          </OnyxUserMenu>
        </template>
      </OnyxNavBar>
    </template>

    <OnyxPageLayout>
      <template #sidebar>
        <div class="sidebar">
          <div>
            <OnyxHeadline is="h3" class="sidebar__headline">Team members</OnyxHeadline>

            <OnyxAvatarStack>
              <OnyxAvatar
                v-for="member in teamMembers"
                :key="member.name"
                size="32px"
                :label="member.name"
                :src="member.avatar"
              />
              <OnyxAvatar label="+7" size="32px" />
            </OnyxAvatarStack>
          </div>

          <OnyxRadioGroup v-model="density" label="Density" :options="densityOptions" />
        </div>
      </template>

      <div class="onyx-grid-container page">
        <OnyxHeadline is="h1">Page headline</OnyxHeadline>

        <p>This is a component showcase for the onyx design system. Created by Schwarz IT.</p>

        <OnyxTable class="table" striped>
          <template #head>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </template>

          <tr v-for="member in teamMembers" :key="member.name">
            <td class="table__avatar">
              <OnyxAvatar size="24px" :label="member.name" :src="member.avatar" />
            </td>
            <td>{{ member.name }}</td>
            <td>{{ member.title }}</td>
            <td>{{ member.name.replace(/ /g, ".").toLowerCase() }}@example.com</td>
            <td>
              <OnyxTag v-bind="member.status" />
            </td>
          </tr>
        </OnyxTable>

        <OnyxPagination v-model="currentPage" class="table__pagination" :pages="4" />
      </div>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
:deep(.onyx-page__sidebar) {
  border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-200);
}

.sidebar {
  width: 19vw;
  padding: var(--onyx-spacing-md);
  display: flex;
  flex-direction: column;
  gap: var(--onyx-density-xl);

  &__headline {
    margin-bottom: var(--onyx-density-2xs);
  }
}

.page {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-grid-gutter);
}

.table {
  &__avatar {
    width: calc(1.5rem + var(--onyx-density-md));
  }

  &__pagination {
    margin-left: auto;
  }
}
</style>

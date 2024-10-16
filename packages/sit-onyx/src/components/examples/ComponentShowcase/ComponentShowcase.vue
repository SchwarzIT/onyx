<script lang="ts" setup>
import bell from "@sit-onyx/icons/bell.svg?raw";
import logout from "@sit-onyx/icons/logout.svg?raw";
import search from "@sit-onyx/icons/search.svg?raw";
import { ref } from "vue";
import { DENSITIES, type Density } from "../../../composables/density";
import type { SelectOptionValue } from "../../../types";
import OnyxAppLayout from "../../OnyxAppLayout/OnyxAppLayout.vue";
import OnyxAvatar from "../../OnyxAvatar/OnyxAvatar.vue";
import OnyxAvatarStack from "../../OnyxAvatarStack/OnyxAvatarStack.vue";
import OnyxBadge from "../../OnyxBadge/OnyxBadge.vue";
import OnyxButton from "../../OnyxButton/OnyxButton.vue";
import OnyxDialog from "../../OnyxDialog/OnyxDialog.vue";
import OnyxForm from "../../OnyxForm/OnyxForm.vue";
import OnyxHeadline from "../../OnyxHeadline/OnyxHeadline.vue";
import OnyxIcon from "../../OnyxIcon/OnyxIcon.vue";
import OnyxIconButton from "../../OnyxIconButton/OnyxIconButton.vue";
import OnyxInput from "../../OnyxInput/OnyxInput.vue";
import OnyxLink from "../../OnyxLink/OnyxLink.vue";
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
import OnyxSelect from "../../OnyxSelect/OnyxSelect.vue";
import type { SelectOption } from "../../OnyxSelect/types";
import OnyxStepper from "../../OnyxStepper/OnyxStepper.vue";
import OnyxSwitch from "../../OnyxSwitch/OnyxSwitch.vue";
import OnyxTable from "../../OnyxTable/OnyxTable.vue";
import OnyxTag from "../../OnyxTag/OnyxTag.vue";
import OnyxToast from "../../OnyxToast/OnyxToast.vue";
import { useToast } from "../../OnyxToast/useToast";

const toast = useToast();

const colorScheme = ref<ColorSchemeValue>("light");
const density = ref<Density>("default");
const currentPage = ref(1);
const inputValue = ref("");
const switchValue = ref(false);
const stepperValue = ref<number>();
const selectValue = ref<SelectOptionValue[]>([]);
const isDialogOpen = ref(false);

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

const selectOptions: SelectOption[] = [
  {
    label: "dev",
    value: "dev",
    group: "Implementation",
  },
  {
    label: "ux",
    value: "ux",
    group: "Implementation",
  },
  {
    label: "bug",
    value: "bug",
    group: "Implementation",
  },
  {
    label: "documentation",
    value: "documentation",
    group: "Documentation",
  },
  {
    label: "storybook",
    value: "storybook",
    group: "Documentation",
  },
  {
    label: "breaking-change",
    value: "breaking-change",
    group: "Documentation",
    disabled: true,
  },
];

const handleSubmit = () => {
  toast.show({
    headline: "Successfully submitted form",
    description: "This is just an example. Nothing was actually submitted.",
    color: "success",
  });
};
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

          <OnyxForm class="form" method="dialog" @submit="handleSubmit">
            <OnyxInput
              v-model="inputValue"
              label="Search"
              placeholder="Type to search..."
              label-tooltip="This is an example label tooltip with more information."
              message="Example message"
              :maxlength="64"
              :minlength="3"
              with-counter
            />

            <OnyxSelect
              v-model="selectValue"
              label="Tags"
              list-label="List of available tags"
              placeholder="No tags selected"
              :options="selectOptions"
              with-search
              with-check-all
              multiple
            />

            <OnyxStepper
              v-model="stepperValue"
              label="Max. count"
              :min="1"
              placeholder="Unlimited"
            />

            <OnyxSwitch v-model="switchValue" label="Include archive" />

            <div class="form__actions">
              <OnyxButton label="Reset" type="reset" color="neutral" />
              <OnyxButton label="Submit" type="submit" />
            </div>
          </OnyxForm>
        </div>
      </template>

      <div class="onyx-grid-container page">
        <OnyxHeadline is="h1">Page headline</OnyxHeadline>

        <p>This is a component showcase for the onyx design system. Created by Schwarz IT.</p>

        <OnyxButton label="Open dialog" @click="isDialogOpen = true" />

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
            <td>
              <OnyxLink
                :href="`mailto:${member.name.replace(/ /g, '.').toLowerCase()}@example.com`"
                target="_blank"
                with-external-icon
              >
                {{ member.name.replace(/ /g, ".").toLowerCase() }}@example.com</OnyxLink
              >
            </td>
            <td>
              <OnyxTag v-bind="member.status" />
            </td>
          </tr>
        </OnyxTable>

        <OnyxPagination v-model="currentPage" class="table__pagination" :pages="4" />
      </div>

      <OnyxDialog label="Example dialog" modal :open="isDialogOpen" @close="isDialogOpen = false">
        <div class="dialog">
          <OnyxHeadline is="h1">Example dialog</OnyxHeadline>

          <p>Click "Close" or press Escape to close this dialog.</p>

          <OnyxButton label="Close" color="neutral" @click="isDialogOpen = false" />
        </div>
      </OnyxDialog>

      <OnyxToast />
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
  height: 100%;

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

.form {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: var(--onyx-grid-gutter);

  &__actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--onyx-density-xs);
  }
}

.dialog {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-spacing-md);
}
</style>

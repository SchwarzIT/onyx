<script lang="ts" setup>
import arrowSmallRight from "@sit-onyx/icons/arrow-small-right.svg?raw";
import checkSmall from "@sit-onyx/icons/check-small.svg?raw";
import logout from "@sit-onyx/icons/logout.svg?raw";
import settings from "@sit-onyx/icons/settings.svg?raw";
import shareIos from "@sit-onyx/icons/share-ios.svg?raw";
import { ref } from "vue";
import {
  OnyxAvatar,
  OnyxAvatarStack,
  OnyxBadge,
  OnyxButton,
  OnyxCheckboxGroup,
  OnyxColorSchemeMenuItem,
  OnyxHeadline,
  OnyxIcon,
  OnyxIconButton,
  OnyxInput,
  OnyxMenuItem,
  OnyxNavBar,
  OnyxNavButton,
  OnyxNavItem,
  OnyxPagination,
  OnyxRadioGroup,
  OnyxSelect,
  OnyxStepper,
  OnyxSwitch,
  OnyxTable,
  OnyxTag,
  OnyxTextarea,
  OnyxToastMessage,
  OnyxUserMenu,
  type SelectOption,
} from "../../..";

type State = {
  select?: string[];
  textarea?: string;
  pagination: number;
  checkboxGroup?: number[];
  radioGroup?: number;
  stepper?: number;
};

const isDark = defineModel<boolean>("dark");

const selectOptions = Array.from({ length: 6 }, (_, index) => {
  return {
    label: `Option ${index + 1}`,
    value: index + 1,
  } satisfies SelectOption;
});

const checkboxGroupOptions = Array.from({ length: 3 }, (_, index) => {
  return {
    label: "Checkbox",
    value: index + 1,
  } satisfies SelectOption;
});

const radioGroupOptions = Array.from({ length: 4 }, (_, index) => {
  return {
    label: "Radio button",
    value: index + 1,
  } satisfies SelectOption;
});

const state = ref<State>({
  pagination: 1,
  checkboxGroup: [checkboxGroupOptions.length],
  radioGroup: 1,
});

const teamMembers = [
  { avatar: "https://www.github.com/mj-hof.png", name: "Martin Hofmann" },
  { avatar: "https://www.github.com/jannick-ux.png", name: "Jannick Keller" },
  { avatar: "https://www.github.com/JoCa96.png", name: "Jonathan Leo Carle" },
  { avatar: "https://www.github.com/BoppLi.png", name: "Linda Bopp" },
  { avatar: "https://www.github.com/larsrickert.png", name: "Lars Rickert" },
  { avatar: "https://www.github.com/MajaZarkova.png", name: "Maja Zarkova" },
  { avatar: "https://www.github.com/ChristianBusshoff.png", name: "Christian Bußhoff" },
];
</script>

<template>
  <div class="showcase onyx-text" :class="{ dark: isDark }">
    <div class="showcase__layout">
      <div class="showcase__left">
        <div class="showcase__flex">
          <OnyxSelect
            v-model="state.select"
            label="Select"
            list-label="List of options"
            placeholder="Select"
            :options="selectOptions"
            multiple
            with-search
            hide-label
          />

          <OnyxSwitch v-model="isDark" label="Dark mode" />

          <OnyxPagination v-model="state.pagination" class="showcase__pagination" :pages="6" />
        </div>

        <OnyxTable striped>
          <template #head>
            <tr>
              <th>User</th>
              <th>Status</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </template>

          <tr>
            <td>
              <strong>Lindsay Borrows</strong>
            </td>
            <td>active</td>
            <td>02/12/26</td>
            <td class="font--soft">-</td>
          </tr>
          <tr>
            <td>
              <strong>Pete Ellis Doyle</strong>
            </td>
            <td>on hold</td>
            <td>25/07/26</td>
            <td class="font--soft">06:30</td>
          </tr>
          <tr>
            <td>
              <strong>Barry Louis</strong>
            </td>
            <td>active</td>
            <td>09/09/26</td>
            <td class="font--soft">06:45</td>
          </tr>
          <tr>
            <td>
              <strong>Timothy Nixon</strong>
            </td>
            <td>active</td>
            <td>30/10/26</td>
            <td class="font--soft">-</td>
          </tr>
          <tr>
            <td>
              <strong>Will Monroe</strong>
            </td>
            <td>finished</td>
            <td>27/03/26</td>
            <td class="font--soft">14:56</td>
          </tr>
          <tr>
            <td>
              <strong>Francis Walsh</strong>
            </td>
            <td>ready</td>
            <td>16/12/26</td>
            <td class="font--soft">12:05</td>
          </tr>
        </OnyxTable>
      </div>

      <div class="showcase__right">
        <OnyxTextarea
          v-model="state.textarea"
          label="Textarea"
          hide-label
          placeholder="Enter free text here"
          :autosize="{ min: 7, max: 14 }"
        />

        <OnyxToastMessage headline="Toast notification" description="Description" :duration="0" />

        <div class="showcase__flex">
          <OnyxBadge class="showcase__badge">Badge</OnyxBadge>

          <OnyxTag label="Tag" />
          <OnyxTag label="Tag" color="neutral" />
          <OnyxTag label="Tag" color="danger" />
          <OnyxTag label="Tag" color="warning" />
          <OnyxTag label="Tag" color="success" />
        </div>
      </div>
    </div>

    <div class="showcase__bottom">
      <OnyxCheckboxGroup
        v-model="state.checkboxGroup"
        label="Checkbox group"
        hide-label
        :options="checkboxGroupOptions"
        with-check-all
      />

      <div class="showcase__bottom-right">
        <div class="showcase__bottom-section">
          <OnyxAvatarStack>
            <OnyxAvatar
              v-for="member in teamMembers"
              :key="member.name"
              :label="member.name"
              :src="member.avatar"
              size="32px"
            />
            <OnyxAvatar label="+3" size="32px" />
          </OnyxAvatarStack>

          <OnyxRadioGroup
            v-model="state.radioGroup"
            label="Radio group"
            hide-label
            :options="radioGroupOptions"
            direction="horizontal"
          />
        </div>

        <div class="showcase__bottom-section">
          <OnyxInput label="Input" placeholder="Example input" hide-label />

          <div class="showcase__flex">
            <OnyxIconButton :icon="shareIos" label="Icon button" />
            <OnyxButton :icon="arrowSmallRight" label="Button" color="neutral" />
            <OnyxButton :icon="checkSmall" label="Button" />
            <OnyxStepper v-model="state.stepper" label="Stepper" hide-label placeholder="0" />
          </div>
        </div>

        <div class="showcase__bottom-section">
          <OnyxHeadline is="h1">Page title headline</OnyxHeadline>

          <div class="showcase__flex">
            <OnyxCheckboxGroup
              label="Checkbox group (skeleton)"
              hide-label
              direction="horizontal"
              :skeleton="4"
              :options="[]"
            />
          </div>
        </div>
      </div>
    </div>

    <OnyxNavBar app-name="Nav bar" logo-url="/onyx-logo.svg">
      <OnyxNavButton label="Page 1" active />
      <OnyxNavButton label="Page 2">
        <template #children>
          <OnyxNavItem label="Subpage 1" />
          <OnyxNavItem label="Subpage 2" />
        </template>
      </OnyxNavButton>
      <OnyxNavButton label="Page 3" with-external-icon />

      <template #contextArea>
        <OnyxUserMenu description="Company Name" username="Jane Doe">
          <OnyxMenuItem>
            <OnyxIcon :icon="settings" />
            Settings
          </OnyxMenuItem>
          <OnyxColorSchemeMenuItem
            :model-value="isDark ? 'dark' : 'light'"
            @update:model-value="isDark = $event === 'dark'"
          />
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
  </div>
</template>

<style lang="scss" scoped>
@use "../../../styles/breakpoints.scss";

.showcase {
  font-family: var(--onyx-font-family);
  color: var(--onyx-color-text-icons-neutral-intense);
  background-color: var(--onyx-color-base-background-tinted);

  display: flex;
  flex-direction: column;
  gap: var(--onyx-spacing-xl);
  max-width: 64rem;
  container-type: inline-size;

  &__layout {
    display: grid;
    grid-template-columns: 1fr minmax(26rem, 33%);
    gap: var(--onyx-spacing-xl);

    @include breakpoints.container(max, sm) {
      grid-template-columns: 1fr;
    }
  }

  &__flex {
    display: flex;
    gap: var(--onyx-spacing-lg);
    align-items: center;
  }

  &__pagination {
    margin-left: auto;
  }

  &__left,
  &__right,
  &__bottom-right {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-xl);
    flex-grow: 1;
  }

  &__bottom-right {
    gap: var(--onyx-spacing-lg);
  }

  &__bottom {
    display: flex;
    gap: var(--onyx-spacing-2xl);
  }

  &__bottom-section {
    display: flex;
    gap: var(--onyx-spacing-lg);
    align-items: flex-start;
    justify-content: space-between;
  }

  &__badge {
    margin-right: auto;
  }
}

.font {
  &--soft {
    color: var(--onyx-color-text-icons-neutral-soft);
  }
}

:deep(.onyx-radio-group__content--horizontal),
:deep(.onyx-checkbox-group__content--horizontal) {
  justify-content: flex-end;
}
</style>

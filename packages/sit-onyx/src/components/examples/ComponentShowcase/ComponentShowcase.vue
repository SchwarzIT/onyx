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
  OnyxIcon,
  OnyxIconButton,
  OnyxInput,
  OnyxMenuItem,
  OnyxNavBar,
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
  select?: number[];
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
  <div class="parent">
    <div class="showcase onyx-text" :class="{ dark: isDark }">
      <div class="showcase__flex grid--row1">
        <OnyxPagination v-model="state.pagination" :pages="6" />

        <OnyxSelect
          v-model="state.select"
          class="showcase__select"
          label="Select"
          list-label="List of options"
          placeholder="Select"
          :options="selectOptions"
          multiple
          with-search
          hide-label
        />

        <OnyxSwitch v-model="isDark" label="Dark mode" />
      </div>

      <OnyxTable class="grid--table" striped>
        <template #head>
          <tr>
            <th scope="col">User</th>
            <th scope="col">Status</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
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

      <OnyxTextarea
        v-model="state.textarea"
        class="grid--textarea"
        label="Textarea"
        hide-label
        placeholder="Enter free text here"
        :autosize="{ min: 7, max: 14 }"
      />

      <OnyxToastMessage
        class="grid--toast"
        headline="Toast notification"
        description="Description"
        :duration="0"
      />

      <div class="showcase__flex grid--tags">
        <OnyxBadge>Badge</OnyxBadge>

        <OnyxTag label="Tag" />
        <OnyxTag label="Tag" color="primary" />
        <OnyxTag label="Tag" color="danger" />
        <OnyxTag label="Tag" color="warning" />
        <OnyxTag label="Tag" color="success" />
      </div>

      <OnyxCheckboxGroup
        v-model="state.checkboxGroup"
        class="grid--checkboxes"
        label="Checkbox group"
        hide-label
        :options="checkboxGroupOptions"
        with-check-all
      />

      <div class="showcase__flex grid--row2">
        <OnyxAvatarStack>
          <OnyxAvatar
            v-for="member in teamMembers"
            :key="member.name"
            :full-name="member.name"
            :src="member.avatar"
            size="32px"
          />
          <OnyxAvatar full-name="Three others" initials="+3" size="32px" />
        </OnyxAvatarStack>

        <OnyxRadioGroup
          v-model="state.radioGroup"
          label="Radio group"
          hide-label
          :options="radioGroupOptions"
          direction="horizontal"
        />
      </div>

      <div class="showcase__flex grid--row3">
        <OnyxInput label="Input" placeholder="Example input" hide-label />
        <OnyxIconButton :icon="shareIos" label="Icon button" />
        <OnyxButton :icon="arrowSmallRight" label="Button" color="neutral" />
        <OnyxButton :icon="checkSmall" label="Button" />
        <OnyxStepper v-model="state.stepper" label="Stepper" hide-label placeholder="0" />
      </div>

      <div class="showcase__flex grid--row4">
        <!-- empty div is needed for spacing purposes -->
        <div></div>
        <OnyxCheckboxGroup
          label="Checkbox group (skeleton)"
          hide-label
          direction="horizontal"
          :skeleton="4"
          :options="[]"
        />
      </div>

      <OnyxNavBar class="grid--nav" app-name="Nav bar" logo-url="/onyx-logo.svg">
        <OnyxNavItem label="Page 1" active />
        <OnyxNavItem label="Page 2">
          <template #children>
            <OnyxNavItem label="Subpage 1" />
            <OnyxNavItem label="Subpage 2" />
          </template>
        </OnyxNavItem>
        <OnyxNavItem label="Page 3" :link="{ href: 'https://onyx.schwarz', target: '_blank' }" />

        <template #contextArea>
          <OnyxUserMenu description="Company Name" full-name="Jane Doe">
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
  </div>
</template>

<style lang="scss" scoped>
@use "../../../styles/breakpoints.scss";

.parent {
  container-type: inline-size;
  z-index: var(--onyx-z-index-app-overlay);
  position: relative;
}

.showcase {
  --checkbox-group-justify-content: flex-end;

  font-family: var(--onyx-font-family);
  color: var(--onyx-color-text-icons-neutral-intense);
  background-color: var(--onyx-color-base-background-tinted);

  max-width: 70rem;
  display: grid;
  gap: var(--onyx-spacing-xl);
  grid-template-columns: max-content repeat(4, minmax(0, 1fr));
  grid-template-areas:
    "row1         row1  row1  textarea  textarea"
    "table        table table textarea  textarea"
    "table        table table toast     toast"
    "table        table table tags      tags"
    "checkboxes   row2  row2  row2      row2"
    "checkboxes   row3  row3  row3      row3"
    "checkboxes   row4  row4  row4      row4"
    "nav          nav   nav   nav       nav";

  @include breakpoints.container(max, sm) {
    --checkbox-group-justify-content: revert-layer;
    grid-template-areas:
      "row1         row1  row1  row1  row1"
      "table        table table table  table"
      "textarea textarea toast toast toast"
      "checkboxes checkboxes tags tags tags"
      "row2   row2  row2  row2      row2"
      "row3   row3  row3  row3      row3"
      "row4   row4  row4  row4      row4"
      "nav          nav   nav   nav       nav";

    .showcase__flex {
      justify-content: flex-start;
    }
  }

  @include breakpoints.container(max, xs) {
    display: flex;
    flex-direction: column;
  }

  &__flex {
    display: flex;
    gap: var(--onyx-spacing-lg) var(--onyx-spacing-sm);
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  &__select {
    :deep(.onyx-select-input__native) {
      width: 10ch;
    }
  }
}

.font {
  &--soft {
    color: var(--onyx-color-text-icons-neutral-soft);
  }
}

:deep(.onyx-radio-group__content--horizontal),
:deep(.onyx-checkbox-group__content--horizontal) {
  justify-content: var(--checkbox-group-justify-content);
}

.onyx-toast-message,
.onyx-table-wrapper {
  height: max-content;
}

.grid {
  $gridAreas: row1, row2, row3, row4, table, textarea, toast, tags, checkboxes, nav;

  @each $area in $gridAreas {
    &--#{$area} {
      grid-area: $area;
    }
  }
}
</style>

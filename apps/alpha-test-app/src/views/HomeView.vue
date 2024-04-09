<script lang="ts" setup>
import emojiHappy2 from "@sit-onyx/icons/emoji-happy-2.svg?raw";
import type { ListboxOption } from "sit-onyx";
import {
  DENSITY,
  OnyxAppLayout,
  OnyxBadge,
  OnyxButton,
  OnyxCheckboxGroup,
  OnyxEmpty,
  OnyxHeadline,
  OnyxIcon,
  OnyxIconButton,
  OnyxInput,
  OnyxLink,
  OnyxListbox,
  OnyxLoadingIndicator,
  OnyxPageLayout,
  OnyxRadioButtonGroup,
  OnyxSelect,
  OnyxSkeleton,
  OnyxSwitch,
  OnyxTooltip,
  type SelectionOption,
} from "sit-onyx";
import { capitalize, computed, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import LanguageSelection from "../components/LanguageSelection.vue";

const { locale } = useI18n();
const router = useRouter();

const COMPONENTS = [
  "OnyxBadge",
  "OnyxButton",
  "OnyxCheckboxGroup",
  "OnyxEmpty",
  "OnyxHeadline",
  "OnyxIcon",
  "OnyxIconButton",
  "OnyxInput",
  "OnyxLink",
  "OnyxListbox",
  "OnyxLoadingIndicator",
  "OnyxRadioButtonGroup",
  "OnyxSelect",
  "OnyxSkeleton",
  "OnyxSwitch",
  "OnyxTooltip",
] as const;

/* Config data to regulate which components will be shown */
const configOptions = COMPONENTS.map((component) => ({
  label: component,
  id: component,
})) satisfies SelectionOption<string>[];
const activeConfig = ref(configOptions.map((option) => option.id));

const show = computed(() => {
  return (componentName: (typeof COMPONENTS)[number]) => activeConfig.value.includes(componentName);
});

const densityOptions = DENSITY.map((id) => ({
  id,
  label: capitalize(id),
})) satisfies SelectionOption<string>[];

const activeDensityOption = ref({ ...densityOptions[1] });

const useSkeleton = ref(false);
const skeletonNumber = computed(() => (useSkeleton.value ? 3 : undefined));

/* Demo data for the components we show */
const dummyOptions: SelectionOption[] = ["A", "B", "C"].map((id) => ({
  id,
  label: `Option ${id}`,
}));
const switchState = ref(false);
const checkboxState = ref<string[]>([]);
const radioState = ref<SelectionOption | undefined>();

const listboxState = ref<string>();

const listboxOptions = [
  "Apple",
  "Banana",
  "Mango",
  "Kiwi",
  "Orange",
  "Papaya",
  "Apricot",
  "Lemon",
  "Cranberry",
  "Avocado",
  "Cherry",
  "Coconut",
  "Lychee",
  "Melon",
  "Raspberry",
  "Strawberry",
].map<ListboxOption>((option) => ({ id: option.toLowerCase(), label: option }));

const multiSelectState = ref(["Apple", "Banana", "Mango", "Kiwi", "Orange", "Papaya"]);
const singleSelectState = ref("Apple");
</script>

<template>
  <OnyxAppLayout>
    <template #navBar>
      <div class="nav">
        <OnyxHeadline is="h3">Alpha Test App</OnyxHeadline>

        <OnyxButton mode="plain" label="Form Demo" @click="router.push('/form-demo')" />
        <OnyxButton mode="plain" label="Layout Demo" @click="router.push('/layout-demo')" />
      </div>
    </template>

    <OnyxPageLayout>
      <template #sidebar>
        <div class="sidebar">
          <OnyxRadioButtonGroup
            v-model="activeDensityOption"
            headline="Density"
            :options="densityOptions"
          />
          <LanguageSelection v-model="locale" />

          <OnyxSwitch v-model="useSkeleton" label="All as Skeleton" />

          <OnyxCheckboxGroup
            v-model="activeConfig"
            headline="Examples to show"
            :options="configOptions"
            with-check-all
          />
        </div>
      </template>

      <div class="page" :class="[`onyx-density-${activeDensityOption.id}`]">
        <OnyxHeadline is="h1">Component usages</OnyxHeadline>

        <p>Each onyx component should be used at least once in this page.</p>

        <div class="page__examples">
          <OnyxBadge v-if="show('OnyxBadge')">Badge</OnyxBadge>
          <OnyxButton v-if="show('OnyxButton')" label="Button" :skeleton="useSkeleton" />

          <template v-if="show('OnyxCheckboxGroup')">
            <OnyxCheckboxGroup
              v-model="checkboxState"
              headline="Checkbox Group"
              :options="dummyOptions"
              :skeleton="skeletonNumber"
            />
            <div v-if="!useSkeleton" class="onyx-text--small state-info">
              OnyxCheckboxGroup state: {{ checkboxState }}
            </div>
          </template>

          <OnyxHeadline is="h1" v-if="show('OnyxHeadline')">Headline</OnyxHeadline>

          <OnyxIcon v-if="show('OnyxIcon')" :icon="emojiHappy2" />

          <OnyxIconButton v-if="show('OnyxIconButton')" label="Happy Emoji" :icon="emojiHappy2" />

          <OnyxInput v-if="show('OnyxInput')" label="Input" :skeleton="useSkeleton" />

          <OnyxLink v-if="show('OnyxLink')" href="#" :skeleton="useSkeleton">Link</OnyxLink>

          <OnyxListbox
            v-if="show('OnyxListbox')"
            v-model="listboxState"
            label="Example listbox"
            :options="listboxOptions"
          />

          <OnyxLoadingIndicator v-if="show('OnyxLoadingIndicator')" />

          <template v-if="show('OnyxRadioButtonGroup')">
            <OnyxRadioButtonGroup
              v-model="radioState"
              headline="Radio Button Group"
              :options="dummyOptions"
              :skeleton="skeletonNumber"
            />
            <div v-if="!useSkeleton" class="onyx-text--small state-info">
              OnyxRadioButtonGroup state: {{ radioState ?? "–" }}
            </div>
          </template>

          <template v-if="show('OnyxSelect')">
            <OnyxSelect
              v-model="singleSelectState"
              label="Single Select"
              placeholder="Select your fruits"
              :skeleton="useSkeleton"
            />
            <div v-if="!useSkeleton" class="onyx-text--small state-info">
              OnyxSelect single state: {{ singleSelectState ?? "–" }}
            </div>
            <OnyxSelect
              v-model="multiSelectState"
              label="Multiple Select"
              placeholder="Select your fruits"
              multiple
              :skeleton="useSkeleton"
            />
            <div v-if="!useSkeleton" class="onyx-text--small state-info">
              OnyxSelect multiple state: {{ multiSelectState ?? "–" }}
            </div>
          </template>

          <OnyxSkeleton v-if="show('OnyxSkeleton')" class="skeleton" />

          <OnyxSwitch
            v-if="show('OnyxSwitch')"
            v-model="switchState"
            :label="'Switch is ' + (switchState ? 'on' : 'off')"
            :skeleton="useSkeleton"
          />

          <OnyxTooltip v-if="show('OnyxTooltip')" text="Example tooltip text">
            Hover me to show tooltip
          </OnyxTooltip>

          <OnyxEmpty v-if="show('OnyxEmpty')">No data available</OnyxEmpty>

          <!-- Add new components alphabetically. -->
        </div>
      </div>
    </OnyxPageLayout>
  </OnyxAppLayout>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  align-items: center;
  padding-left: var(--onyx-spacing-xs);
  border-bottom: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
}
.sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--onyx-spacing-md);
  padding: var(--onyx-spacing-md);
  border-right: var(--onyx-1px-in-rem) solid var(--onyx-color-base-neutral-300);
  height: calc(100% - var(--onyx-spacing-xl));
}
.page {
  padding: var(--onyx-spacing-xl);

  &__examples {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-xs);
    align-items: flex-start;
  }
}
.skeleton {
  height: 2rem;
  width: 8rem;
}
.state-info {
  color: var(--onyx-color-text-icons-neutral-soft);
}
</style>

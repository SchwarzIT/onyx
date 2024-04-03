<script lang="ts" setup>
import emojiHappy2 from "@sit-onyx/icons/emoji-happy-2.svg?raw";
import type { ListboxOption } from "sit-onyx";
import {
  OnyxAppLayout,
  OnyxButton,
  OnyxCheckboxGroup,
  OnyxHeadline,
  OnyxIcon,
  OnyxIconButton,
  OnyxInput,
  OnyxLink,
  OnyxListbox,
  OnyxLoadingIndicator,
  OnyxPageLayout,
  OnyxRadioButtonGroup,
  OnyxSkeleton,
  OnyxSwitch,
  OnyxTooltip,
  type SelectionOption,
} from "sit-onyx";
import { computed, ref, capitalize } from "vue";
import { useRouter } from "vue-router";
import { DENSITY } from "sit-onyx";

const router = useRouter();

const COMPONENTS = [
  "OnyxButton",
  "OnyxCheckboxGroup",
  "OnyxHeadline",
  "OnyxIcon",
  "OnyxIconButton",
  "OnyxInput",
  "OnyxLink",
  "OnyxLoadingIndicator",
  "OnyxRadioButtonGroup",
  "OnyxSkeleton",
  "OnyxSwitch",
  "OnyxTooltip",
  "OnyxListbox",
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
            direction="horizontal"
          />
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
          <OnyxButton v-if="show('OnyxButton')" label="Button" />

          <template v-if="show('OnyxCheckboxGroup')">
            <OnyxCheckboxGroup
              v-model="checkboxState"
              headline="Checkbox Group"
              :options="dummyOptions"
            />
            OnyxCheckboxGroup state: {{ checkboxState }}
          </template>

          <OnyxHeadline is="h1" v-if="show('OnyxHeadline')">Headline</OnyxHeadline>

          <OnyxIcon v-if="show('OnyxIcon')" :icon="emojiHappy2" />

          <OnyxIconButton v-if="show('OnyxIconButton')" label="Happy Emoji" :icon="emojiHappy2" />

          <OnyxInput v-if="show('OnyxInput')" label="Input" />

          <OnyxLink v-if="show('OnyxLink')" href="#">Link</OnyxLink>

          <OnyxLoadingIndicator v-if="show('OnyxLoadingIndicator')" />

          <template v-if="show('OnyxRadioButtonGroup')">
            <OnyxRadioButtonGroup
              v-model="radioState"
              headline="Radio Button Group"
              :options="dummyOptions"
            />
            OnyxRadioButtonGroup state: {{ radioState ?? "–" }}
          </template>

          <OnyxSkeleton v-if="show('OnyxSkeleton')" class="skeleton" />

          <OnyxSwitch
            v-if="show('OnyxSwitch')"
            v-model="switchState"
            :label="'Switch is ' + (switchState ? 'on' : 'off')"
          />

          <OnyxTooltip v-if="show('OnyxTooltip')" text="Example tooltip text">
            Hover me to show tooltip
          </OnyxTooltip>

          <OnyxListbox v-model="listboxState" label="Example listbox" :options="listboxOptions" />

          <!-- Add new components here. -->
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
</style>

<script lang="ts" setup>
import emojiHappy2 from "@sit-onyx/icons/emoji-happy-2.svg?raw";
import {
  OnyxAppLayout,
  OnyxButton,
  OnyxCheckboxGroup,
  OnyxHeadline,
  OnyxIcon,
  OnyxIconButton,
  OnyxInput,
  OnyxLink,
  OnyxLoadingIndicator,
  OnyxPageLayout,
  OnyxRadioButtonGroup,
  OnyxSkeleton,
  OnyxSwitch,
  type SelectionOption,
} from "sit-onyx";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const configOptions: SelectionOption[] = [
  { label: "OnyxButton" },
  { label: "OnyxCheckboxGroup" },
  { label: "OnyxHeadline" },
  { label: "OnyxIcon" },
  { label: "OnyxIconButton" },
  { label: "OnyxInput" },
  { label: "OnyxLink" },
  { label: "OnyxLoadingIndicator" },
  { label: "OnyxRadioButtonGroup" },
  { label: "OnyxSkeleton" },
  { label: "OnyxSwitch" },
  // add new components here.
].map((option) => ({
  ...option,
  id: option.label,
}));
const activeConfig = ref<string[]>(configOptions.map((option) => option.id));

const show = (componentName: string) => activeConfig.value.includes(componentName);

const dummyOptions: SelectionOption[] = ["A", "B", "C"].map((id) => ({
  id,
  label: `Option ${id}`,
}));

const switchState = ref(false);
const checkboxState = ref<string[]>([]);
const radioState = ref<SelectionOption | undefined>();
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
          <OnyxCheckboxGroup
            v-model="activeConfig"
            headline="Examples to show"
            :options="configOptions"
            with-check-all
          />
        </div>
      </template>

      <div class="page">
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
            OnyxCheckboxGroup State: {{ checkboxState }}
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
            OnyxRadioButtonGroup State: {{ radioState }}
          </template>

          <OnyxSkeleton v-if="show('OnyxSkeleton')" class="skeleton" />

          <OnyxSwitch
            v-if="show('OnyxSwitch')"
            v-model="switchState"
            :label="'Switch is ' + (switchState ? 'on' : 'off')"
          />

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
}
.sidebar {
  padding: var(--onyx-spacing-md);
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

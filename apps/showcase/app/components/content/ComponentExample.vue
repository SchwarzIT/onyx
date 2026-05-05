<script lang="ts" setup>
import { iconSync } from "@sit-onyx/icons";
import { DENSITIES, type Density } from "sit-onyx";

const props = defineProps<{
  /**
   * Example file name.
   */
  name: string;
}>();

const { locale } = useI18n();
const route = useRoute();

const activeTab = ref("preview");

const components = import.meta.glob("~~/content/*/components/**/examples/*.example.vue", {
  import: "default",
});

const sourceCodes = import.meta.glob<string>("~~/content/*/components/**/examples/*.example.vue", {
  import: "default",
  query: "?raw",
});

const { data: example } = await useAsyncData(
  () => `${route.params.name}-${props.name}-${locale.value}`,
  async () => {
    const component = Object.entries(components).find(([key]) => {
      return (
        key.includes(`/content/${locale.value}/`) &&
        key.endsWith(`/${route.params.name}/examples/${props.name}.example.vue`)
      );
    });

    const code = Object.entries(sourceCodes).find(([key]) => {
      return (
        key.includes(`/content/${locale.value}/`) &&
        key.endsWith(`/${route.params.name}/examples/${props.name}.example.vue`)
      );
    });

    if (!component || !code) return;

    return {
      component: await component[1](),
      code: await code[1](),
    };
  },
);

const getSourceCode = (code: string) => {
  return `
\`\`\`vue
${code}
\`\`\`
`;
};

const options = ref<{ density?: Density; colorScheme?: "light" | "dark" }>({});
</script>

<template>
  <div class="example">
    <OnyxEmpty v-if="!example">Example not found</OnyxEmpty>

    <OnyxTabs v-else v-model="activeTab" label="Component example" size="h3">
      <OnyxTab label="Preview" value="preview" density="compact">
        <OnyxCard class="example__preview" :style="{ colorScheme: options.colorScheme }">
          <div
            :class="[
              'example__preview-wrapper',
              { [`onyx-density-${options.density}`]: options.density },
            ]"
          >
            <component :is="example.component" />
          </div>
        </OnyxCard>
      </OnyxTab>

      <OnyxTab label="Code" value="code" density="compact">
        <MDC :value="getSourceCode(example.code)" />
      </OnyxTab>

      <template #actions>
        <OnyxIconButton
          v-if="Object.keys(options).length > 0"
          :icon="iconSync"
          label="Reset styles"
          color="neutral"
          @click="options = {}"
        />

        <OnyxFlyoutMenu label="Change style" drilldown-mode="external">
          <template #button="{ trigger }">
            <OnyxButton v-bind="trigger" label="Change style" color="neutral" />
          </template>

          <template #options>
            <OnyxMenuItem label="Density">
              <template #children>
                <OnyxMenuItem
                  v-for="density in DENSITIES"
                  :key="density"
                  :label="density"
                  :active="options.density === density"
                  @click="options.density = density"
                />
              </template>
            </OnyxMenuItem>

            <OnyxMenuItem label="Appearance">
              <template #children>
                <OnyxMenuItem
                  label="Light"
                  :active="options.colorScheme === 'light'"
                  @click="options.colorScheme = 'light'"
                />
                <OnyxMenuItem
                  label="Dark"
                  :active="options.colorScheme === 'dark'"
                  @click="options.colorScheme = 'dark'"
                />
              </template>
            </OnyxMenuItem>
          </template>
        </OnyxFlyoutMenu>
      </template>
    </OnyxTabs>
  </div>
</template>

<style lang="scss" scoped>
.example {
  &__preview {
    --onyx-card-padding: var(--onyx-density-3xl);
    --onyx-card-gap: var(--onyx-density-md);
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  }

  &__preview-wrapper {
    display: contents;
  }
}
</style>

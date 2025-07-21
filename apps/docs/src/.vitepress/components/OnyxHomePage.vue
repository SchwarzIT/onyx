<script lang="ts" setup>
import { OnyxHeadline } from "sit-onyx";
import packageJson from "sit-onyx/package.json";
import { computed } from "vue";
import type { ComponentCardProps } from "./ComponentCard.vue";
import ComponentRoadmap from "./ComponentRoadmap.vue";
import RoadmapCard from "./RoadmapCard.vue";

/**
 * Build-time data for the home page (components, facts/numbers etc.)
 */
export type HomePageData = {
  /** Total number of implemented onyx components. */
  componentCount: number;
  /** Total number of component variants/stories across all implemented components as documented with Storybook. */
  variantCount: number;
  /** Total number of merged pull requests on GitHub. */
  mergedPRCount: number;
  /** Total number of closed issues on GitHub. */
  closedIssueCount: number;
  /** Timestamp when this data has been fetched. */
  timestamp: string;
  /** Total number of npm downloads for all onyx npm packages in the last month. */
  downloads: number;
  /** Number of npm packages inside the `packages` folder of this monorepo. */
  packageCount: number;
  /** Component information. */
  components: ComponentCardProps[];
};

const props = defineProps<{
  data: HomePageData;
}>();

const timestampFormatter = Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const kpiTimestamp = computed(() => timestampFormatter.format(new Date(props.data.timestamp)));

const storybookHost = "https://storybook.onyx.schwarz" as const;
</script>

<template>
  <section class="roadmap vp-raw">
    <div class="roadmap__sections">
      <ComponentRoadmap :components="props.data.components" />

      <section>
        <OnyxHeadline is="h2" class="roadmap__headline" hash="facts">
          Facts and figures
        </OnyxHeadline>
        <p class="roadmap__timestamp">Last updated on: {{ kpiTimestamp }}</p>

        <div class="roadmap__facts">
          <RoadmapCard
            :title="props.data.componentCount"
            :description="props.data.componentCount === 1 ? 'Component' : 'Components'"
            :href="storybookHost"
          />
          <RoadmapCard
            :title="props.data.variantCount"
            description="Component variants"
            :href="storybookHost"
          />
          <RoadmapCard :title="props.data.downloads" description="Downloads (last month)" />
          <RoadmapCard
            :title="packageJson.version"
            description="onyx version"
            href="https://www.npmjs.com/package/sit-onyx?activeTab=versions"
          />
          <RoadmapCard
            :title="props.data.packageCount"
            description="npm packages"
            href="https://www.npmjs.com/search?q=sit-onyx"
          />
          <RoadmapCard
            :title="props.data.mergedPRCount"
            description="Merged pull requests"
            :href="`${packageJson.repository.url}/pulls?q=${encodeURIComponent('is:pr is:merged')}`"
          />
          <RoadmapCard
            :title="props.data.closedIssueCount"
            description="Closed issues"
            :href="`${packageJson.bugs.url}?q=${encodeURIComponent('is:issue is:closed')}`"
          />
        </div>
      </section>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "@sit-onyx/vitepress-theme/mixins.scss";

.roadmap {
  border-top: var(--onyx-1px-in-rem) solid var(--vp-c-gutter);
  background-color: var(--vp-c-bg);

  // padding and max-width are aligned with the top "home" section of the page
  // which comes from VitePress directly
  margin-top: 7rem;
  padding: 5rem 1.5rem 0;

  @include mixins.breakpoint(min, s) {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @include mixins.breakpoint(min, l) {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  &__sections {
    margin: 0 auto;
    max-width: 1152px;
    display: flex;
    flex-direction: column;
    gap: var(--onyx-spacing-4xl);
  }

  &__headline {
    margin-bottom: var(--onyx-spacing-md);
    font-size: 2.5rem;
    line-height: var(--onyx-font-line-height-xl);
  }

  &__timestamp {
    color: var(--vp-c-text-2);
    margin: var(--onyx-spacing-md) 0;
  }

  &__description {
    margin-bottom: var(--onyx-spacing-xl);
  }

  &__tabs {
    background-color: var(--vp-c-bg-alt);
    border-radius: var(--onyx-radius-md);
  }

  &__facts {
    display: grid;
    grid-gap: var(--onyx-spacing-md);
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }
}
</style>

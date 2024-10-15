<script lang="ts" setup>
import { useMediaQuery } from "@vueuse/core";
import OnyxHeadline from "~components/OnyxHeadline/OnyxHeadline.vue";
import packageJson from "../../../../../packages/sit-onyx/package.json";
import type { HomePageData } from "../../index.data";
import ComponentRoadmap from "./ComponentRoadmap.vue";
import RoadmapCard from "./RoadmapCard.vue";

import { data as browsersData } from "../browser-loader.data";
import BrowsersTable from "./BrowsersTable.vue";

const browsers = browsersData.browsers.filter((b) => b.coverage > 0);
const browsersLeftColumn = browsers.slice(0, browsers.length * 0.5 - 1);
const browsersRightColumn = browsers.slice(browsers.length * 0.5 - 1);

const isMediumScreen = useMediaQuery("(min-width: 640px)");

const props = defineProps<{
  data: HomePageData;
}>();

const kpiTimestamp = Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
}).format(new Date(props.data.timestamp));

const storybookHost = "https://storybook.onyx.schwarz" as const;
</script>

<template>
  <section class="roadmap vp-raw">
    <div class="roadmap__sections">
      <ComponentRoadmap :components="props.data.components" />

      <section>
        <OnyxHeadline is="h2" class="roadmap__headline">Facts and figures</OnyxHeadline>
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
          <RoadmapCard
            :title="browsersData.browsers.length"
            description="Browser versions supported"
          />
        </div>
      </section>
      <section v-if="browsersData && browsers.length">
        <OnyxHeadline is="h2" class="roadmap__headline">Browser Support</OnyxHeadline>
        <p class="roadmap__meta">
          Global coverage: {{ browsersData.coverage }}% (based on our Browserslist setting and
          caniuse)
        </p>
        <div class="roadmap__tables">
          <BrowsersTable :browsers="isMediumScreen ? browsersLeftColumn : browsers" />
          <BrowsersTable v-if="isMediumScreen" :browsers="browsersRightColumn" />
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
    line-height: 2.5rem;
  }

  &__timestamp,
  &__meta {
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

  &__tables {
    display: flex;
    gap: var(--onyx-spacing-xl);
    > * {
      flex-grow: 1;
      height: fit-content;
    }
  }

  &__facts {
    display: grid;
    grid-gap: var(--onyx-spacing-md);
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }
}
</style>

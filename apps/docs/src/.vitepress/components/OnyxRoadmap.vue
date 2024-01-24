<script lang="ts" setup>
import packageJson from "../../../../../packages/sit-onyx/package.json";
import { data as roadmapData } from "../../index.data";
import ComponentGrid from "./ComponentGrid.vue";
import RoadmapCard from "./RoadmapCard.vue";
import TabGroup from "./TabGroup.vue";

const kpiTimestamp = Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
}).format(new Date(roadmapData.timestamp));
</script>

<template>
  <section class="roadmap">
    <div class="roadmap__sections">
      <section>
        <h2 class="roadmap__headline">Components</h2>

        <div class="roadmap__description">
          <p>
            onyx is currently in early / active development. Below you can find a list of components
            that we are planning to implement as well as their estimated due date.
          </p>
          <p>
            Feel free to check this page regularly, we will keep it up to date with our progress.
          </p>
        </div>

        <TabGroup class="roadmap__tabs" :tabs="roadmapData.componentTabs">
          <template v-for="tab in roadmapData.componentTabs" :key="tab.id" #[tab.id]>
            <ComponentGrid v-bind="tab" />
          </template>
        </TabGroup>
      </section>

      <section>
        <h2 class="roadmap__headline">Facts and figures</h2>
        <p class="roadmap__timestamp">Last updated on: {{ kpiTimestamp }}</p>

        <div class="roadmap__facts">
          <RoadmapCard
            :title="roadmapData.componentCount"
            :description="roadmapData.componentCount === 1 ? 'Component' : 'Components'"
            href="/getting-started"
          />
          <RoadmapCard
            :title="roadmapData.variantCount"
            description="Component variants"
            href="/getting-started"
          />
          <RoadmapCard :title="roadmapData.downloads" description="Downloads (last month)" />
          <RoadmapCard
            :title="packageJson.version"
            description="onyx Version"
            href="https://www.npmjs.com/package/sit-onyx"
          />
          <RoadmapCard
            :title="roadmapData.packageCount"
            description="npm packages"
            href="https://www.npmjs.com/search?q=sit-onyx"
          />
          <RoadmapCard
            :title="roadmapData.mergedPRCount"
            description="Merged pull requests"
            :href="`${packageJson.repository.url}/pulls?q=${encodeURIComponent('is:pr is:merged')}`"
          />
          <RoadmapCard
            :title="roadmapData.closedIssueCount"
            description="Closed issues"
            :href="`${packageJson.bugs.url}?q=${encodeURIComponent('is:issue is:closed')}`"
          />
          <RoadmapCard
            :title="roadmapData.contributorCount"
            description="Contributors"
            :href="`${packageJson.repository.url}/graphs/contributors`"
          />
        </div>
      </section>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "@sit-onyx/vitepress-theme/mixins.scss";

.roadmap {
  border-top: 1px solid var(--vp-c-gutter);
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
    gap: 6rem;
  }

  &__headline {
    font-size: 2.5rem;
    line-height: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
  }

  &__timestamp {
    color: var(--vp-c-text-2);
    margin: 1rem 0;
  }

  &__description {
    margin-bottom: 2rem;
  }

  &__tabs {
    background-color: var(--vp-c-bg-alt);
    border-radius: 0.5rem;
  }

  &__facts {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }
}
</style>

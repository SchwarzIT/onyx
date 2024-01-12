<script lang="ts" setup>
import packageJson from "../../../../packages/sit-onyx/package.json";
import RoadmapCard from "./RoadmapCard.vue";
import { data } from "./roadmap.data";
</script>

<template>
  <section class="roadmap">
    <div class="roadmap__container">
      <div class="sections">
        <section>
          <h2 class="roadmap__headline">KPIs</h2>

          <p class="roadmap__timestamp">Last updated on: {{ data.timestamp }}</p>

          <div class="grid">
            <RoadmapCard
              :title="data.componentCount"
              :description="data.componentCount === 1 ? 'Component' : 'Components'"
              href="/getting-started"
            />

            <RoadmapCard
              :title="data.variantCount"
              description="Component variants"
              href="/getting-started"
            />
            <RoadmapCard :title="data.downloads" description="downloads (last month)" />
            <RoadmapCard
              :title="packageJson.version"
              description="Onyx Version"
              href="https://www.npmjs.com/package/sit-onyx"
            />
            <RoadmapCard
              :title="data.packageCount"
              description="npm packages"
              href="https://www.npmjs.com/search?q=sit-onyx"
            />
            <RoadmapCard
              :title="data.mergedPRCount"
              description="Merged Pull requests"
              :href="`${packageJson.repository.url}/pulls`"
            />
            <RoadmapCard
              :title="data.closedIssueCount"
              description="Closed issues"
              :href="packageJson.bugs.url"
            />
            <RoadmapCard
              :title="data.commitCount"
              description="Commits"
              :href="`${packageJson.repository.url}/commits/main`"
            />
          </div>
        </section>

        <section>
          <h2 class="roadmap__headline">Components</h2>

          Lorem ipsum...
        </section>

        <section>
          <h2 class="roadmap__headline">Lorem ipsum...</h2>

          Lorem ipsum...
        </section>
      </div>
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
  padding: 5rem 1.5rem;

  @include mixins.breakpoint(s, min) {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @include mixins.breakpoint(l, min) {
    padding-left: 4rem;
    padding-right: 4rem;
  }

  &__container {
    margin: 0 auto;
    max-width: 1152px;
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
}

.sections {
  display: flex;
  flex-direction: column;
  gap: 6rem;
}

.grid {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}
</style>

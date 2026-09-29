<script lang="ts" setup>
const gridClass = "onyx-grid-span-8 onyx-grid-md-span-4";
</script>

<template>
  <section class="offers">
    <div class="onyx-grid">
      <!-- Column 1 -->
      <div :class="['offers__column', gridClass]">
        <div class="offers__intro">
          <OnyxHeadline is="h2" show-as="h1">The instrument that helps you deliver.</OnyxHeadline>
          <p class="onyx-text--large">
            Our application design system serves as the central product for your perfect enterprise
            solution.
          </p>
        </div>

        <LandingCard link="/introduction/foundation/colors">
          <OnyxHeadline is="h3" show-as="h2">On brand. Seamlessly adaptive.</OnyxHeadline>

          <p class="onyx-text--default">
            Transform your digital products across the Schwarz Group with custom-tailored,
            brand-certified UIs that look stunning and perform effortlessly in any mode.
          </p>
        </LandingCard>
      </div>

      <!-- Column 2 -->
      <div :class="['offers__column', gridClass]">
        <LandingCard link="/components/">
          <OnyxHeadline is="h3" show-as="h2">Build faster. Scale effortlessly.</OnyxHeadline>

          <p class="onyx-text--default">
            Unlock ultimate building freedom with 100+ accessible components and 450+ features
            engineered to scale your applications in any mode, theme, or stack.
          </p>

          <div class="components">
            <div class="onyx-grid">
              <div class="components__flex onyx-grid-span-full">
                <OnyxCheckbox hide-label value="example-value" />
                <OnyxRadioButton hide-label value="example-value" />
                <OnyxTag label="Tag" color="primary" />
                <OnyxTag label="Tag" color="neutral" />
                <OnyxBadge color="neutral">Badge</OnyxBadge>
                <OnyxBadge color="danger">Badge</OnyxBadge>
              </div>

              <OnyxSplitButton
                class="onyx-grid-span-2 onyx-grid-xs-span-4"
                label="Outline"
                mode="outline"
              >
                <template #options>
                  <OnyxMenuItem label="Action 1" />
                </template>
              </OnyxSplitButton>

              <OnyxButton class="onyx-grid-span-2 onyx-grid-xs-span-4" label="Primary" />

              <OnyxUnstableSearch class="onyx-grid-span-full" placeholder="Search..." />
            </div>
          </div>
        </LandingCard>
      </div>

      <!-- Column 3 -->
      <div :class="['offers__column', gridClass]">
        <LandingCard link="/introduction/getting-started/first-steps/">
          <OnyxHeadline is="h3" show-as="h2">Design to Code. Perfectly connected.</OnyxHeadline>

          <p class="onyx-text--default">
            Supercharge your workflow with Onyx—the ultimate developer experience powered by full
            TypeScript precision and a bridge from Figma design to production code.
          </p>
        </LandingCard>

        <LandingCard>
          <OnyxHeadline is="h3" show-as="h2">Complete ecosystem. Expertly backed.</OnyxHeadline>

          <p class="onyx-text--default">
            Accelerate your development with Onyx’s complete ecosystem, backed by AI workflow
            integration through our custom Onyx MCP.
          </p>
        </LandingCard>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.offers {
  &__column {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-grid-gutter);
  }

  &__intro {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-md);
  }
}

.components {
  container-type: inline-size;
  pointer-events: none;
  margin-top: var(--onyx-density-xl);

  :deep(.onyx-button) {
    width: 100%;
  }

  &__flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--onyx-density-xs);
  }
}
</style>

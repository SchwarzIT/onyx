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
          <OnyxHeadline is="h3" show-as="h2">Open Source to code. Built to last.</OnyxHeadline>

          <p class="onyx-text--default">
            Open source belongs to everyone — anyone can review, adapt, and improve it. But
            long-term quality isn't free. Continuous development and maintenance require resources
            that internal Schwarz Group projects should support.
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
            <div class="components__content">
              <div class="onyx-grid">
                <div class="components__flex onyx-grid-span-full">
                  <OnyxCheckbox label="Checkbox" value="example-value" model-value hide-label />
                  <OnyxSwitch :label="{ label: 'Switch', hidden: true }" />
                  <OnyxTag label="Tag" color="primary" />
                  <OnyxBadge color="danger">Badge</OnyxBadge>
                </div>

                <OnyxSplitButton
                  class="onyx-grid-span-2 onyx-grid-xs-span-4"
                  label="Button"
                  mode="outline"
                >
                  <template #options>
                    <OnyxMenuItem label="Action 1" />
                  </template>
                </OnyxSplitButton>

                <OnyxButton class="onyx-grid-span-2 onyx-grid-xs-span-4" label="Button" />

                <OnyxUnstableSearch class="onyx-grid-span-full" placeholder="Search..." />
              </div>
            </div>
          </div>
        </LandingCard>
      </div>

      <!-- Column 3 -->
      <div :class="['offers__column', gridClass]">
        <LandingCard link="/introduction/getting-started/first-steps/">
          <OnyxHeadline is="h3" show-as="h2">On brand. Seamlessly adaptive.</OnyxHeadline>

          <p class="onyx-text--default">
            Transform your digital products across the Schwarz Group with custom-tailored,
            brand-certified UIs that look stunning and perform effortlessly in any mode.
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
  pointer-events: none;
  margin-top: var(--onyx-density-xl);
  display: flex;
  flex-direction: column;
  align-items: center;

  &__content {
    max-width: 32rem;
    container-type: inline-size;
    width: 100%;
  }

  :deep(.onyx-button) {
    width: 100%;
    overflow: hidden;
  }

  &__flex {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: var(--onyx-density-2xs) var(--onyx-grid-gutter);
  }
}
</style>

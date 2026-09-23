<template>
  <section class="offers">
    <div class="onyx-grid">
      <!-- Column 1 -->
      <div class="onyx-grid-span-8 onyx-grid-md-span-4 offers__column">
        <div class="offers__intro">
          <OnyxHeadline is="h2" show-as="h1">Headline #2</OnyxHeadline>
          <p class="onyx-text--large">
            Lorem ipsum dolor sit amet consectetur. Ut senectus non amet gravida in. Platea velit
            lacinia quam vitae mauris faucibus. Tortor tristique cursus egestas tincidunt orci in
            quisque ultrices.
          </p>
        </div>

        <LandingCard headline="Headline #3" link="#">
          Lorem ipsum dolor sit amet consectetur. Ut senectus non amet gravida in. Platea velit
          lacinia quam vitae mauris faucibus. Tortor tristique cursus egestas tincidunt orci in
          quisque ultrices.
        </LandingCard>
      </div>

      <!-- Column 2 -->
      <div class="onyx-grid-span-8 onyx-grid-md-span-4 offers__column">
        <LandingCard headline="Headline #3" link="#">
          Lorem ipsum dolor sit amet consectetur. Ut senectus non amet gravida in. Platea velit
          lacinia quam vitae mauris faucibus. Tortor tristique cursus egestas tincidunt orci in
          quisque ultrices.
        </LandingCard>
      </div>

      <!-- Column 3 -->
      <div class="onyx-grid-span-8 onyx-grid-md-span-4 offers__column">
        <LandingCard headline="Headline #3" link="#">
          Lorem ipsum dolor sit amet consectetur. Ut senectus non amet gravida in. Platea velit
          lacinia quam vitae mauris faucibus. Tortor tristique cursus egestas tincidunt orci in
          quisque ultrices.
        </LandingCard>

        <LandingCard headline="Headline #3" link="#">
          Lorem ipsum dolor sit amet consectetur. Ut senectus non amet gravida in. Platea velit
          lacinia quam vitae mauris faucibus.
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
</style>

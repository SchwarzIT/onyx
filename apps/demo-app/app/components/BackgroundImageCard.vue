<template>
  <OnyxCard class="card">
    <div class="card__overlay">
      <OnyxHeadline is="h2" class="card__headline">
        Lorem ipsum dolor: sit amet consetetur sadipscing
      </OnyxHeadline>

      <p>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
        et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet.
      </p>
    </div>
  </OnyxCard>
</template>

<style lang="scss" scoped>
.card {
  --onyx-card-gap: var(--onyx-density-md);
  background-image: url("~/assets/images/news-cover.webp");
  background-position: center;
  background-size: cover;
  color: var(--onyx-color-base-grayscale-white);
  min-height: 18rem;
  padding: 0;

  &__headline {
    color: inherit;
  }

  &__overlay {
    background: rgba(0, 0, 0, 0.65);
    padding: var(--onyx-card-padding);
    height: 100%;
    width: 100%;
    display: inherit;
    flex-direction: inherit;
    gap: inherit;
    justify-content: flex-end;
    border-radius: inherit;
  }
}
</style>

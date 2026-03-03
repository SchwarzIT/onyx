<template>
  <section class="hero">
    <div class="onyx-grid-layout">
      <div class="hero__content">
        <div class="hero__headlines">
          <OnyxHeadline is="h1" class="hero__headline">
            <i18n-t keypath="app.hero.headline">
              <template #onyx>
                <span class="hero__accent">onyx</span>
              </template>
            </i18n-t>
          </OnyxHeadline>

          <OnyxHeadline is="h2" class="hero__description">
            {{ $t("app.hero.description") }}
          </OnyxHeadline>
        </div>

        <div class="hero__actions">
          <OnyxButton
            :label="$t('components.component', 2)"
            :link="{ href: 'https://storybook.onyx.schwarz', target: '_blank' }"
          />
          <OnyxButton :label="$t('gettingStarted')" mode="outline" link="/introduction" />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "sit-onyx/breakpoints.scss";

.hero {
  --hero-headline-size: 4.5rem;
  --hero-background-size: 90%;
  --hero-color-gradient-neutral: color-mix(
    in srgb,
    var(--onyx-color-base-neutral-100) 40%,
    transparent
  );

  --hero-color-gradient-primary: color-mix(
    in srgb,
    var(--onyx-color-base-primary-300) 40%,
    transparent
  );

  min-height: calc(100vh - var(--onyx-nav-bar-height));
  background: var(--onyx-color-base-background-blank);
  background: linear-gradient(
    60deg,
    var(--hero-color-gradient-neutral),
    var(--hero-color-gradient-primary),
    var(--hero-color-gradient-neutral)
  );
  position: relative;

  @include breakpoints.screen(max, lg) {
    --hero-headline-size: 3rem;
  }

  @include breakpoints.screen(max, md) {
    --hero-background-size: 70%;
  }

  @include breakpoints.screen(max, sm) {
    --hero-background-size: 60%;
  }

  @include breakpoints.screen(max, xs) {
    --hero-headline-size: 2rem;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 2rem;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background-image: url("~/assets/images/hero.webp");
    background-repeat: no-repeat;
    background-size: auto var(--hero-background-size);
    background-position: right -18rem bottom;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-xl);
    padding-block: var(--onyx-density-xl);

    > * {
      z-index: 1;
    }
  }

  &__headlines {
    display: flex;
    flex-direction: column;
    gap: var(--onyx-density-sm);
    white-space: pre-line;
  }

  &__headline {
    color: var(--onyx-color-text-icons-primary-intense);
    font-size: var(--hero-headline-size);
    line-height: var(--hero-headline-size);
    font-weight: var(--onyx-font-weight-500);
    text-transform: uppercase;
  }

  &__accent {
    color: var(--onyx-color-text-icons-neutral-intense);
  }

  &__description {
    color: var(--onyx-color-text-icons-primary-intense);
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: var(--onyx-density-xs);
    flex-wrap: wrap;
  }
}
</style>

<script lang="ts" setup>
import logoUrl from "@sit-onyx/assets/onyx-brand/logo-on-dark.svg";
import { version as onyxVersion } from "sit-onyx/package.json";
</script>

<template>
  <section class="hero">
    <img
      class="hero__background"
      aria-hidden="true"
      src="~/assets/images/hero-background.svg"
      alt=""
    />

    <div class="hero__layout onyx-grid-layout">
      <div class="hero__content">
        <img :src="logoUrl" :alt="$t('app.hero.logoAlt')" class="hero__logo" />

        <div class="hero__body">
          <OnyxHeadline is="h1" class="hero__tagline"> {{ $t("app.hero.tagline") }} </OnyxHeadline>

          <div class="hero__actions">
            <OnyxButton
              :label="$t('app.hero.getStarted')"
              color="primary"
              link="/introduction/getting-started/installation"
            />
            <OnyxButton
              :label="$t('app.hero.browseComponents')"
              color="neutral"
              link="/components"
            />
          </div>

          <div class="hero__meta">
            <span>{{ $t("app.hero.current", { version: onyxVersion }) }}</span>
            <span>·</span>

            <i18n-t keypath="app.hero.builtOn" scope="global" tag="span">
              <template #vue>
                <OnyxLink href="https://vuejs.org" target="_blank" :with-external-icon="false">
                  Vue.js
                </OnyxLink>
              </template>
            </i18n-t>

            <span>·</span>

            <i18n-t keypath="app.hero.brand" scope="global" tag="span">
              <template #schwarzDigits>
                <OnyxLink
                  href="https://schwarz-digits.de"
                  target="_blank"
                  :with-external-icon="false"
                >
                  Schwarz Digits
                </OnyxLink>
              </template>
            </i18n-t>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "sit-onyx/breakpoints.scss";

.hero {
  position: relative;
  background: radial-gradient(
    50% 42.5% at 50% 30%,
    color-mix(in srgb, var(--onyx-color-base-primary-500) 22.5%, transparent) 0%,
    transparent 100%
  );

  &__background {
    width: 100%;
    height: 30%;
    object-fit: cover;
    object-position: bottom;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.3;
    pointer-events: none;
  }

  &__layout {
    height: 100%;
    min-height: calc(85dvh - var(--onyx-nav-bar-height));
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--onyx-density-2xl);
    max-width: 40rem;
  }

  &__logo {
    width: 30rem;
    max-width: 100%;
    height: auto;
    filter: drop-shadow(0 0.5rem 0.75rem rgb(0 0 0 / 0.15));
  }

  &__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--onyx-density-xl);
    width: 100%;
  }

  &__tagline {
    font-family: var(--onyx-font-family-h1);
    font-size: var(--onyx-font-size-xl);
    line-height: var(--onyx-font-line-height-xl);
    font-weight: var(--onyx-font-weight-semibold);
    color: var(--onyx-color-text-icons-neutral-intense);
    text-align: center;

    @include breakpoints.screen(max, xs) {
      font-size: var(--onyx-font-size-lg);
      line-height: var(--onyx-font-line-height-lg);
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--onyx-density-xs);
    flex-wrap: wrap;
  }

  &__meta {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--onyx-density-xs);
    font-size: var(--onyx-font-size-sm);
    line-height: var(--onyx-font-line-height-sm);

    :deep(.onyx-link) {
      &:not(:hover, :focus, :active) {
        color: inherit;
      }
    }
  }
}
</style>

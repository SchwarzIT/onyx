<script lang="ts" setup>
import logoOnDark from "@sit-onyx/assets/onyx-brand/logo-on-dark.svg";
import logoOnLight from "@sit-onyx/assets/onyx-brand/logo-on-light.svg";
import schwarzDigitsLogo from "~/assets/images/brands/schwarzdigits.svg?raw";
import instagramIcon from "~/assets/images/social/instagram.svg?raw";
import linkedinIcon from "~/assets/images/social/linkedin.svg?raw";
import youtubeIcon from "~/assets/images/social/youtube.svg?raw";

const { t } = useI18n();
const { loggedIn } = useUserSession();

const primaryLinks = computed(() => [
  {
    label: t("footer.primaryNav.getStarted"),
    href: "/introduction/getting-started/installation",
  },
  { label: t("footer.primaryNav.components"), href: "/components" },
  {
    label: t("footer.primaryNav.demo"),
    href: loggedIn.value ? "https://demo-internal.onyx.schwarz" : "https://demo.onyx.schwarz",
  },
  { label: t("footer.primaryNav.playground"), href: "https://playground.onyx.schwarz" },
  { label: t("footer.primaryNav.colorsAndThemes"), href: "/introduction/foundation/colors" },
  { label: t("footer.primaryNav.changelog"), href: "/introduction/getting-started/changelog" },
]);

const legalLinks = computed(() => [
  { label: t("footer.legalNav.termsOfUse"), href: "#" },
  { label: t("footer.legalNav.privacyPolicy"), href: "#" },
  { label: t("footer.legalNav.imprint"), href: "#" },
]);

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/schwarz-digits",
    icon: linkedinIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@schwarzdigits",
    icon: youtubeIcon,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/schwarzdigits",
    icon: instagramIcon,
  },
];

const copyright = computed(() => t("footer.copyright", { year: new Date().getFullYear() }));
</script>

<template>
  <footer class="footer">
    <div class="footer__row">
      <div class="footer__content onyx-grid-layout">
        <OnyxImage
          class="footer__logo"
          :width="78"
          :height="24"
          :alt="t('app.hero.logoAlt')"
          :src="{ light: logoOnLight, dark: logoOnDark }"
        />

        <nav :aria-label="t('footer.primaryNav.getStarted')" class="footer__nav">
          <OnyxLink
            v-for="link in primaryLinks"
            :key="link.label"
            :href="link.href"
            class="footer__link"
          >
            {{ link.label }}
          </OnyxLink>
        </nav>

        <div class="footer__social">
          <OnyxIconButton
            v-for="social in socialLinks"
            :key="social.label"
            :label="social.label"
            :link="{ href: social.href, target: '_blank' }"
            color="neutral"
            :icon="social.icon"
          />
        </div>
      </div>
    </div>

    <div class="footer__row">
      <div class="footer__content onyx-grid-layout">
        <div class="footer__brand-owner">
          <span class="footer__brand-owner-text">{{ t("footer.brandOwnerPrefix") }}</span>
          <OnyxRouterLink href="https://schwarz-digits.de" target="_blank">
            <OnyxIcon class="footer__brand-owner-logo" :icon="schwarzDigitsLogo" size="16px" />
          </OnyxRouterLink>
        </div>

        <nav :aria-label="t('footer.legalNav.termsOfUse')" class="footer__nav footer__nav--legal">
          <OnyxLink
            v-for="link in legalLinks"
            :key="link.label"
            :href="link.href"
            class="footer__link"
          >
            {{ link.label }}
          </OnyxLink>
        </nav>

        <p class="footer__copyright">{{ copyright }}</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use "sit-onyx/breakpoints.scss";

.footer {
  --column-min-width: 13rem;
  color: var(--onyx-color-text-icons-neutral-medium);
  font-size: var(--onyx-font-size-sm);
  line-height: var(--onyx-font-line-height-sm);
  margin-top: clamp(2rem, 6vw, 8rem);

  &__row {
    &:last-of-type {
      border-top: var(--onyx-1px-in-rem) solid var(--onyx-color-component-border-neutral);
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--onyx-density-md);
    padding-block: var(--onyx-density-md);

    @include breakpoints.screen(max, md) {
      --column-min-width: initial;
      flex-direction: column;
    }
  }

  &__logo,
  &__social,
  &__copyright,
  &__brand-owner {
    flex: 0 0 auto;
    min-width: var(--column-min-width);
  }

  &__social {
    display: flex;
    justify-content: flex-end;
    gap: var(--onyx-density-xs);
  }

  &__logo {
    background-color: transparent;
    display: flex;
  }

  &__nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--onyx-density-md);
  }

  &__link {
    color: var(--onyx-color-text-icons-neutral-medium);
    text-decoration: none;
  }

  &__brand-owner {
    display: flex;
    align-items: center;
    gap: var(--onyx-density-xs);
  }

  &__brand-owner-logo {
    width: auto;
    color: var(--onyx-color-text-icons-neutral-intense);
  }

  &__copyright {
    text-align: right;
  }
}
</style>

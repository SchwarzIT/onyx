<script lang="ts" setup>
import { iconChevronLeftSmall, iconChevronRightSmall } from "@sit-onyx/icons";
import { OnyxBottomBar, OnyxButton, OnyxDialog, OnyxHeadline, OnyxSystemButton } from "sit-onyx";
import { ref } from "vue";

const isOpen = ref(false);
const currentSlide = ref(0);

const slides = [
  { id: 1, title: "First slide" },
  { id: 2, title: "Second slide" },
  { id: 3, title: "Third slide" },
];

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

const nextSlide = () => {
  if (currentSlide.value < slides.length - 1) {
    currentSlide.value++;
  }
};
</script>

<template>
  <OnyxDialog v-model:open="isOpen" class="dialog" label="Example label">
    <template #trigger="{ trigger }">
      <OnyxButton label="Show dialog" v-bind="trigger" />
    </template>

    <div class="dialog__content">
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="dialog__slide"
        :style="{
          left: `${(index - currentSlide) * 100}%`,
        }"
      >
        <OnyxHeadline is="h3">{{ slide.title }}</OnyxHeadline>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aspernatur cumque enim
          deserunt officia nostrum nihil sit blanditiis quos. Ullam deleniti perferendis eum a!
          Mollitia veniam quae eaque facere voluptates.
        </p>
      </div>
    </div>

    <template #footer>
      <OnyxBottomBar class="dialog__footer" hide-border>
        <template #left>
          <OnyxSystemButton
            label="Previous slide"
            class="dialog__nav-button"
            :icon="iconChevronLeftSmall"
            :disabled="currentSlide === 0"
            @click="previousSlide"
          />
          <OnyxSystemButton
            label="Next slide"
            class="dialog__nav-button"
            :icon="iconChevronRightSmall"
            :disabled="currentSlide >= slides.length - 1"
            @click="nextSlide"
          />
        </template>

        <OnyxButton label="Button" color="neutral" mode="plain" />
        <OnyxButton label="Button" />
      </OnyxBottomBar>
    </template>
  </OnyxDialog>
</template>

<style lang="scss" scoped>
.dialog {
  &__content {
    position: relative;
    width: 26rem;
    height: 10rem;
    overflow: hidden;
  }

  &__slide {
    position: absolute;
    top: 0;
    width: inherit;
    height: inherit;
    padding-inline: var(--onyx-density-md);
    transition: left var(--onyx-duration-md) ease-in-out;
  }

  &__nav-button {
    align-content: center;
  }
}
</style>

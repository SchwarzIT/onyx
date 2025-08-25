<script lang="ts" setup>
import { iconChevronLeftSmall, iconChevronRightSmall } from "@sit-onyx/icons";
import { ref } from "vue";
import { OnyxBottomBar, OnyxButton } from "../../../index.js";
import OnyxHeadline from "../../OnyxHeadline/OnyxHeadline.vue";
import OnyxSystemButton from "../../OnyxSystemButton/OnyxSystemButton.vue";
import OnyxDialog from "../OnyxDialog.vue";

const isOpen = ref(false);

const currentSlide = ref(0);
const slides = [
  { id: 1, title: "First" },
  { id: 2, title: "Second" },
  { id: 3, title: "Third" },
];

const nextSlide = () => {
  if (currentSlide.value < slides.length - 1) {
    currentSlide.value++;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};
</script>

<template>
  <div>
    <OnyxDialog v-model:open="isOpen" label="Description" class="dialog" button-text="Open Dialog">
      <div class="main-container">
        <div
          v-for="(slide, index) in slides"
          :key="slide.id"
          class="slide"
          :style="{
            left: `${(index - currentSlide) * 100}%`,
          }"
        >
          <OnyxHeadline is="h3">{{ slide.title }}</OnyxHeadline>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident aspernatur cumque enim
          deserunt officia nostrum nihil sit blanditiis quos. Ullam deleniti perferendis eum a!
          Mollitia veniam quae eaque facere voluptates.
        </div>
      </div>

      <template #footer>
        <OnyxBottomBar hide-border class="dialog__footer">
          <template #left>
            <OnyxSystemButton
              label="back"
              class="navigation-button"
              :icon="iconChevronLeftSmall"
              :disabled="currentSlide === 0"
              @click="prevSlide"
            />
            <OnyxSystemButton
              label="next"
              class="navigation-button"
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
  </div>
</template>

<style lang="scss" scoped>
.dialog {
  width: 28rem;

  .onyx-bottom-bar__content--left {
    align-items: center;
  }
  .navigation-button {
    margin-block: auto;
  }
}
.main-container {
  position: relative;
  width: 26rem;

  height: 10.5rem;
  overflow: hidden;
}

.slide {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: var(--onyx-density-md) var(--onyx-dialog-padding-inline);
  transition: left 0.3s ease;
}
</style>

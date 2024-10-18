<script lang="ts" setup>
import { data as browsersData } from "#src/.vitepress/browser-loader.data";

const browsers = browsersData.browsers.filter((b) => b.coverage > 0);

const popularBrowsers = ["chrome", "edge", "firefox", "safari", "samsung", "ios_saf"];

const filteredBrowsers = browsers.filter((b) => popularBrowsers.includes(b.id));

const sortedBrowsers = filteredBrowsers.map((b) => ({
  ...b,
  minVersion: Object.keys(b.versions).sort()[0],
}));
</script>

<template>
  <div>
    <ul class="browsersList">
      <li v-for="b in sortedBrowsers" :key="b.name">
        {{ b.name }}
        <p>+= {{ b.minVersion }}</p>
        <img src="" :alt="`${b.name} icon`" />
      </li>
    </ul>
  </div>
</template>

<style scoped>
.browsersList {
  display: flex;
  li {
    list-style: none;
  }
}
</style>

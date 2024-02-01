<script lang="ts" setup>
import { useData } from "vitepress";
import { ref } from "vue";

const { params } = useData();
</script>

<div v-if="params.name === 'figma-utils'">

<!--@include: @/../../../packages/figma-utils/CHANGELOG.md-->

</div>

<div v-else-if="params.name === 'headless'">

<!--@include: @/../../../packages/headless/CHANGELOG.md-->

</div>

<div v-else-if="params.name === 'sit-onyx'">

<!--@include: @/../../../packages/sit-onyx/CHANGELOG.md-->

</div>

<div v-else-if="params.name === 'storybook-utils'">

<!--@include: @/../../../packages/storybook-utils/CHANGELOG.md-->

</div>

<div v-else-if="params.name === 'vitepress-theme'">

<!--@include: @/../../../packages/vitepress-theme/CHANGELOG.md-->

</div>

<div v-else-if="params.name === 'icons'">

<!--@include: @/../../../packages/icons/CHANGELOG.md-->

</div>

<div v-else>
  <h1>Changelogs</h1>
  <p>No changelog found for package "{{ params.name }}".</p>
  <p>Please create a bug report using the link in the header above.</p>
</div>

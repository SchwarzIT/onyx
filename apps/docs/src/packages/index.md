<script lang="ts" setup>
import figmaUtilsPackageJson from "../../../../packages/figma-utils/package.json";
import headlessPackageJson from "../../../../packages/headless/package.json";
import storybookUtilsPackageJson from "../../../../packages/storybook-utils/package.json";

// make sure to also add a sidebar item in ../.vitepress/config.ts and a file matching the package name in this folder
// to make the link below work when adding another package to this list.
const packages = [figmaUtilsPackageJson, headlessPackageJson, storybookUtilsPackageJson];
</script>

# Additional packages

Besides the [`sit-onyx`](/getting-started) package that contains our Vue.js components, we also offer additional npm packages that you might find helpful such as:

<ul>
  <li v-for="p in packages" :key="p.name">
    <a :href="`/packages/${p.name.replace('@sit-onyx/', '')}`">{{ p.name }}</a>: {{ p.description }}
  </li>
</ul>

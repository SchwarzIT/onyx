import { defineComarkComponent, defineComarkRendererComponent } from "@comark/vue";
import ProseA from "./prose/ProseA.vue";
import ProseBr from "./prose/ProseBr.vue";
import ProseCode from "./prose/ProseCode.vue";
import ProseDetails from "./prose/ProseDetails.vue";
import ProseH1 from "./prose/ProseH1.vue";
import ProseH2 from "./prose/ProseH2.vue";
import ProseH3 from "./prose/ProseH3.vue";
import ProseH4 from "./prose/ProseH4.vue";
import ProseH5 from "./prose/ProseH5.vue";
import ProseH6 from "./prose/ProseH6.vue";
import ProseHr from "./prose/ProseHr.vue";
import ProseImg from "./prose/ProseImg.vue";
import ProseOl from "./prose/ProseOl.vue";
import ProseP from "./prose/ProseP.vue";
import ProsePre from "./prose/ProsePre.vue";
import ProseSummary from "./prose/ProseSummary.vue";
import ProseTable from "./prose/ProseTable.vue";
import ProseTbody from "./prose/ProseTbody.vue";
import ProseThead from "./prose/ProseThead.vue";
import ProseUl from "./prose/ProseUl.vue";

export const components = {
  a: ProseA,
  br: ProseBr,
  code: ProseCode,
  details: ProseDetails,
  h1: ProseH1,
  h2: ProseH2,
  h3: ProseH3,
  h4: ProseH4,
  h5: ProseH5,
  h6: ProseH6,
  hr: ProseHr,
  ol: ProseOl,
  p: ProseP,
  pre: ProsePre,
  summary: ProseSummary,
  table: ProseTable,
  thead: ProseThead,
  tbody: ProseTbody,
  ul: ProseUl,
  img: ProseImg,
};

export const OnyxComark = defineComarkComponent({
  components,
  class: "onyx-comark-renderer",
});

export const OnyxComarkRenderer = defineComarkRendererComponent({
  components,
  class: "onyx-comark-renderer",
});

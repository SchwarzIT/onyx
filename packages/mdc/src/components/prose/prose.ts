import ProseA from "./ProseA.vue";
import ProseBr from "./ProseBr.vue";
import ProseCode from "./ProseCode.vue";
import ProseDetails from "./ProseDetails.vue";
import ProseH1 from "./ProseH1.vue";
import ProseH2 from "./ProseH2.vue";
import ProseH3 from "./ProseH3.vue";
import ProseH4 from "./ProseH4.vue";
import ProseH5 from "./ProseH5.vue";
import ProseH6 from "./ProseH6.vue";
import ProseHr from "./ProseHr.vue";
import ProseOl from "./ProseOl.vue";
import ProseP from "./ProseP.vue";
import ProsePre from "./ProsePre.vue";
import ProseSummary from "./ProseSummary.vue";
import ProseTable from "./ProseTable.vue";
import ProseUl from "./ProseUl.vue";

/**
 * A map of prose onyx components to render for markdown elements.
 */
export const proseComponents = {
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
  ul: ProseUl,
};

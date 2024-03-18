import type { createListbox } from "@sit-onyx/headless";
import type { UnwrapRef } from "vue";

export type OnyxListboxOptionProps = {
  headlessOption: ReturnType<UnwrapRef<ReturnType<typeof createListbox>["elements"]["option"]>>;
};

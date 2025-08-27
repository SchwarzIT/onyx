import type { DensityProp } from "../../composables/density.js";
import type { WithLinkProp } from "../OnyxRouterLink/types.js";

export type OnyxCardProps = DensityProp &
  WithLinkProp & {
    /**
     * Whether the whole card should be clickable (will render it as `<button>`).
     * **Important**: If clickable, the card must not contain interactive elements like other buttons etc.
     */
    clickable?: boolean;
  };

// Import styles, initialize component theme here.
import { Chart, registerables } from "chart.js";
import { registerOnyxPlugin } from "../src";

import "@fontsource-variable/source-code-pro";
import "@fontsource-variable/source-sans-3";
import "sit-onyx/src/styles/index.scss";
import "./playwright.scss";

Chart.register(...registerables);
registerOnyxPlugin(Chart);

Chart.defaults.animation = false;

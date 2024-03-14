// Import styles, initialize component theme here.
import { Chart, registerables } from "chart.js";
import { registerOnyxPlugin } from "../src";

import "sit-onyx/src/styles/index.scss";
import "./playwright.scss";

Chart.register(...registerables);
registerOnyxPlugin(Chart);

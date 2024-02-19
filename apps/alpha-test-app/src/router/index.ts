import type { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

/** List of all routes the user can navigate to.
 *  Please declare, whether authentication is enabled/disabled via the meta parameter.
 */
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/layers-demo",
    name: "layersDemo",
    component: () => import("../views/LayersDemoView.vue"),
    meta: { requiresAuth: false },
  },
];

import type { RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

/** List of all routes the user can navigate to. */
export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/layout-demo",
    name: "layoutDemo",
    component: () => import("../views/LayoutDemoView.vue"),
  },
];

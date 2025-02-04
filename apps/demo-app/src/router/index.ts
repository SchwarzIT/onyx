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
    path: "/demos",
    children: [
      {
        path: "form",
        name: "formDemo",
        component: () => import("../views/FormDemoView.vue"),
      },
      {
        path: "data-grid",
        name: "dataGrid",
        component: () => import("../views/DataGridView.vue"),
      },
      {
        path: "layout",
        name: "layoutDemo",
        component: () => import("../views/LayoutDemoView.vue"),
      },
      {
        path: "grid",
        name: "gridDemo",
        component: () => import("../views/GridDemo.vue"),
      },
    ],
  },
];

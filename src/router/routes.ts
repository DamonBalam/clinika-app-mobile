import { RouteRecordRaw } from "vue-router";

/* LAZY IMPORTS */
const AppLayout = () => import("layouts/AppLayout.vue");
const PerfilPage = () => import("pages/Perfil.vue");
const PlanPage = () => import("pages/Plan.vue");
const HistoryPage = () => import("pages/History.vue");

const ErrorNotFound = () => import("pages/ErrorNotFound.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/perfil",
    component: AppLayout,
    children: [
      {
        path: "perfil",
        name: "PerfilPage",
        component: PerfilPage,
      },
      {
        path: "history",
        name: "HistoryPage",
        component: HistoryPage,
      },
      {
        path: "plan",
        name: "PlanPage",
        component: PlanPage,
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: ErrorNotFound,
  },
];

export default routes;

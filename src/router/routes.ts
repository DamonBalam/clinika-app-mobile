import { RouteRecordRaw } from "vue-router";

/* LAZY IMPORTS */
const AppLayout = () => import("layouts/AppLayout.vue");
const PerfilPage = () => import("pages/Perfil.vue");
const PlanPage = () => import("pages/Plan.vue");
const HistoryPage = () => import("pages/History.vue");

const ErrorNotFound = () => import("pages/ErrorNotFound.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("pages/Auth/Login.vue"),
      },
    ],
  },
  {
    path: "/",
    redirect: "/perfil",
    component: AppLayout,
    children: [
      {
        path: "perfil",
        name: "PerfilPage",
        meta: { requiresAuth: true },
        component: PerfilPage,
      },
      {
        path: "history",
        name: "HistoryPage",
        meta: { requiresAuth: true },
        component: HistoryPage,
      },
      {
        path: "plan",
        name: "PlanPage",
        meta: { requiresAuth: true },
        component: PlanPage,
      },
      {
        path: "/nosotros",
        name: "Nosotros",
        meta: { requiresAuth: true },
        component: () => import("pages/Nosotros.vue"),
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

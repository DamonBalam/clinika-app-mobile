import { route } from "quasar/wrappers";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

import { useAuthStore } from "stores/auth";
import { Cookies } from "quasar";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createWebHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const access_token = Cookies.get("access_token");
    const user = Cookies.get("user");
    const store = useAuthStore();

    const { setUser } = store;

    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (access_token != null) {
        setUser({ user: user, token: access_token });
        next();
      } else {
        next({ path: "/login" });
      }
    } else {
      next();
    }
  });

  return Router;
});

import Vue from "vue";
import Router from "vue-router";

import { constantRoutes } from "./route.config";

Vue.use(Router);

const createRouter = () =>
  new Router({
    mode: "hash",
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;

export { constantRoutes };

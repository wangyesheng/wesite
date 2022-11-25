import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: true
});

router.beforeEach(async (to, from, next) => {
  // NProgress.start();
  next();
  // NProgress.done();
});

router.afterEach(() => {
  NProgress.done();
});

import router from "./router";
import store from "@/store";

let hasVerifiedToken = false;
router.beforeEach(async (to, from, next) => {
  if (!hasVerifiedToken && store.getters.appUser.id) {
    await store.dispatch("user/verifyJwtToken");
    hasVerifiedToken = true;
  }
  next();
});

router.afterEach(() => {});

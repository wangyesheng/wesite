import { verifyJwtTokenRes } from "@/api";
import { getToken, removeToken } from "@/utils/auth";
import { Notification } from "element-ui";

const getDefaultState = () => {
  const appUser = JSON.parse(localStorage.getItem("app_user") || "{}");
  return {
    appUser
  };
};

const state = getDefaultState();

const mutations = {
  SET_APP_USER: (state, user) => {
    state.appUser = user;
  }
};

const actions = {
  verifyJwtToken({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { code } = await verifyJwtTokenRes(getToken());
        if (code !== 0) {
          Notification({
            title: "提示",
            type: "warning",
            duration: 5 * 1000,
            message: "登录凭证已过期，请重新登录！"
          });
          commit("SET_APP_USER", {});
          localStorage.setItem("app_user", "");
          removeToken();
        }
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

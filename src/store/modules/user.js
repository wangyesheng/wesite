const getDefaultState = () => {
  return {
    appUser: JSON.parse(localStorage.getItem("app_user") || "{}")
  };
};

const state = getDefaultState();

const mutations = {
  SET_APP_USER: (state, user) => {
    state.appUser = user;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};

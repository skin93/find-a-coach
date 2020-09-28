import {createStore} from "vuex";

import coachesModule from "./modules/coaches/index";

export default createStore({
  state() {
    return {
      userIsCoach: false,
      userId: "c3",
    };
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
  mutations: {},
  actions: {},
  modules: {
    coaches: coachesModule,
  },
});

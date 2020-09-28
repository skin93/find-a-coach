import {createStore} from "vuex";

import coachesModule from "./modules/coaches/index";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    coaches: coachesModule,
  },
});

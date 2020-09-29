import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  state() {
    return {
      userIsCoach: false,
      userId: "c3",
    };
  },
  mutations,
  actions,
  getters,
};

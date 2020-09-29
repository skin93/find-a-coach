import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      lastFetch: null,
      coaches: [
        {
          id: "c1",
          firstName: "Deven",
          lastName: "Schamberger",
          areas: ["frontend", "backend", "career"],
          description:
            "Et corrupti dolorum quae autem. Officiis nemo quo voluptatum quo numquam et eos odio ut. Omnis a iure et voluptates a deleniti.",
          hourlyRate: 30,
        },
        {
          id: "c2",
          firstName: "Marlon",
          lastName: "Daugherty",
          areas: ["frontend", "career"],
          description:
            "Totam assumenda accusantium repellat distinctio voluptatem. Id quaerat nobis. Dolorem tempora sed animi excepturi voluptas. Voluptatibus aspernatur laboriosam quos suscipit et non. Aut quidem fuga. Nihil blanditiis at.",
          hourlyRate: 30,
        },
      ],
    };
  },
  mutations,
  actions,
  getters,
};

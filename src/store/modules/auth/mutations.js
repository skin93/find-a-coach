export default {
  setUser(state, payload) {
    state.token = payload;
    state.userId = payload.userId;
    state.tokenExpiration = payload.tokenExpiration;
  },
};

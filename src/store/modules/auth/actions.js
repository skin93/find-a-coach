export default {
  async login(context, payload) {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfkFkR1fmaRdGce7moZOpPKxSbD7oAXUc",
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(
        data.message || "Failed to authenticate. Check your login data."
      );
      throw error;
    }

    context.commit("setUser", {
      token: data.idToken,
      userId: data.localId,
      tokenExpiration: data.expiresIn,
    });
  },
  async signup(context, payload) {
    const res = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfkFkR1fmaRdGce7moZOpPKxSbD7oAXUc",
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(
        data.message || "Failed to authenticate. Check your login data."
      );
      throw error;
    }

    context.commit("setUser", {
      token: data.idToken,
      userId: data.localId,
      tokenExpiration: data.expiresIn,
    });
  },
  logout(context) {
    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};

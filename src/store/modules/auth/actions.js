export default {
  async login(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAfkFkR1fmaRdGce7moZOpPKxSbD7oAXUc";
    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAfkFkR1fmaRdGce7moZOpPKxSbD7oAXUc";
    }
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      const error = new Error(
        data.message || "Failed to authenticate. Check your login data."
      );
      throw error;
    }

    localStorage.setItem("token", data.idToken);
    localStorage.setItem("userId", data.localId);

    context.commit("setUser", {
      token: data.idToken,
      userId: data.localId,
      tokenExpiration: data.expiresIn,
    });
  },
  autoLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        tokenExpiration: null,
      });
    }
  },
  logout(context) {
    context.commit("setUser", {
      toke: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};

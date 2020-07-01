export const SET_TOKEN = (state, token) => {
  state.token = token;
};
export const SET_USER_INFO = (state, payload) => {
  state.user = payload;
  if (payload === null) {
    state.role = false;
  } else {
    state.role = true;
  }
};

export const HANDLE_LOGOUT = (state) => {
  state.user = null;
  state.token = null;
  state.login = {
    userName: "",
    password: "",
    rememberMe: true,
  };
};

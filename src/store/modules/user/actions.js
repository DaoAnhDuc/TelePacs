import { API_URL } from "../../../constants";
import axios from "axios";
import store from "../../../store/index";
const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = API_URL;

export const setupAxiosInterceptors = (token) => {
  // console.log("setupAxiosInterceptors -> token", token);
  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }
  const onRequestSuccess = (config) => {
    return config;
  };
  const onResponseSuccess = (response) => response;
  const onResponseError = (err) => {
    const status = err.status || (err.response ? err.response.status : 0);
    // console.log("onResponseError -> err.response", err.response);
    if (status === 403 || status === 401) {
      store.state.ui.loadingPage = false;
      if (err.response.statusText === "Unauthorized") {
        store.dispatch("user/handleLogout");
        window.location.reload();
      }
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export const handleLogin = async ({ dispatch }, payload) => {
  let response = await axios.post("api/Users/authenticate", payload);
  // console.log("handleLogin -> response", response.data.data);
  localStorage.setItem("token", response.data.data);
  if (response.data.data) {
    return dispatch("handleSetUserInfo", response.data.data);
  }
};

export const handleSetUserInfo = async ({ commit }, token) => {
  // console.log("handleSetUserInfo -> token", token);
  setupAxiosInterceptors(token);
  let response = await axios.get("api/Users/info");
  // console.log("handleSetUserInfo -> response", response.data.data);
  if (response.status === 200) {
    commit("SET_USER_INFO", response.data.data);
    commit("SET_TOKEN", token);
  }
};

export const handleLogout = ({ commit }) => {
  localStorage.clear();
  // console.log(axios);
  commit("HANDLE_LOGOUT");
  // console.log("handleLogout -> HANDLE_LOGOUT");
};

export const handleRegister = async (_, payload) => {
  // console.log("handleRegister -> payload", payload);
  await axios.post("/api/Users/register", payload);
  // console.log("handleRegister -> response", response)
};

export const SET_LIST_HOSPITAL = (state, payload) => {
  // console.log("SET_LIST_HOSPITAL -> payload", payload);
  state.listHospital = payload;
};
export const SET_PARAMS = (state, payload) => {
  // console.log("SET_PARAMS -> payload", payload);
  state.params = {
    ecn: payload.ecn,
    router: payload.router,
  };
};

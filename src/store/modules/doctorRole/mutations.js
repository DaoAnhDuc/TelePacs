export const GET_DOCTORS_SEARCH_PAGINATION = (state, payload) => {
    state.doctors = payload.data;
    state.pageIndex = payload.pageIndex;
    state.pageSize = payload.pageSize;
    state.pageCount = payload.pageCount;
}
export const DESTROY_DOCTOR = (state) => {
  state.doctors = [];
  state.pageIndex = 1;
  state.pageCount = 1;
  state.pageSize = 5;
}
export const SET_ID_DOCTOR = (state, payload) => {
  console.log("SET_ID_DOCTOR",payload);
  state.id = payload;
}
export const GET_DOCTOR_BY_ID = (state, payload) => {
  state.doctor = payload
}
export const EDIT_DOCTOR = (state) => {
  state.statusUpdate = true;
}
export const SET_LIST_ROLE = (state, payload) => {
  state.listRole = payload;
  state.statusGetListRole = true;
}
export const ADD_NEW_DOCTOR_SUCCESS = (state) => {
  state.statusAddNewDoctor = true;
}
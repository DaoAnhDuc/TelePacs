export const SET_DROP_DOCTOR = (state, payload) => {
  state.dropDoctors = payload;
};

export const SET_LIST_ROLE_BY_DOCTOR = (state, payload) => {
  state.doctor.listRole = payload.listHospitals;
  state.doctor.id = payload.userID;
  state.doctor.name = payload.name;
  console.log("SET_LIST_HOSPITAL -> state.doctor", state.doctor)

} 
export const SET_LIST_DOCTOR_LIST_ROLE_DOCTOR = (state, payload) => {
  console.log("SET_LIST_DOCTOR_LIST_ROLE_DOCTOR -> payload", payload)
  state.listDoctorAndRole = payload.data;
  state.search.PageIndex = payload.pageIndex;
  state.search.PageSize = payload.pageSize;
  state.search.PageCount = payload.pageCount;
};

export const SET_LIST_DOCTOR_NOT_ROLE = (state, payload) => {
  state.listDoctorNotRole = payload;
}
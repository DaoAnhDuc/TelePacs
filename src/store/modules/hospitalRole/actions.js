import axios from "axios";

export const getListDr_HospitalRole = async ({ commit }, payload) => {
  let response = await axios.get(
    `api/Users/hospitals?Keyword=${payload.Keyword}&PageIndex=${payload.PageIndex}&PageSize=${payload.PageSize}`
  );
  // console.log("getListDr_HospitalRole -> response", response);
  commit("SET_LIST_DOCTOR_LIST_ROLE_DOCTOR", response.data);
};

export const getAllDoctor = async ({ commit }) => {
  let response = await axios.get(
    `api/Users/paging?Keyword=&PageIndex=1&PageSize=999999`
  );
  // console.log("getAllDoctor -> response", response);
  // commit("SET_LIST_USER", response.data.data.listHospitals);
  commit("SET_DROP_DOCTOR", response.data.data);
};
export const getRoleDoctorById = async ({ commit }, payload) => {
  // console.log("getRoleDoctorById -> payload", payload);
  let response = await axios.get(`api/Users/${payload}/hospitals`);
  // console.log("getRoleDoctorById -> response", response);
  commit("SET_LIST_ROLE_BY_DOCTOR", response.data.data);
};

export const onSubmitListRole = async (_, payload) => {
  // console.log("onSubmitListRole -> payload", payload);
  let data ={
    hospitals: payload.listRole
  }
  await axios.put(`api/Users/${payload.id}/hospitals`, data);
  // console.log("onSubmitListRole -> response", response)
};

export const getDrNotHospitalRole = async ({commit}) => {
  let response = await axios.get(`api/Users/hospitals/users`)
  // console.log("getDrNotHospitalRole -> response", response.data.data)
  commit("SET_LIST_DOCTOR_NOT_ROLE", response.data.data);
}
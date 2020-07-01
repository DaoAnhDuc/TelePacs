import axios from "axios";
import * as emailjs from "emailjs-com";
export const getDoctorsAction = async ({ commit }, payload) => {
  let response = await axios.get(
    `api/Users/paging?Keyword=${payload.Keyword}&PageIndex=${payload.PageIndex}&PageSize=${payload.PageSize}`
  );
  // console.log("getDoctorsAction -> response", response);
  commit("GET_DOCTORS_SEARCH_PAGINATION", response.data);
};
export const editDoctorAction = async ({ commit }, payload) => {
  // console.log("editDoctorAction -> payload", payload);
  await axios.put(`api/Users/${payload.id}`, payload);
  // console.log("editDoctor -> response", response);
  commit("EDIT_DOCTOR");
};
export const getDoctorByIdAction = async ({ commit }, payload) => {
  // console.log("getDoctorByIdAction -> payload", payload);
  let response = await axios.get(`api/Users/${payload}`);
  commit("GET_DOCTOR_BY_ID", response.data.data);
  // console.log("getDoctorById -> response", response);
};
export const destroyComponentAction = ({ commit }) => {
  commit("DESTROY_DOCTOR");
};
export const getListRoleAction = async ({ commit }, payload) => {
  // console.log("getListRoleAction -> payload", payload);
  let response = await axios.get(`api/Users/${payload}/roles`);
  // console.log("getListRole -> response", response);
  commit("SET_LIST_ROLE", response.data.data.listRoles);
};
export const handleChangeRoleAction = async (_, payload) => {
  // console.log("handleChangeRoleAction -> payload", payload);
  let roles = [];
  payload.roles.forEach((role) => {
    roles.push({
      id: role.id,
      name: role.name,
      selected: role.selected,
    });
  });
  await axios.put(`api/Users/${payload.id}/roles`, {
    roles: roles,
  });
  // console.log("handleChangeRoleAction -> response", response);
};
export const sendEmail = async (_, payload) => {
  // console.log("sendEmail -> payload", payload);
  let strRole = "";
  payload.roles.forEach((role) => {
    if (role.selected === true) {
      strRole += role.name + ", ";
    }
  });
  // console.log(strRole);
  let message = "";
  if (strRole.trim()) {
    message = `Bạn đã được cấp quyền ${strRole} từ Hệ thống quản lý bệnh viện`;
  } else {
    message = `Bạn đã bị mất hết quyền từ Hệ thống quản lý bệnh viện`;
  }
  var template_params = {
    toEmail: payload.email,
    message: message,
  };
  var service_id = "gmail";
  var template_id = "userpermission";
  var user_id = "user_7B7HS39R3jAgQLFGVVroP";
  emailjs.send(service_id, template_id, template_params, user_id);
};
export const addNewDoctorAction = async (_, payload) => {
  // console.log("addNewDoctor -> payload", payload);
  await axios.post("api/Users/register", payload);
  // console.log("addNewDoctor -> response", response);
};
export const deleteDoctorAction = async (_, payload) => {
  // console.log("deleteDoctorAction -> payload", payload);
  await axios.delete(`api/Users/${payload}`);
  // console.log("deleteDoctorAction -> response", response);
};

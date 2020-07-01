
import axios from "axios";


export const getListHospital = async ({ commit }, payload) => {
  let response = await axios.get(`api/Users/${payload}/hospitals`)
  // console.log("getListHospital -> response", response)
  commit("SET_LIST_HOSPITAL", response.data.data.listHospitals);
  commit("SET_PARAMS", response.data.data);
};
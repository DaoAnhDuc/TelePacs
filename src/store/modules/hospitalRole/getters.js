export const getterHospitals = (state) => {
  let list = [];
  state.listHospital.forEach((element) => {
    if (element.selected === true) {
      list.push(element);
    }
  });
  console.log("getterHospitals -> list", list);
  return list;
};

export const getterDoctorAndRole = (state) => {
  let listDoctorAndRole = [];
  console.log("getterDoctorAndRole -> state", state.listDoctorAndRole);
  state.listDoctorAndRole.forEach((dr) => {
    console.log("getterDoctorAndRole -> dr", dr.name, dr.listHospitals);
    let hospitals = "";
    dr.listHospitals.forEach((hospital) => {
      hospitals += hospital.name + ", ";
    });
    hospitals = hospitals.substring(0, hospitals.length - 2);
    listDoctorAndRole.push({
      name: dr.name,
      id: dr.userID,
      hospitals,
    });
  });
  console.log("getterDoctorAndRole -> listDoctorAndRole", listDoctorAndRole);
  return listDoctorAndRole;
};

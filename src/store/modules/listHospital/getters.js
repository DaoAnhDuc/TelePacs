export const getterHospitals = (state) => {
  let list = [];
  state.listHospital.forEach((element, index) => {
    if (element.selected === true) {
      element.stt = index +1;
      list.push(element);
    }
  });

  // console.log("getterHospitals -> list", list);
  return list;
};

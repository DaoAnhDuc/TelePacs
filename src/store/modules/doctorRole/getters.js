export const pageIndex = (state) => {
  return state.pageIndex;
}
export const pageSize = (state) => {
  return state.pageSize;
}
export const pageCount = (state) => {
  return state.pageCount;
}
export const getDoctor = (state) => {
  return state.doctor
}
export const getDialogInfo = (state) => {
  return state.openDialogInfo
}
export const getDialogEdit = (state) => {
  return state.openDialogEdit
}
export const getDialogROle = (state) => {
  return state.openDialogRole
}
export const getListRole = (state) => {
  let roles = [];
  state.listRole.forEach(role => {
    roles.push(role.name)
  });
  console.log(roles);
  return roles;
}
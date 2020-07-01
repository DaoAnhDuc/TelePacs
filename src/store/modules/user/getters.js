export const authenticated = (state) => {
  return state.token;
};
export const user = (state) => {
  return state.user;
};
export const getIsAdmin = (state) => {
  let check = false;
  if (state.user) {
    // console.log("getIsAdmin -> state", state.user.roles);
    state.user.roles.forEach((element) => {
      // console.log("getIsAdmin -> element", element);
      if (element === "Admin") {
        check = true;
      }
    });
  }
  return check;
};

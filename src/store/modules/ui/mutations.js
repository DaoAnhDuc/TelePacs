export const TOGGLE_NAVBAR = (state) => {
  state.openDrawer = !state.openDrawer;
}
export const CLOSE_NAVBAR = (state) => {
  state.openDrawer = false;
}
export const OPEN_NAVBAR = (state) => {
  state.openDrawer = true;
}
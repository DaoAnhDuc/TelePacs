// import axios from 'axios';
export const toggleNavBar = ({commit}) => {
  commit('TOGGLE_NAVBAR')
}
export const closeNavBar = ({commit} ) => {
  commit('CLOSE_NAVBAR')
}
export const openNavBar = ({commit} ) => {
  commit('OPEN_NAVBAR')
}
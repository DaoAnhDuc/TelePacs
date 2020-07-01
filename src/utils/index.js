import Vue from "vue";
export const FORMAT_DATE = (date) => { //1992/12/02 -> 02/12/1992
  return date.substr(8,2)+"/"+date.substr(5,2)+"/"+ date.substr(0,4)
}
export const TOAST_NOTIFICATION = (message, type = "success", duration = 3000, position = "top-right") => {
  Vue.$toast.open({
    message: message,
    type: type,
    position: position,
    duration: duration,
  });
}
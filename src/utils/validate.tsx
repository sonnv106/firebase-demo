import Toast from "react-native-toast-message";

const formatCurrency = (price: number) => {
  if (price) return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return "";
};
const checkNull = (data) => {
  if (!data || data == "undefined" || data == undefined) {
    return " ";
  }
  return data;
};
const isVietnamesePhoneNumber = (number: string) => {
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
};

const formatPhoneNumber = (number: string) => {
  return number.trim().replace("84", "0");
};

const checkEmail = (mail: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
};
const maskPhoneNumber = (phone:string) => {
  return phone.replace(/(\d{7})(\d{3,4})/, "#######$2");
};
const showToast = (type: string, text1: string, text2: string) => {
  switch (type) {
    case "success":
      Toast.show({
        type: "success",
        text1,
        text2,
        position: "bottom",
        visibilityTime: 2000,
        autoHide: true,
        bottomOffset: 50,
      });
      break;
    case "error":
      Toast.show({
        type: "error",
        text1,
        text2,
        position: "bottom",
        visibilityTime: 2000,
        autoHide: true,
        bottomOffset: 50,
      });
      break;
    default:
      null;
  }
};
export {
  formatCurrency,
  checkNull,
  isVietnamesePhoneNumber,
  checkEmail,
  formatPhoneNumber,
  maskPhoneNumber,
  showToast
};
 

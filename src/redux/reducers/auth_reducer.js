import { User } from "../../model/types";
const INITIAL_STATE = {
  isAuth: false,
  user: new User() ,
  error: false,
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "AUTO_SIGNIN":
      console.log("111111111",{ ...state, ...action.payload })
      return { ...state, ...action.payload };
    case "LOGOUT_USER":
      return { ...state, user: {}, isAuth: false };
    case "LOGIN_USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

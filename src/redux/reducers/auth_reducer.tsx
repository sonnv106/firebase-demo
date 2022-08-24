import { User,authState,ActionType} from "../../model/types";

const INITIAL_STATE: authState= {
  isAuth: false,
  user: new User() ,
  error: false,
  data: {}
};
export default function (state = INITIAL_STATE , action: ActionType) {
  switch (action.type) {
    case "AUTO_SIGNIN":
      // console.log("111111111",{ ...state, ...action.payload })
      return { ...state, ...action.payload};
    case "LOGOUT_USER":
      return { ...state, user: {}, isAuth: false };
    case "LOGIN_USER":
      return { ...state, ...action.payload};
    default:
      return state;
  }
}

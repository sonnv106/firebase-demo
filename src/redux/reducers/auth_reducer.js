const INITIAL_STATE = {
  isAuth: false,
  user: {},
  error: false,
};
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "AUTO_SIGNIN":
      return { ...state, ...action.payload };
    case "LOGOUT_USER":
      return { ...state, user: {}, isAuth: false };
    case "LOGIN_USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

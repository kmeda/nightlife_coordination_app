export var authReducer = (state={loggingIn: false}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        uid: action.uid,
        name: action.name
      };
    case "LOGGING_IN":
      return {
        ...state,
        loggingIn: action.setFlag
      }
    case "LOGOUT":
      return {loggingIn: false};
    default:
      return state;
  }
}

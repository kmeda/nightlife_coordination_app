export var placeHolderReducer = (state={}, action) => {
  switch (action.type) {
    case "TEST_ACTION":
      return null;
    default:
    return state;
  }
}

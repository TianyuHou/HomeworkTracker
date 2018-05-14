export default (state = {}, action) => {
  switch (action.type) {
    case "EDIT_AVATAR":
      return action.url;
    case "GET_AVATAR":
      return action.url;
    default:
      return state;
  }
};

const defaultState = {
  id: " ",
  info: {
    address: " ",
    birth: " ",
    email: " ",
    firstName: " ",
    gender: " ",
    identity: " ",
    imgName: " ",
    lastName: " ",
    organization: " ",
    phone: " ",
    state: " ",
    zip: " "
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "EDIT_PROFILE":
      return action.info;
    case "GET_PROFILE":
      return action.info;
    default:
      return state;
  }
};

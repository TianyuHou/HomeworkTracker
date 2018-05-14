export default (state = {}, action) => {
    switch (action.type) {
        case "GET_MENTOR":
            return action.mentor;
        default:
            return state;
    }
};

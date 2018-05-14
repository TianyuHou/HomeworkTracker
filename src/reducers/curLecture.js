export default (state = {}, action) => {
    switch (action.type) {
        case "GET_CURLECTURE":
            return action.lecture;
        default:
            return state;
    }
};

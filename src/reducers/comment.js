export default (state = [], action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return [...state, action.comment];
    case "GET_COMMENT":
      return action.comment;
    case "DELETE_COMMENT":
      return state.filter(comment => comment.id !== action.id);
    default:
      return state;
  }
};

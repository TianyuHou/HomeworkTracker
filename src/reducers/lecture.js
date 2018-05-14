export default (state = [], action) => {
  switch (action.type) {
    case "ADD_LECTURE":
      return [...state, action.lecture];
    case "EDIT_LECTURE":
      return state.map(n => {
        if (n.id === action.id) {
          return {
            id: n.id,
            lecture: {
              ...n.lecture,
              ...action.lecture
            }
          };
        } else {
          return n;
        }
      });
    case "GET_LECTURE":
      return action.lecture;
    case "DELETE_LECTURE":
      return state.filter(lecture => lecture.id !== action.id);
    default:
      return state;
  }
};

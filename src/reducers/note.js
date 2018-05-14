export default (state = [], action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return [...state, action.note];
    case "EDIT_NOTE":
      return state.map(n => {
        if (n.id === action.id) {
          return {
            id: n.id,
            note: action.note
          };
        } else {
          return n;
        }
      });
    case "GET_NOTE":
      return action.note;
    case "DELETE_NOTE":
      return state.filter(note => note.id !== action.id);
    default:
      return state;
  }
};

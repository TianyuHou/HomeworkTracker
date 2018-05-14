export default (state = [], action) => {
    switch (action.type) {
        case "ADD_TRANSACTION":
            return [...state, action.transaction];
        case "EDIT_TRANSACTION":
            return state.map(n => {
                if (n.id === action.id) {
                    const t = {
                        id: n.id,
                        transaction: {
                            ...n.transaction,
                            ...action.transaction
                        }
                    };
                    return t;
                } else {
                    return n;
                }
            });
        case "GET_ALLTRANSACTION":
            return action.transaction;
        case "GET_MYTRANSACTION":
            return action.transaction;
        case "DELETE_TRANSACTION":
            return state.filter(transaction => transaction.id !== action.id);
        default:
            return state;
    }
};

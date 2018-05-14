import config from "../config.json";
import { getWarn } from "../selectors/utilities";
const f2e = config.f2e;
const firebase = require("../firebase/firebase").firebase;
const database = require("../firebase/firebase").database;

export const getAllTransaction = transaction => ({
    type: "GET_ALLTRANSACTION",
    transaction
});

export const getMyTransaction = transaction => ({
    type: "GET_MYTRANSACTION",
    transaction
});

export const addTransaction = transaction => ({
    type: "ADD_TRANSACTION",
    transaction
});

export const editTransaction = (id, transaction) => ({
    type: "EDIT_TRANSACTION",
    id,
    transaction
});

export const deleteTransaction = id => ({
    type: "DELETE_TRANSACTION",
    id
});

const deleteData = (uid, id) => {
    return fetch(`/${uid}/${id}/deleteTransaction`, {
        method: "DELETE"
    })
        .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
        .catch(() => Promise.reject("create-fail"));
};

export const startDeleteTransaction = id => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        const res = await deleteData(uid, id);
        const warn = getWarn(res);
        if (!warn) {
            dispatch(deleteTransaction(id));
        }
        return warn;
    };
};

const postData = (uid, transaction) => {
    return fetch(`/${uid}/addTransaction`, {
        method: "POST",
        body: JSON.stringify({
            transaction
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
        .then(data => data)
        .catch(() => Promise.reject("create-fail"));
};

export const startAddTransaction = transaction => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        const id = await postData(uid, transaction);
        const warn = getWarn(id);
        if (!warn) {
            dispatch(addTransaction({ id, transaction }));
        }
        return warn;
    };
};

const getMyData = uid => {
    return fetch(`/${uid}/getMyTransaction`)
        .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
        .then(data => data)
        .catch(() => Promise.reject("create-fail"));
};

const getData = () => {
    return fetch(`/getAllTransactions`)
        .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
        .then(data => data)
        .catch(() => Promise.reject("create-fail"));
};

export const startGetAllTransaction = () => {
    return async (dispatch, getState) => {
        const data = await getData();
        const warn = getWarn(data);
        if (!warn) {
            dispatch(getAllTransaction(data));
        }
        return warn;
    };
};

export const startGetMyTransaction = () => {
    return async (dispatch, getState) => {
        const uid = getState().auth.uid;
        const data = await getMyData(uid);
        const warn = getWarn(data);
        if (!warn) {
            dispatch(getMyTransaction(data));
        }
        return warn;
    };
};

const updateData = (uid, transaction, id) => {
    return fetch(`/${uid}/${id}/editTransaction`, {
        method: "PUT",
        body: JSON.stringify({
            transaction
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => (res.ok ? res.json() : Promise.reject(res.text())))
        .catch(() => Promise.reject("create-fail"));
};

export const startEditTransaction = (uid, id, transaction) => {
    return async (dispatch, getState) => {
        const res = await updateData(uid, transaction, id);
        const warn = getWarn(res);
        if (!warn) {
            dispatch(editTransaction(id, transaction));
        }
        return warn;
    };
};

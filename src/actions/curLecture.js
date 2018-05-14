export const getCurLecture = lecture => ({
    type: "GET_CURLECTURE",
    lecture
});

export const removeCurLecture = () => ({
    type: "DELETE_CURLECTURE"
});

export const startGetCurLecture = id => {
    return (dispatch, getState) => {
        const list = getState().lecture;
        const lecture = list.filter(l => l.id === id);
        dispatch(getCurLecture(lecture[0]));
    };
};

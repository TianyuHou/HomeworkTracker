import { getImg } from "./avatar";
import { getData } from "./profile";

export const getMentor = mentor => ({
    type: "GET_MENTOR",
    mentor
});

export const startGetMentor = uid => {
    return async dispatch => {
        const mentor = await getData(uid);
        const url = await getImg(uid, mentor.info.imgName);
        mentor.info.url = url;
        dispatch(getMentor(mentor));
    };
};

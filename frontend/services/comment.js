import api from "./api";


export const getComments = () => {

    return api.get("/comments");

};



export const createComment = (data) => {

    return api.post(
        "/comments",
        data
    );

};



export const deleteComment = (id) => {

    return api.delete(
        `/comments/${id}`
    );

};
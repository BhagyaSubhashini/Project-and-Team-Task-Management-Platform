import api from "./api";


export const getTasks = () => {

    return api.get("/tasks");

};



export const createTask = (taskData) => {

    return api.post("/tasks", taskData);

};



export const getTaskById = (id) => {

    return api.get(`/tasks/${id}`);

};



export const updateTask = (id, taskData) => {

    return api.put(
        `/tasks/${id}`,
        taskData
    );

};



export const deleteTask = (id) => {

    return api.delete(`/tasks/${id}`);

};
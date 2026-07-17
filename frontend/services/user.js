import api from "./api";


// Get all users
export const getUsers = () => {

    return api.get("/users");

};



// Create user
export const createUser = (data) => {

    return api.post(
        "/users",
        data
    );

};



// Update user
export const updateUser = (id,data)=>{

    return api.put(
        `/users/${id}`,
        data
    );

};



// Delete user
export const deleteUser = (id)=>{

    return api.delete(
        `/users/${id}`
    );

};
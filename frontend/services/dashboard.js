import api from "./api";


// Get dashboard statistics
export const getDashboard = () => {

    return api.get("/dashboard");

};
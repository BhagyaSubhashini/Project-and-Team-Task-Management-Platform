import api from "./api";


export const getProjects = () => {
    return api.get("/projects");
};



export const createProject = (projectData) => {
    return api.post("/projects", projectData);
};



export const getProjectById = (id) => {
    return api.get(`/projects/${id}`);
};



export const updateProject = (id, projectData) => {
    return api.put(
        `/projects/${id}`,
        projectData
    );
};



export const deleteProject = (id) => {
    return api.delete(`/projects/${id}`);
};
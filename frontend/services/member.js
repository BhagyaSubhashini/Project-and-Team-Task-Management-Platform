import api from "./api";


export const addMember = (projectId,userId)=>{

    return api.post(
        `/projects/${projectId}/members`,
        {
            user_id:userId
        }
    );

};

export const getProjectMembers = (projectId)=>{

    return api.get(
        `/projects/${projectId}/members`
    );

};

export const removeMember = (projectId,userId)=>{

    return api.delete(
        `/projects/${projectId}/members/${userId}`
    );

};
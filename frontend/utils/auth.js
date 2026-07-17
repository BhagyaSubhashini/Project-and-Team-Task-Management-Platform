export const getUser = () => {

    if (typeof window === "undefined") return null;

    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;

};



export const getRole = () => {

    const user = getUser();

    return user?.role?.name || "";

};



export const isAdmin = () => {

    return getRole() === "Administrator";

};



export const isProjectManager = () => {

    return getRole() === "Project Manager";

};



export const isTeamMember = () => {

    return getRole() === "Team Member";

};
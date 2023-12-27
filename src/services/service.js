import { https } from "./config";

export let userService = {
    login: (valueForm) => {
        return https.post("/api/Users/signin", valueForm);
    },
    register: (valueForm) => {
        return https.post("/api/Users/signup", valueForm);
    },
    getDetail: (id) => {
        return https.get(`/api/Users/getUser${id}`);
    },
    getListAllProject: () => {
        return https.get("/api/Project/getAllProject");
    },
    getProjectCategory: () => {
        return https.get("/api/ProjectCategory");
    },


};
export let projectService = {
    postCreateProject: (valueForm) => {
        return https.post("/api/Project/createProjectAuthorize", valueForm);
    },
    getProjectDetail: (id) => {
        return https.get(`/api/Project/getProjectDetail?id=${id}`);
    },
    putUpdateProject: (id, updatedData) => {
        return https.put(`/api/Project/updateProject?projectId=${id}`, updatedData);
    },
    deleteProject: (id) => {
        return https.delete(`/api/Project/deleteProject?projectId=${id}`);
    },
    getUserById: (id) => {
        return https.get(`/api/Users/getUserByProjectId?projectId=${id}`);
    },
}
export let task = {
    getStatus: () => {
        return https.get(`/api/Status/getAll`);
    },
    getTaskType: () => {
        return https.get(`/api/TaskType/getAll`);
    },
    getPriority: () => {
        return https.get(`/api/Priority/getAll`);
    },
    getAssignUserTask: (valueForm) => {
        return https.post(`/api/Project/assignUserTask`, valueForm);
    },
    createTask: (values) => {
        return https.post("/api/Project/createTask", values);
    },
    getMember: () => {
        return https.get("api/Users/getUser");
    },
    getMemberByName: (name) => {
        return https.get(`/api/Users/getUser?keyword=${name}`);
    },
    postAssignUserProject: (member) => {
        return https.post(`/api/Project/assignUserProject`, member);
    },
    postremoveUserFromProject: (member) => {
        return https.post(`/api/Project/removeUserFromProject`, member);
    },
    removeTask: (taskId) => {
        return https.delete(`/api/Project/removeTask?taskId=${taskId}`);
    },

    // update task
    updateTask: (value) => {
        return https.post(`/api/Project/updateTask`, value);
    },
    updateDescription: (value) => {
        return https.put(`/api/Project/updateDescription`, value);
    },
    updateStatus: (value) => {
        return https.put(`/api/Project/updateStatus`, value);
    },
    updatePriority: (value) => {
        return https.put(`/api/Project/updatePriority`, value);
    },


}
export let CommentService = {
    postInsertComment: (comment) => {
        return https.post(`/api/Comment/insertComment`, comment);
    }
}
export let TimeTracking = {
    updateEstimate: (value) => {
        return https.put(`/api/Project/updateEstimate`, value);
    },
    updateTimeTracking: (value) => {
        return https.put(`/api/Project/updateTimeTracking`, value);
    },
}




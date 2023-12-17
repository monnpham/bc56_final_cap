import { ARR_SEARCH, CREATE_PROJECT, SET_INFOR, UPDATE_PROJECT } from "../constant/user";

let userJson = localStorage.getItem("USER");
let user = JSON.parse(userJson);

const initialState = {
  info: user,
  arrSearch: [],
  project: {
    "projectName": "",
    "description": "",
    "categoryId": "",
    "alias": ""
  },
  updateProject: {
    id: 0,
    projectName: "",
    creator: 0,
    description: "",
    categoryId: ""
  }
};

export let userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INFOR: {
      return { ...state, info: payload };
    }
    case ARR_SEARCH: {
      return { ...state, arrSearch: payload };
    }
    case CREATE_PROJECT: {
      return { ...state, project: payload };
    }
    case UPDATE_PROJECT: {
      console.log("🚀 ~ file: user.js:37 ~ userReducer ~ payload:", payload)
      return { ...state, updateProject: { ...state.updateProject, description: payload.description, categoryId: payload.categoryId, id: payload.id, projectName: payload.projectName, creator: payload.creator } };
    }
    default:
      return state;
  }
};

import { ARR_SEARCH, CREATE_PROJECT, DELETE_PROJECT, DETAIL_PROJECT, GET_CATEGOGY, GET_PROJECT, LOADING, PUSH_PROJECT_ID, SET_INFOR, UPDATE_PROJECT } from "../constant/user";
let userJson = localStorage.getItem("USER");
let user = JSON.parse(userJson);

const initialState = {
  info: user,
  arrSearch: [],
  allProject: JSON.parse(localStorage.getItem("ALL_PROJECT")),
  userProject: JSON.parse(localStorage.getItem("USER_PROJECT")),
  category: [],
  projectID: "",
  detailProject: {
    creator: user && user.id ? user.id : "",
    projectName: "",
    description: "",
    categoryId: "",
    alias: ""
  },
  updateProject: {
    creator: user && user.id ? user.id : "",
    id: 0,
    projectName: "",
    description: "",
    categoryId: "",
    alias: ""
  },
  createProject: {
    "creator": user && user.id ? user.id : "",
    "projectName": "",
    "description": "",
    "categoryId": "1",
    "alias": ""
  },
  loading: true
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
      return {
        ...state,
        createProject: payload,
        loading: false
      };
    }
    case UPDATE_PROJECT: {
      const { id, projectName, description, creator, categoryId } = payload;
      return {
        ...state,
        updateProject: {
          ...state.updateProject,
          id,
          projectName,
          description,
          creator: creator.id,
          categoryId,
          loading: false
        },
      };
    }
    case GET_PROJECT: {
      return {
        ...state,
        allProject: payload,
        userProject: JSON.parse(localStorage.getItem("USER_PROJECT")),
        loading: false
      };
    }
    case GET_CATEGOGY: {
      localStorage.setItem("CATGORY", JSON.stringify(payload));
      return { ...state, category: payload };
    }
    case LOADING: {
      return { ...state, loading: payload };
    }
    case DETAIL_PROJECT: {
      return { ...state, detailProject: payload };
    }
    case PUSH_PROJECT_ID: {
      console.log("🚀 ~ file: user.js:88 ~ userReducer ~ payload:", payload)

      return { ...state, projectID: payload };
    }
    case DELETE_PROJECT: {
      const updatedUserProjects = state.userProject.filter(project => project.id !== payload);
      return {
        ...state, userProject: updatedUserProjects,
      };
    }


    default:
      return state;
  }
};


import { SPINNER_OFF, SPINNER_ON } from "../constant/spinner";

const initialState = {
  isLoading: false,
};

export let spinnerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SPINNER_ON:
      return { ...state, isLoading: true };
    case SPINNER_OFF:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

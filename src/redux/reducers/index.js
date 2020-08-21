import * as actionTypes from "../types";

const initialState = {
  currentUser: null,
  isLoading: true,
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_USER:
      return {
        currentUser: payload,
        isLoading: false,
      };

    case actionTypes.CLEAR_USER:
      return {
        ...initialState,
        isLoading: false,
      };

    default:
      return state;
  }
};

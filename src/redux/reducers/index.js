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
        currentUser: payload.currentUser,
        isLoading: false,
      };

    default:
      return state;
  }
};

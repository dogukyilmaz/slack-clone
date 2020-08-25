import * as actionTypes from "../types";

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    payload: user,
  };
};

export const clearUser = () => {
  return {
    type: actionTypes.CLEAR_USER,
  };
};

export const setCurrentChannel = (ch) => {
  return {
    type: actionTypes.SET_CURRENT_CHANNEL,
    payload: ch,
  };
};

export const clearCurrentChannel = () => {
  return {
    type: actionTypes.SET_CURRENT_CHANNEL,
  };
};

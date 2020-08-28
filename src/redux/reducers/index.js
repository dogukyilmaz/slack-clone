import * as actionTypes from "../types";

const initialUserState = {
  currentUser: null,
  isLoading: true,
};

export const userReducer = (state = initialUserState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_USER:
      return {
        currentUser: payload,
        isLoading: false,
      };
    case actionTypes.CLEAR_USER:
      return {
        ...initialUserState,
        isLoading: false,
      };
    default:
      return state;
  }
};

const initialChannelState = {
  currentChannel: null,
  // isLoading: true,
};

export const channelReducer = (state = initialChannelState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: payload,
      };
    case actionTypes.CLEAR_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: null,
      };
    default:
      return state;
  }
};

const initialAlertState = {
  alertMessage: null,
  type: null,
};

export const alertReducer = (state = initialAlertState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_ALERT:
      return {
        ...state,
        alertMessage: payload.message,
        type: payload.type,
      };
    case actionTypes.REMOVE_ALERT:
      return {
        ...state,
        alertMessage: null,
        type: null,
      };
    default:
      return state;
  }
};

export const initialState = {
  isLoading: false,
  responseData: null,
  error: "",
  successMessage: "",
};

export const actionTypes = {
  REQUEST_SENT: "REQUEST_SENT",
  RESPONSE_RECEIVED: "RESPONSE_RECEIVED",
  REQUEST_FAILED: "REQUEST_FAILED",
  RESET: "RESET",
};

export const responseReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_SENT:
      return {
        ...state,
        isLoading: true,
        error: "",
      };
    case actionTypes.RESPONSE_RECEIVED:
      return {
        ...state,
        isLoading: false,
        responseData: action.payload,
        successMessage: action.successMessage,
      };
    case actionTypes.REQUEST_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
};

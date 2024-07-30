export const initialState = {
  error: "",
  isError: false,
  successMessage: "",
  email: "",
  dynamicFields: {},
  password: "",
  repPassword: "",
  firstName: "",
  lastName: "",
  nickname: "",
  avatarImage: null,
  address: "",
  phoneNumber: null,
  isLoading: false,
  FormDataKeys: [],
};

export const actionTypes = {
  SET_FIELD: "SET_FIELD",
  RESET_FIELD: "RESET_FIELD",
  SET_ERROR: "SET_ERROR",
  SET_IS_ERROR: "SET_IS_ERROR",
  RESET_ERROR: "RESET_ERROR",
  SET_LOADING: "SET_LOADING",
  SUCCESS_MESSAGE: "SUCCESS_MESSAGE",
  SET_KEYS_CLEAN_UP: "SET_KEYS_CLEAN_UP",
};

export const userReducer = (state, action) => {

  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        dynamicFields: {
          ...state.dynamicFields,
          [action.field]: action.value || "",
        },
      };
    case "SET_ERROR":
      return { ...state, error: action.error };

    case "SET_IS_ERROR":
      return { ...state, isError: action.isError };
    case "SET_KEYS_CLEAN_UP":
      return {...state, FormDataKeys: action.keys };

    case "RESET_ERROR":
      return { ...state, error: "" };
    case "RESET_FIELD":
      return {
        ...state,
        dynamicFields: { ...state.dynamicFields, [action.field]: "" },
      };
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "SUCCESS_MESSAGE":
      return { ...state, successMessage: action.successMessage };
    default:
      return state;
  }
};

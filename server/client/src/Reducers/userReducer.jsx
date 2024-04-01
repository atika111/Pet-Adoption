export const initialState = {
  error: "",
  isError: false,
  successMessage: "",
  email: "",
  password: "",
  repPassword: "",
  firstName: "",
  lastName: "",
  nickname: "",
  avatarImage: null,
  address: "",
  phoneNumber: null,
  isLoading: false,
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERROR":
      return { ...state, error: action.error };

    case "SET_IS_ERROR":
      return { ...state, isError: action.isError };

    case "RESET_ERROR":
      return { ...state, error: '' };
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "SUCCESS_MESSAGE":
      return { ...state, successMessage: action.successMessage };
    default:
      return state;
  }
};

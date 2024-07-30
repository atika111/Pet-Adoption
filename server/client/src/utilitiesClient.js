import { initialState } from "./Reducers/userReducer";

export const convertArrayToObject = (input) => {
  if (Array.isArray(input)) {
    const user = { ...input };
    return user[0];
  } else if (typeof input === "object" && input !== null) {
    return { ...input };
  } else {
    return input;
  }
};

function setCookie(key, value, expirationDays) {
  const isExpiration = expirationDays;
  let expires;
  if (isExpiration) {
    const date = new Date();
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    expires = "expires=" + date.toUTCString();
  }

  const serializedValue = JSON.stringify(value);

  document.cookie = isExpiration
    ? key + "=" + serializedValue + ";" + expires + ";path=/"
    : key + "=" + serializedValue + ";";
}

function getCookie(key) {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(key + "=") === 0) {
      const cookieValue = cookie.substring(key.length + 1);
      return JSON.parse(cookieValue);
    }
  }
  return null;
}

// FUNCTION

const handleErrorResponse = ({ error, dispatch, actionTypes }) => {
  dispatch({ type: actionTypes.SET_ERROR, error: error || "Error" });
  dispatch({ type: actionTypes.SET_IS_ERROR, isError: true });
  dispatch({
    type: actionTypes.SET_LOADING,
    isLoading: false,
  });
};

const handleSuccessResponse = ({ success, dispatch, actionTypes }) => {
  console.log("success: ", actionTypes);
  dispatch({
    type: actionTypes.SUCCESS_MESSAGE,
    successMessage: success || "Success",
  });
  dispatch({
    type: actionTypes.SET_LOADING,
    isLoading: false,
  });
};

const resetStatesAndStartNew = ({ isLoading, actionTypes, dispatch }) => {
  const loadingState = isLoading ? isLoading : initialState.isLoading;

  dispatch({ type: actionTypes.RESET_ERROR });
  dispatch({ type: actionTypes.SET_IS_ERROR, isError: false });
  dispatch({ type: actionTypes.SET_LOADING, isLoading: loadingState });
  dispatch({
    type: actionTypes.SUCCESS_MESSAGE,
    successMessage: "",
  });
};

const handleInputChange = ({ actionTypes, dispatch, target }) => {
  const { value, id } = target;
  dispatch({ type: actionTypes.SET_FIELD, field: id, value: value });
};

const handleCleanInput = ({ FormDataKeys, actionTypes, dispatch }) => {
  FormDataKeys.forEach((key) => {
    console.log("key: ", key);
    dispatch({ type: actionTypes.RESET_FIELD, field: key });
  });
};

const handleSaveStateKeysForCleaningInput = ({
  target,
  actionTypes,
  dispatch,
}) => {
  const formDataKeys = new FormData(target);
  const keysArray = Array.from(formDataKeys.keys());

  dispatch({ type: actionTypes.SET_KEYS_CLEAN_UP, keys: keysArray });
};

const utilities = {
  convertArrayToObject,
  setCookie,
  getCookie,
  handleErrorResponse,
  resetStatesAndStartNew,
  handleSuccessResponse,
  handleInputChange,
  handleCleanInput,
  handleSaveStateKeysForCleaningInput,
};

export default utilities;
